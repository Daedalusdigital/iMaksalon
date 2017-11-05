'use strict';

var Imakapp = angular.module('Imakapp',[]);

Imakapp.controller("BookingController",['$scope','BookingService',function($scope,BookingService){
    $scope.makeBooking = function(){
        
        var object=angular.toJson({booking_status: $scope.bookingStatus, booked_service: $scope.bookedService, stylist_id: $scope.stylistId, client_id: $scope.clientId, service_date: $scope.serviceDate, service_time: $scope.service_time, service_location: $scope.serviceLocation});
        
        $scope.testing = object;
        
        BookingService.sendBooking(object).then(function(res){
                alert(object);
      },function(error){
          
      });
    };
    var response = BookingService.viewBooking().then(function(res){
        $scope.bookings = res.data;
    },function(error){
        
    });
    $scope.testings = response;
}]);

Imakapp.controller("viewingController",['$scope','BookingService',function($scope,BookingService){
    
    var obj = angular.toJson({stylist_id: "1"});
     var example = "";
        
        $scope.response = function(){
         example = BookingService.viewBooking(obj).then(function(res){
               console.log(res.data);
         },function(error){
               console.log(error.data);
         });
    };

    $scope.testings = example;
}]);

Imakapp.factory('BookingService',['$http',function($http){
        var service={};
        service.sendBooking=function(object){
            var promise=$http.post('https://prod-07.southcentralus.logic.azure.com:443/workflows/e56c907f3bd5481eafce38f606e1fe18/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=uxUIzpF9qyHfwNrVWSQWzMG7wyziqNpo3mqHUWjhKm0',object);
            return promise;
        };
        service.viewBooking=function(object){
          var promise=$http.get('https://prod-28.southcentralus.logic.azure.com:443/workflows/58795fd620174d4bbfe7879ba5634279/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=oZwt0DPhQZCHEyNBWiDn42IzPKjsUzsGXzjT-mVzIvY',object); 
          console.log(promise);
            
            return promise;
        };
}]);