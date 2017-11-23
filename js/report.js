var report = angular.module('reportApp', []);

report.controller('reportCtl',['$scope','$http',function($scope,$http){
  /*  var client__id = SessionService.get("client__ID");    
    var firstname = SessionService.get("fname");
    var lastname = SessionService.get("lname");
    var email = SessionService.get("client_email");*/


    $scope.support = function(obj){
        alert("In.");
        var object = angular.toJson(
            {
                firstname:obj.guest_name,
                lastname :obj.guest_surname,
                client_email : obj.guest_email,
                comment : obj.guest_comment
            
            });

            $http.post("https://prod-08.southcentralus.logic.azure.com:443/workflows/91e74bcd49474aafaf8e83f912fd69fb/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=EBauPJYzf8L5w-YVMKQen3KkKNwmXiAPRJIjT45UJJY",object)
            .then(function(response){
                //$scope.bookings = response.data.records;
              console.log(response.data);
              alert("report was sent successfully.Please check your emails for confirmation.");
            },function(error){
                console.log(error);
            });

    };

}]);

