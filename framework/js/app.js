var app = angular.module('mainApp',['ngRoute']);

app.config(function($routeProvider){
    $routeProvider
    .when('/',{
        templateUrl : 'views/home.html',
        controller : 'viewController'
    })
    .when('/bookings',{
        templateUrl : 'views/bookings.html',
        controller : 'bookingsController'
    })
    .when('/gallery',{
        templateUrl : 'views/gallery.html',
        controller : 'galleryController'
    })
    .when('/map',{
        templateUrl : 'views/map.html',
        controller : 'mapController'
    })
    .when('/notifications',{
        templateUrl : 'views/notifications.html',
        controller : 'notificationController'
    })
    .when('/reports',{
        templateUrl : 'views/reports.html',
        controller : 'reportController'
    })
    .when('/salons',{
        templateUrl : 'views/salons.html',
        controller : 'salonController'
    })
    .when('/stylist',{
        templateUrl : 'views/stylist.html',
        controller : 'stylistController'
    });
});