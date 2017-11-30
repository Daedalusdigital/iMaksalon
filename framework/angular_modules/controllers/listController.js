var app = angular.module('listApp',[]);

app.controller('listStylistController',['$scope','listStylistService',function($scope,listStylistService){
    
    listStylistService.getStylist().then(function(res){
        $scope.stylistList = res.data;
    });
}]);

app.factory('listStylistService',['$http',function($http){
    var service={};
    service.getStylist=function(obj){
        var promise=$http.get('https://prod-21.southcentralus.logic.azure.com:443/workflows/1f070dd37cff4e6c8d4e0bdd11fe97ac/triggers/request/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Frequest%2Frun&sv=1.0&sig=HN0ZFaXjcR2dqzRs8TKF9NJDzMx-52IFcAPNSE1ul24');
        return promise;
    };
    return service;
}]);