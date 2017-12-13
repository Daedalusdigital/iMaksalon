var app = angular.module('loginApp',[]);
var clientId;
app.controller('loginClientController',['$scope','loginService','SessionService',function($scope,loginService,SessionService){

    console.log("Loading");

    $scope.loading = false;
        $scope.clientLogin = function(values){
            $scope.result = "";
            
            $scope.loading = true;
            var object = angular.toJson({client_username:values.username,client_password:values.password});
            
           
            console.log(object);
            
            loginService.sendLogin(object).then(function(res){
               if(res.data.response == 'notfound'){
                   
                   $scope.loading = false;
                   $scope.result="User Not Found, Please check your details";
               }
               else{
                   console.log(res);
                   $scope.loading = false;
                   $scope.result = "Successfully logged in";
                   $scope.clientId = res.data[0].clnt_id;
                   SessionService.set("clientId", res.data[0].clnt_id);
                   SessionService.set("clientName",res.data[0].fname);
                   SessionService.set("clientSurname",res.data[0].Sname);
                   SessionService.set("clientEmail",res.data[0].email);
                   SessionService.set("clientPhone",res.data[0].phone_number);
                   SessionService.set("clientHouse",res.data[0].house_unit_number);
                   SessionService.set("clientStreet",res.data[0].Street);
                   SessionService.set("clientCity",res.data[0].city);
                   SessionService.set("clientState",res.data[0].state);

                   window.location.href = "../dashboard.html";
               }
            },
        function(error){
            $scope.result="User not found";
        });
        };
}]);

app.controller("serviceListController",function($scope, $http){

  $scope.refreshServiceList = function(){
    
    $scope.loading = true;
        
    $http.get('https://prod-19.southcentralus.logic.azure.com:443/workflows/03520c6f053b40f3b917e3695cdcdcf8/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=9Lm3IX8yB9vMpyCA2p2I2fKJcr5behrTCOecT4w8Rdw').
      success(function(data) {
        $scope.data1 = data;
        console.log($scope.data1);
        $scope.random = function() {
          return 0.5 - Math.random();
        }
        $scope.loading = false;
      }).
      error(function(data) {
        // log error
        $scope.loading = false;
      });
  
    }
  });
  

app.controller("productListController",function($scope, $http){

      $scope.refreshProductList = function(){
    
        $scope.loading = true;
    
        $http.get('https://prod-28.southcentralus.logic.azure.com:443/workflows/471cd7b33694476dbbaded25185a8e26/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=Tn-Tyq6LUvoT4lu9Oe9qFNvibkx7acDHSFlw0sXJ5Zo').
        success(function(data) {
          $scope.data1 = data;
          $scope.loading = false;
    
          $scope.random = function() {
            return 0.5 - Math.random();
          }
          
        }).
        error(function(data) {
          // log error
          
          $scope.loading = false;
        });
      }
      
    });

