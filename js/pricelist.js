var app = angular.module("csvApp", ["ngSanitize", "ngCsv"]);

app.controller("csvController",function($scope, $http){
  $http.get('https://prod-28.southcentralus.logic.azure.com:443/workflows/471cd7b33694476dbbaded25185a8e26/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=Tn-Tyq6LUvoT4lu9Oe9qFNvibkx7acDHSFlw0sXJ5Zo').
    success(function(data) {
      $scope.data1 = data;
      $scope.random = function() {
        return 0.5 - Math.random();
      }
    }).
    error(function(data) {
      // log error
    });
});