var app = angular.module('loginApp',[]);
var clientId;
app.controller('loginClientController',['$scope','loginService','SessionService',function($scope,loginService,SessionService){
       
    var values = {
        username : "",
        password : ""
    };
    
    console.log("Loading");
        $scope.clientLogin = function(values){
            $scope.result = "Loading....";
            var object = angular.toJson({client_username:values.username,client_password:values.password});
            
           
            console.log(object);
            
            loginService.sendLogin(object).then(function(res){
               if(res.data.response == 'notfound'){
                   $scope.result="User Not Found, Please check your details";
               }
               else{
                   console.log(res);
                   $scope.clientId = res.data[0].clnt_id;
                   SessionService.set("clientId", res.data[0].clnt_id);
                   SessionService.set("clientName",res.data[0].fname);
                   SessionService.set("clientSurname",res.data[0].Sname);
                   window.location.href = "../dashboard.html";
               }
            },
        function(error){
            $scope.result="User not found";
        });
        };
}]);
app.controller('viewingController',['$scope','$http','SessionService',function($scope,$http,SessionService){
    var clientIds = SessionService.get("clientId");
    var clientName = SessionService.get("clientName");
    var clientSname = SessionService.get("clientSurname");

    $scope.clientNames = clientName;
    $scope.clientSnames = clientSname;
    
    $scope.loadContent = function(){
       var obj = angular.toJson({client_id: clientIds});
       alert("Loaded");
      $http.post("https://prod-11.southcentralus.logic.azure.com:443/workflows/11d6344af2e5400f8165a0f49d50b813/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=5HU7C4ioqfeR9gkRFjoEx1zGxnDLnfVY-JN7d74Sr50",obj)
          .then(function(response){
              //$scope.bookings = response.data.records;
            $scope.bookinglist = response.data;
            console.log(response.data);
          },function(error){
              console.log(error);
          });
    }
}]);
app.factory('loginService',['$http',function($http){
        var service={};
        service.sendLogin=function(object){
            var promise=$http.post('https://prod-11.southcentralus.logic.azure.com:443/workflows/8ea605edcca54d7fbaf3f62f14c56b45/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=UHV0e2j-U-tlDOELeb3ZRZCL_oipf6rJtOmqvq6N3tc',object);
            return promise;
        };
        return service;
}]);

app.factory('SessionService',[function(){
    var service={};
    
    service.set=function(key,value)
    {
       return sessionStorage.setItem(key,value);
        
    }
    service.get=function(key)
    {
        return sessionStorage.getItem(key);
    }
    service.destroy=function(key)
    {
        return sessionStorage.removeItem(key);
    }
    return service;
}]);
