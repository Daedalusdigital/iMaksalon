'use strict';

var app = angular.module('bookingApp',[]);

app.controller("bookingController",['$scope','BookingService', function($scope,BookingService){
        $scope.heading = "Bookings";
        
        $scope.makeBooking = function(){
            var object = angular.toJson({booked_service: $scope.bookedService, stylist_id: $scope.stylistId, client_id: $scope.clientId, service_date: $scope.serviceDate, service_time: $scope.service_time, service_location: $scope.serviceLocation});
            
            $scope.results = object;
            console.log(object);
            
            BookingService.sendBooking(object).then(function(res){
                alert(res.data.response);
               // res = JSON.stringify(res.data.response);
                
                if(res.data.response == "1"){
                    alert("Good ");
                }
                if(res.data.response == "0"){
                    alert("Wasn't Registered");
                }
            });
        };
}]);

app.factory('BookingService',['$http',function($http){
        var service={};
        service.sendBooking=function(object){
            var promise=$http.post('https://prod-07.southcentralus.logic.azure.com:443/workflows/e56c907f3bd5481eafce38f606e1fe18/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=uxUIzpF9qyHfwNrVWSQWzMG7wyziqNpo3mqHUWjhKm0',object);
            return promise;
        };
        return service;
}]);