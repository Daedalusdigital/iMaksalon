'use strict';
var stylistId;
var app = angular.module('Imakapp',[]);
app.controller("testingController", ['$scope','loginService','SessionService',function($scope,loginService,SessionService){
    
    console.log("Controller Loaded");
    
    $scope.login = function(values){
        var object = angular.toJson({login_username:values.username, login_password:values.password});
        
        console.log(object);
        
        loginService.sendLogin(object).then(function(res){
            if(res.data.response == "notfound")
            {
                $scope.result = "Failed to Login, Please Check Your Details";
            }
            else
            {
                alert("Successfully Login");
                $scope.stylistId = res.data[0].id;
                SessionService.set("stylestID", res.data[0].id);
                window.location.href = "../book-stylist.html";
            }
            console.log($scope.stylistId);
        });
    };
}]);
app.controller('viewingController',['$scope','$http','loginService','SessionService', function($scope,$http,loginService,SessionService){
     var stylistIds = SessionService.get("stylestID");

     $scope.loadContent = function(){
        var obj = angular.toJson({stylist_id: stylistIds});
        
       $http.post("https://prod-29.southcentralus.logic.azure.com:443/workflows/2aeb751e26da433db142414354443c7a/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=ggufLib2UUpQ2NRQ1GU6RopnvdFOPa0k4SicG-HTYJs",obj)
           .then(function(response){
               //$scope.bookings = response.data.records;
             $scope.bookinglist = response.data;
             console.log(response.data);
           },function(error){
               console.log(error);
           });
     }

        $scope.alterBooking = function(_id,btn_name,clientId,stylistId,booked_ser){
            var obj = angular.toJson({        id: _id,
                                              btnName: btn_name,
                                              booked_service: booked_ser,
                                              client_id:clientId,
                                              stylist_id : stylistId
                                      });
                                  
          $http.post("https://prod-18.southcentralus.logic.azure.com:443/workflows/e6a5f9eca53e4eb085d9765bd8bdc995/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=VMSIYNHfpk3uCm7wrEr4jRtubaNDxCBc5Z0q4TL5A54",obj)
                  .then(function(response){
                      //$scope.bookings = response.data.records;
                    console.log( response.data);
                  },function(error){
                      console.log(error);
                  });

                  $scope.loadContent();
                  
                  $('#preloader').show();
                  setTimeout(function(){ $('#preloader').fadeOut('slow') }, 5000);
                  
                 
        }
}]);

app.factory('loginService',['$http',function($http){
        var service={};
        service.sendLogin=function(object){
            var promise=$http.post('https://prod-22.southcentralus.logic.azure.com:443/workflows/1b392f4a2f4040fd9b4c94889b8d1ee6/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=IlxTdyaVHP_FVeiyd1cc-s8QJETRZ7Gc9MVBLDM1PQ4',object);
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
