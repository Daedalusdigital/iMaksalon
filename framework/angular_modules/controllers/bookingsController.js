'use strict';

var app = angular.module('bookingApp',[]);

app.controller("bookingController",['$scope','BookingService','populateServices','populateStylistService', 'SessionService', function($scope,BookingService,populateServices,populateStylistService,SessionService){
        $scope.heading = "Bookings";
        var clientId = SessionService.get("clientId");
        var clientName = SessionService.get("clientName");
        var clientSname = SessionService.get("clientSurname");

        
        $scope.clientid = clientId;
        $scope.clientname = clientName;
        $scope.clientsname = clientSname;
        $scope.makeBooking = function(values){
            
            var object = angular.toJson({booked_service: values.bookedService, stylist_id: values.stylistId, client_id: clientId, service_date: values.serviceDate, service_time: values.service_time, service_location: values.serviceLocation});
           
            console.log(object);
            
            BookingService.sendBooking(object).then(function(res){
               if(res.data.response=='1'){
                   $scope.results = "You've booked successfully";
                   var object = angular.toJson({feed_description: "New Booking", feed_type: "bookings"});
                   
                   $http.post('https://prod-14.southcentralus.logic.azure.com:443/workflows/a0742c1197b74358a25d4392507ae093/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=YedVUN8n_kYuNW-GbDw7UNlKZ5QbcgP_x90fEuaJbng',object);      
               }
               else{
                   $scope.results = "Booking failed, please check your details";
               }
            });
        };
        populateServices.getServices().then(function(res){
            $scope.serviceList = res.data;
            console.log(res.data);
        });
        populateStylistService.getStylists().then(function(res){
            $scope.stylistList = res.data;
            console.log(res.data);
        });
}]);

app.factory('BookingService',['$http',function($http){
        var service={};
        service.sendBooking=function(object){
            var promise=$http.post('https://prod-07.southcentralus.logic.azure.com:443/workflows/e56c907f3bd5481eafce38f606e1fe18/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=uxUIzpF9qyHfwNrVWSQWzMG7wyziqNpo3mqHUWjhKm0',object);
            return promise;
        };
        return service;
}]);
app.factory('populateServices',['$http',function($http){
        var service={};
        service.getServices=function(object){
            var promise=$http.get('https://prod-29.southcentralus.logic.azure.com:443/workflows/83965d3d70f3411398dfd6df9b0c7821/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=maRWUv8dFgMIw7uUlYJ9X2oAEKpd3r34ZL3UvBqAFd4');
            return promise;
        };
        return service;
}]);
app.factory('populateStylistService',['$http',function($http){
        var service={};
        service.getStylists=function(object){
            var promise=$http.get('https://prod-21.southcentralus.logic.azure.com:443/workflows/1f070dd37cff4e6c8d4e0bdd11fe97ac/triggers/request/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Frequest%2Frun&sv=1.0&sig=HN0ZFaXjcR2dqzRs8TKF9NJDzMx-52IFcAPNSE1ul24');
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