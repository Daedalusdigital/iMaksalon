var app = angular.module('app',[]);

app.controller('notificationController', ['$scope','$http','SessionService',function($scope,$http,SessionService){  
    $scope.alterNotification = function(obj,btnName){
        alert("Button Name : "+btnName+"\n"+angular.toJson(obj));
    }

    // $scope.notifications = [{
    //         'Name':'Sphamandla',
    //         'Description':'He is a boy',
    //         'Date':'07 Jan 2017'
    //     },
    //     {
    //         'Name':'Nhlanhla',
    //         'Description':'He is a boy',
    //         'Date':'04 Jan 2016'
    //     },
    //     {
    //         'Name':'Fortune',
    //         'Description':'He is a guy',
    //         'Date':'01 Jan 2015'
    //     },
    // ]
        var clientIds = SessionService.get("clientId");
        var obj = angular.toJson({client_id: clientIds});

        $scope.loading = true;
        $http.post("https://prod-25.southcentralus.logic.azure.com:443/workflows/4e1e81034fd349638c36b7cda5f3540c/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=g622NdS1IebLamr9YESHvHl4oSMIyjFuuuWyI2AcYbs",obj)
            .then(function(response){

                $scope.loading = false;

                $scope.notificationList = response.data;

                console.log($scope.notificationList);
            },function(error){
                $scope.loading = false;
                console.log(error);
        });
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