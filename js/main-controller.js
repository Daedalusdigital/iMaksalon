app.controller('MainController', ['$scope', '$http',
    function MainController($scope, $http) {

          $scope.people = [];
                  $scope.recent_posts = [];
          $http.get('https://prod-14.southcentralus.logic.azure.com:443/workflows/ddfbff4cd859434897cf388edee47955/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=k5pJbHXL04UUSW4tqaiB38pGbI195PuLkqQ81yVeUoo',$scope.people).success(function(data)
            {
                  $scope.people = data;
            })   

    }
]);