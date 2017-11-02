//Declaring app
var app = angular.module('app',['ngRoute']);

//Routing login page as main page and register as second
app.config(['$routeProvider', function($routeProvider){
        $routeProvider.when('/',{
            templateUrl: 'views/user_login.html',
            controller: 'user_login_controller'
        }).when('/RegisterView',{
            templateUrl: 'views/user_register.html',
            controller: 'user_register_controller'
        }).when('/HomeView',{
            templateUrl: 'views/home.html',
            controller: 'home_controller'
        }).otherwise({
            redirectTo: '/'
        });
}]);