'use strict';

var app = angular.module('subscribeApp',[]);

app.controller("subscribeController", ['$scope','SubscribeService',function($scope,SubscribeService){
    $scope.message = "Subscribe";
    
    $scope.subscribe = function(){
        var object = angular.toJson({subscriber_email:$scope.subscriberEmail, firstname:$scope.subscriberName , surname:$scope.subscriberSurname});
        
        $scope.results = object;
        console.log(object);
        
        SubscribeService.sendSubsciption(object).then(function(res){
            alert(res.data.response);
            console.log(res.data);
        });
    };
}]);

app.factory('SubscribeService',['$http',function($http){
        var service={};
        service.sendSubsciption=function(object){
            var promise=$http.post('https://prod-15.southcentralus.logic.azure.com:443/workflows/5a26ca01dba347e18315754df4e59104/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=XGYSjGwuWHFZ8jpVouh15ocJhZFfFFodcVgkQ8ETeUM',object);
            return promise;
        };
        return service;
}]);