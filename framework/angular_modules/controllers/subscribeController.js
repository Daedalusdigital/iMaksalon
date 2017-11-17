'use strict';

var app = angular.module('subscribeApp',[]);

app.controller("subscribeController", ['$scope','SubscribeService',function($scope,SubscribeService){
    console.log("loaded");
    $scope.subscribe = function(values){
        var object = angular.toJson({subscriber_email:values.subscriberEmail, firstname:values.subscriberName , surname:values.subscriberSurname});
        
        
        console.log(object);
        $('#preloader').show();
        setTimeout(function(){ $('#preloader').fadeOut('slow') }, 3000);
        SubscribeService.sendSubsciption(object).then(function(res){
            if(res.data.response=="successful")
            {
               
                $scope.results = "Thank You for subscribing to our news letters";
            }
            else{
                $scope.results = "You've Already Subscribe to our news letters, Thank You";
            }
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