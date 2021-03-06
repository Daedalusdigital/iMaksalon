'use strict';
var stylistId;
var app = angular.module('Imakapp',[]);
app.controller("testingController", ['$scope','loginService','SessionService',function($scope,loginService,SessionService){
    
    $scope.loading = false;
    
    console.log("Controller Loaded");
    
    $scope.login = function(values){
        $scope.loading = true;
        $scope.result = "";
        var object = angular.toJson({login_username:values.username, login_password:values.password});
 
        loginService.sendLogin(object).then(function(res){
            if(res.data.response == "notfound")
            {
                $scope.loading = false;
                $scope.result = "Failed to Login, Please Check Your Details";
            }
            else
            {
                console.log(res);
                
                $scope.loading = false;
                $scope.result = "Successfully Login";
                $scope.stylistId = res.data[0].style_id;
                SessionService.set("stylestID", res.data[0].style_id);
                SessionService.set("SalonId", res.data[0].salon_id);
                SessionService.set("stylestFname", res.data[0].firstname);
                SessionService.set("stylestSname", res.data[0].surname);
                SessionService.set("stylestEmail", res.data[0].email);
                SessionService.set("stylestContact", res.data[0].contact_number);
                SessionService.set("stylistState", res.data[0].state);
                SessionService.set("stylistCity", res.data[0].city);
                SessionService.set("stylistStreet", res.data[0].street);
                SessionService.set("stylistHouse", res.data[0].house_unit_number);
                SessionService.set("facebookUrl", res.data[0].facebook_url);
                SessionService.set("twitter_url", res.data[0].twitter_url);
                SessionService.set("instagram", res.data[0].instagram_url);

                $scope.stylistName = SessionService.get("stylestSname");
                window.location.href = "../book-stylist.html";
            }
            
        });
    };
}]);
app.controller('profileController',['$scope','$http','SessionService','updateProfileServices',function($scope,$http,SessionService,updateProfileServices){
    var stylistIds = SessionService.get("stylestID");
    var salonId = SessionService.get("SalonId");
    var stylistName = SessionService.get("stylestFname");
    var stylistSname = SessionService.get("stylestSname");
    var stylistEmail = SessionService.get("stylestEmail");
    var stylistContact = SessionService.get("stylestContact");
    var stylistState = SessionService.get("stylistState");
    var stylistCity = SessionService.get("stylistCity");
    var stylistStreet = SessionService.get("stylistStreet");
    var stylistHouse = SessionService.get("stylistHouse");
    var facebookUrl = SessionService.get("facebookUrl");
    var twitter = SessionService.get("twitter_url");
    var instagram = SessionService.get("instagram");


    $scope.stylistIds = stylistIds;
    $scope.salonId = salonId;
    $scope.stylistName = stylistName;
    $scope.stylistSname = stylistSname;
    $scope.stylistEmail = stylistEmail;
    $scope.stylistContact = stylistContact;
    $scope.stylistState = stylistState;
    $scope.stylistCity = stylistCity;
    $scope.stylistStreet = stylistStreet;
    $scope.stylistHouse = stylistHouse;
    $scope.facebookUrl = facebookUrl;
    $scope.twitter = twitter;
    $scope.instagram = instagram;

    $scope.updateProfile = function(){
        //alert("Clicked"+$scope.stylistName+" "+$scope.stylistSname+" State "+$scope.stylistState+" City"+$scope.stylistCity+" Street "+$scope.stylistStreet+" Houes "+$scope.stylistHouse);
        
        var object = angular.toJson(
            {   firstname:$scope.stylistName,
                surname:$scope.stylistSname,
                email:$scope.stylistEmail,
                contact_number:$scope.stylistContact,
                style_id:$scope.stylistIds,
                salon_id:$scope.salonId,
                state:$scope.stylistState,
                city: $scope.stylistCity,
                street:$scope.stylistStreet,
                house_unit_number:$scope.stylistHouse,
                facebook_url:$scope.facebookUrl,
                twitter_url: $scope.twitter,
                instagram_url:$scope.instagram
            }
            );

        updateProfileServices.updateProfile(object).then(function(res){
            if(res.data.response == "successful")
            {
                $scope.results = "Your Profile Was Updated Successfully";
        
                SessionService.set("stylestFname", $scope.stylistName);
                SessionService.set("stylestSname", $scope.stylistSname);
                SessionService.set("stylestEmail", $scope.stylistEmail);
                SessionService.set("stylestContact", $scope.stylistContact);
                SessionService.set("stylistState", $scope.stylistState);
                SessionService.set("stylistCity", $scope.stylistCity);
                SessionService.set("stylistStreet", $scope.stylistStreet);
                SessionService.set("stylistHouse", $scope.stylistHouse);
                SessionService.set("facebookUrl", $scope.facebookUrl);
                SessionService.set("twitter_url", $scope.twitter);
                SessionService.set("instagram", $scope.instagram);

                 stylistIds = SessionService.get("stylestID");
                 salonId = SessionService.get("SalonId");
                 stylistName = SessionService.get("stylestFname");
                 stylistSname = SessionService.get("stylestSname");
                 stylistEmail = SessionService.get("stylestEmail");
                 stylistContact = SessionService.get("stylestContact");
                 stylistState = SessionService.get("stylistState");
                 stylistCity = SessionService.get("stylistCity");
                 stylistStreet = SessionService.get("stylistStreet");
                 stylistHouse = SessionService.get("stylistHouse");
                 facebookUrl = SessionService.get("facebookUrl");
                 twitter = SessionService.get("twitter_url");
                 instagram = SessionService.get("instagram");
            
            
                $scope.stylistIds = stylistIds;
                $scope.salonId = salonId;
                $scope.stylistName = stylistName;
                $scope.stylistSname = stylistSname;
                $scope.stylistEmail = stylistEmail;
                $scope.stylistContact = stylistContact;
                $scope.stylistState = stylistState;
                $scope.stylistCity = stylistCity;
                $scope.stylistStreet = stylistStreet;
                $scope.stylistHouse = stylistHouse;
                $scope.facebookUrl = facebookUrl;
                $scope.twitter = twitter;
                $scope.instagram = instagram;

            }
            else{
                $scope.results = "Failed to Update, please check your updates";
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

     $scope.loading = false;

     $scope.stylistNames = stylistName;
     $scope.stylistSnames = stylistSname;
     
     $scope.loadContent = function(){
        $scope.loading = true;
        var obj = angular.toJson({stylist_id: stylistIds});
        
       $http.post("https://prod-29.southcentralus.logic.azure.com:443/workflows/2aeb751e26da433db142414354443c7a/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=ggufLib2UUpQ2NRQ1GU6RopnvdFOPa0k4SicG-HTYJs",obj)
           .then(function(response){
               //$scope.bookings = response.data.records;
               $scope.loading = false;
             $scope.bookinglist = response.data;
             console.log(response.data);
           },function(error){
            $scope.loading = false;
               console.log(error);
           });
     }

        $scope.alterBooking = function(_id,btn_name,clientId,stylistId,booked_ser){
            
        $scope.loading = true;
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
