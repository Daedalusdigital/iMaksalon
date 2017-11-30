'use strict';
var stylistId;
var app = angular.module('Imakapp',[]);
app.controller("testingController", ['$scope','loginService','SessionService',function($scope,loginService,SessionService){
    
    $scope.result = "Loading...";
    
    console.log("Controller Loaded");
    
    $scope.login = function(values){
        $scope.result = "Loading.....";
        var object = angular.toJson({login_username:values.username, login_password:values.password});
 
        loginService.sendLogin(object).then(function(res){
            if(res.data.response == "notfound")
            {
                $scope.result = "Failed to Login, Please Check Your Details";
                alert("Failed to login, Please Check Your Details");
            }
            else
            {
                console.log(res);
                alert("Successfully Login");
                $scope.stylistId = res.data[0].style_id;
                SessionService.set("stylestID", res.data[0].style_id);
                SessionService.set("stylestFname", res.data[0].firstname);
                SessionService.set("stylestSname", res.data[0].surname);
                SessionService.set("stylestEmail", res.data[0].email);
                SessionService.set("stylestContact", res.data[0].contact_number);
                SessionService.set("stylestPhysicalAddress", res.data[0].physical_address);

                $scope.stylistName = SessionService.get("stylestSname");
                window.location.href = "../book-stylist.html";
            }
            
        });
    };
}]);
app.controller('profileController',['$scope','$http','SessionService','updateProfileServices',function($scope,$http,SessionService,updateProfileServices){
    var stylistIds = SessionService.get("stylestID");
    var stylistName = SessionService.get("stylestFname");
    var stylistSname = SessionService.get("stylestSname");
    var stylistEmail = SessionService.get("stylestEmail");
    var stylistContact = SessionService.get("stylestContact");
    var stylistAddress = SessionService.get("stylestPhysicalAddress");

    $scope.stylistIds = stylistIds;
    $scope.stylistName = stylistName;
    $scope.stylistSname = stylistSname;
    $scope.stylistEmail = stylistEmail;
    $scope.stylistContact = stylistContact;
    $scope.stylistAddress = stylistAddress;

    $scope.updateProfile = function(){
        alert("Clicked"+stylistName+" "+stylistSname);
        var object = angular.toJson({firstname:stylistName,surname:stylistSname,email:stylistEmail,contact_number:stylistContact,style_id:stylistIds});
        alert(object);

        updateProfileServices.updateProfile(object).then(function(res){
            if(res.data.response == "successful")
            {
                alert("Your Profile Was Updated Successfully");
            }
            else{
                alert("Failed to Update, please check your updates");
            }
        });
    }
}]);
//Service to update Stylist Profile
app.factory('updateProfileServices',['$http',function($http){
    var service={};
    service.updateProfile=function(obj){
        var promise=$http.post('https://prod-19.southcentralus.logic.azure.com:443/workflows/b2c38f6388bf409f905d8695b43bad96/triggers/request/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Frequest%2Frun&sv=1.0&sig=JMPUFWbNdvP2vr02hju-mriPrMI-B2uU53CC5Datxu8',obj);
        return promise;
    };
    return service;
}]);

app.controller('viewingController',['$scope','$http','loginService','SessionService', function($scope,$http,loginService,SessionService){
     var stylistIds = SessionService.get("stylestID");
     var stylistName = SessionService.get("stylestFname");
     var stylistSname = SessionService.get("stylestSname");
     var stylistEmail = SessionService.get("stylestEmail");
     var stylistContact = SessionService.get("stylestContact");
     var stylistAddress = SessionService.get("stylestPhysicalAddress");

     $scope.stylistNames = stylistName;
     $scope.stylistSnames = stylistSname;
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
                    console.log(response.data);
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
