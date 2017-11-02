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

app.controller("emailController",['$scope','SubscribeService', function($scope,SubscribeService){
    
    $scope.subscribe=function(){

        var object = angular.toJson({subscriber_email: $scope.testing}); 
        alert($scope.testing);
        SubscribeService.sendSubscription(object).then(function(res){
              console.log(res.data)
        },function(error){
            console.log("Message "+ error);
        });
    }
}]);

app.factory('SubscribeService', ['$http', function($http){
    var service = {};

    service.sendSubscription = function(obj){
        var promise = $http.post('https://prod-15.southcentralus.logic.azure.com:443/workflows/5a26ca01dba347e18315754df4e59104/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=XGYSjGwuWHFZ8jpVouh15ocJhZFfFFodcVgkQ8ETeUM', obj);
        return promise;
    };
    
    return service;
}]);