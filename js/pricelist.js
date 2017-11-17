var app = angular.module("csvApp", ["ngSanitize", "ngCsv"]);

app.controller("csvController", ["$scope",
  function($scope, $http) {
    $scope.datos = [{
      id: 1,
      Name: 'Juan',
      service: 'Mario',
      price: 'Perez',
      availability: 'Maldonado',
  
    }, {
      id: 2,
      Name: 'Jorge',
      service: 'Alfonzo',
      price: 'Quinto',
      availability: 'Marroquin',

    }, {
      id: 3,
      Name: 'Carlos',
      service: 'Alberto',
      price: 'Vargas',
      availability: 'Martinez',
    }, {
      id: 4,
      Name: 'Mario',
      service: 'Alvaro',
      price: 'Hernadez',
      availability: 'Morales',
    }, {
      id: 5,
      Name: 'Marlon',
      service: 'Federico',
      price: 'Lopez',
      availability: 'Padilla',
    }, {
      id: 6,
      Name: 'Daniel',
      service: 'Francisco',
      price: 'Herrera',
      availability: 'Perdomo',
    }, {
      id: 7,
      Name: 'Cesar',
      service: 'Jaime',
      price: 'Arroche',
      availability: 'Pedrosa',
    }];
  }
]);