app.controller('clientProfileController',['$scope','SessionService','updateProfileServices',function($scope,SessionService,updateProfileServices){
    
    var clientIds = SessionService.get("clientId");
    //var salonId = SessionService.get("SalonId");
    var clientName = SessionService.get("clientName");
    var clientSurname = SessionService.get("clientSurname");
    var clientEmail = SessionService.get("clientEmail");
    var clientPhone = SessionService.get("clientPhone");
    var clientState = SessionService.get("clientState");
    var clientCity = SessionService.get("clientCity");
    var clientStreet = SessionService.get("clientStreet");
    var clientHouse = SessionService.get("clientHouse");


    $scope.clientIds = clientIds;
    $scope.clientName = clientName;
    $scope.clientSurname = clientSurname;
    $scope.clientEmail = clientEmail;
    $scope.clientPhone = clientPhone;
    $scope.clientState = clientState;
    $scope.clientCity = clientCity;
    $scope.clientStreet = clientStreet;
    $scope.clientHouse = clientHouse;


    $scope.updateProfile = function(){

        var object = angular.toJson(
            {   fname:$scope.clientName,
                sname:$scope.clientSurname,
                email:$scope.clientEmail,
                phone_number:$scope.clientPhone,
                clnt_id:$scope.clientIds,
                state:$scope.clientState,
                city: $scope.clientCity,
                street:$scope.clientStreet,
                house_unit_number:$scope.clientHouse
            }
            );

        updateProfileServices.updateProfile(object).then(function(res){
            if(res.data.response == "successful")
            {
                $scope.results = "Your Profile Was Updated Successfully";
        
                SessionService.set("clientId", res.data[0].clnt_id);
                SessionService.set("clientName",res.data[0].fname);
                SessionService.set("clientSurname",res.data[0].Sname);
                SessionService.set("clientEmail",res.data[0].email);
                SessionService.set("clientPhone",res.data[0].phone_number);
                SessionService.set("clientHouse",res.data[0].house_unit_number);
                SessionService.set("clientStreet",res.data[0].Street);
                SessionService.set("clientCity",res.data[0].city);
                SessionService.set("clientState",res.data[0].state);

                var clientIds = SessionService.get("clientId");
                var clientName = SessionService.get("clientName");
                var clientSurname = SessionService.get("clientSurname");
                var clientEmail = SessionService.get("clientEmail");
                var clientPhone = SessionService.get("clientPhone");
                var clientState = SessionService.get("clientState");
                var clientCity = SessionService.get("clientCity");
                var clientStreet = SessionService.get("clientStreet");
                var clientHouse = SessionService.get("clientHouse");
            
            
                $scope.clientIds = clientIds;
                $scope.clientName = clientName;
                $scope.clientSurname = clientSurname;
                $scope.clientEmail = clientEmail;
                $scope.clientPhone = clientPhone;
                $scope.clientState = clientState;
                $scope.clientCity = clientCity;
                $scope.clientStreet = clientStreet;
                $scope.clientHouse = clientHouse;

            }
            else{
                $scope.results = "Failed to Update, please check your updates";
            }
        });
    }
}]);
app.factory('updateProfileServices',['$http',function($http){
    var service={};
    service.updateProfile=function(obj){
        var promise=$http.post('https://prod-12.southcentralus.logic.azure.com:443/workflows/c24ed9a0a9e34b71b3eb5c364c012de6/triggers/request/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Frequest%2Frun&sv=1.0&sig=0EUlv-CYCJN_eAFdb_xIHzkmg77O-eGoKbNIYNQ0lHU',obj);
        return promise;
    };
    return service;
}]);

app.controller('viewingController',['$scope','$http','SessionService',function($scope,$http,SessionService){
    var clientIds = SessionService.get("clientId");
    var clientName = SessionService.get("clientName");
    var clientSname = SessionService.get("clientSurname");
    $scope.loading = true;
    $scope.clientNames = clientName;
    $scope.clientSnames = clientSname;
    
    $scope.loadContent = function(){
        var obj = angular.toJson({client_id: clientIds});
        $scope.loading = true;
        
        $http.post("https://prod-11.southcentralus.logic.azure.com:443/workflows/11d6344af2e5400f8165a0f49d50b813/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=5HU7C4ioqfeR9gkRFjoEx1zGxnDLnfVY-JN7d74Sr50",obj)
            .then(function(response){
                //$scope.bookings = response.data.records;
                $scope.loading = false;
                $scope.bookinglist = response.data;
                $scope.results = response.data;
            },function(error){
                $scope.loading = false;
                console.log(error);
            });
    }
}]);

app.controller('notificationController',['$scope','$http','SessionService',function($scope,$http,SessionService){
    var clientIds = SessionService.get("clientId");

    alert("Works");

    $scope.loadContent = function(){

        var obj = angular.toJson({client_id: clientIds});

        $scope.loading = true;
        $http.post("https://prod-25.southcentralus.logic.azure.com:443/workflows/4e1e81034fd349638c36b7cda5f3540c/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=g622NdS1IebLamr9YESHvHl4oSMIyjFuuuWyI2AcYbs",obj)
           .then(function(response){

             $scope.loading = false;

             $scope.notificationList = response.data[0];

             console.log($scope.notificationList);
             alert("Works = "+$scope.notificationList[0].message);
           },function(error){
             $scope.loading = false;
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
