var app = angular.module("csvApp", ["ngSanitize", "ngCsv"]);

app.controller("csvController",function($scope, $http){
  $http.get('https://prod-19.southcentralus.logic.azure.com:443/workflows/03520c6f053b40f3b917e3695cdcdcf8/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=9Lm3IX8yB9vMpyCA2p2I2fKJcr5behrTCOecT4w8Rdw').
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