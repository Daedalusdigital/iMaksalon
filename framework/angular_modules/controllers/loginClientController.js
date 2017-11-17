var app = angular.module('loginApp',[]);

app.controller('loginClientController',['$scope','loginService',function($scope,loginService){
        console.log("Loading");
        $scope.clientLogin = function(values){
            var object = angular.toJson({client_username:values.username,client_password:values.password});
            
            console.log(object);
            
            loginService.sendLogin(object).then(function(res){
               if(res.data.response=='notfound'){
                   console.log("User not found");
               }
               else{
                   console.log(res);
               }
            });
        };
}]);

app.factory('loginService',['$http',function($http){
        var service={};
        service.sendLogin=function(object){
            var promise=$http.post('https://prod-11.southcentralus.logic.azure.com:443/workflows/8ea605edcca54d7fbaf3f62f14c56b45/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=UHV0e2j-U-tlDOELeb3ZRZCL_oipf6rJtOmqvq6N3tc',object);
            return promise;
        };
        return service;
}]);