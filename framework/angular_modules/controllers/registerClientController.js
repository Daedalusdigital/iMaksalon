var app = angular.module('registerApp',[]);

app.controller('registerUserController',['$scope','registerService',function($scope,registerService){
        console.log("Loading");
        $scope.clientRegister = function(values){
            var object = angular.toJson({firstname:values.firstname, surname:values.surname, contact_number:values.contact_number, email:values.email_address, physical_address:values.physical_address, client_password:values.client_password, client_username:values.client_username});
            
            console.log(object);
            alert(object);
            registerService.sendRegister(object).then(function(res){
               if(res.data.response=='exist'){
                   $scope.exist = "Username Already Taken, Please choose another one";
               }
               else{
                   $scope.result = "You have succcessfully registered";
                   console.log(res);
               }
            });
        };
}]);

app.factory('registerService',['$http',function($http){
        var service={};
        service.sendRegister=function(object){
            var promise=$http.post('https://prod-11.southcentralus.logic.azure.com:443/workflows/868cc4bb18764dfd9bf21c08ba97e5ac/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=XKCDCiGTNP3nOJGY8QeKH5U7s-z689LEB81PIoZQjDk',object);
            return promise;
        };
        return service;
}]);