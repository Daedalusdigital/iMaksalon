var app = angular.module("csvApp", ["ngSanitize", "ngCsv"]);

app.controller("productListController",function($scope, $http){
<<<<<<< HEAD


  $scope.refreshProductList = function(){

    $scope.loading = true;

    $http.get('https://prod-28.southcentralus.logic.azure.com:443/workflows/471cd7b33694476dbbaded25185a8e26/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=Tn-Tyq6LUvoT4lu9Oe9qFNvibkx7acDHSFlw0sXJ5Zo').
=======
  
  $http.get('https://prod-28.southcentralus.logic.azure.com:443/workflows/471cd7b33694476dbbaded25185a8e26/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=Tn-Tyq6LUvoT4lu9Oe9qFNvibkx7acDHSFlw0sXJ5Zo').
>>>>>>> 8ec827ac2e389cf2c73a422c374184327ca6b4e5
    success(function(data) {
      $scope.data1 = data;
      $scope.loading = false;

      $scope.random = function() {
        return 0.5 - Math.random();
      }
      
    }).
    error(function(data) {
      // log error
      
      $scope.loading = false;
    });
  }
  
});

app.controller("serviceListController",function($scope, $http){
  
  $http.get('https://prod-19.southcentralus.logic.azure.com:443/workflows/03520c6f053b40f3b917e3695cdcdcf8/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=9Lm3IX8yB9vMpyCA2p2I2fKJcr5behrTCOecT4w8Rdw').
    success(function(data) {
      $scope.data1 = data;
      console.log($scope.data1);
      $scope.random = function() {
        return 0.5 - Math.random();
      }
    }).
    error(function(data) {
      // log error
    });
});