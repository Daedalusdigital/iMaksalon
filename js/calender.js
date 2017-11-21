(function() {
  var app = angular.module('calendarApp', ['ngAnimate']);

    app.controller('calendarController', calendarController);
   
    app.controller('bookingController', ['$scope', 'populateStylistService','populateServices','SessionService',function($scope,populateStylistService,populateServices,SessionService){
        console.log("Working");

        
        populateStylistService.getStylists().then(function(res){
            $scope.stylistList = res.data;
            console.log(res.data);
        });
        populateServices.getServices().then(function(res){
            $scope.serviceList = res.data;
            console.log(res.data);
        });
    }]);

    app.factory('populateStylistService',['$http',function($http){
          var service={};
          service.getStylists=function(object){
              var promise=$http.get('https://prod-21.southcentralus.logic.azure.com:443/workflows/1f070dd37cff4e6c8d4e0bdd11fe97ac/triggers/request/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Frequest%2Frun&sv=1.0&sig=HN0ZFaXjcR2dqzRs8TKF9NJDzMx-52IFcAPNSE1ul24');
              return promise;
          };
          return service;
    }]);

    app.factory('populateServices',['$http',function($http){
          var service={};
          service.getServices=function(object){
              var promise=$http.get('https://prod-29.southcentralus.logic.azure.com:443/workflows/83965d3d70f3411398dfd6df9b0c7821/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=maRWUv8dFgMIw7uUlYJ9X2oAEKpd3r34ZL3UvBqAFd4');
              return promise;
          };
          return service;
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


  function calendarController($scope) {
    var vm = this,
      now = new Date(),
      months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      jan = daysInMonth(1, now.getFullYear()),
      feb = daysInMonth(2, now.getFullYear()),
      mar = daysInMonth(3, now.getFullYear()),
      apr = daysInMonth(4, now.getFullYear()),
      may = daysInMonth(5, now.getFullYear()),
      jun = daysInMonth(6, now.getFullYear()),
      jul = daysInMonth(7, now.getFullYear()),
      aug = daysInMonth(8, now.getFullYear()),
      sep = daysInMonth(9, now.getFullYear()),
      oct = daysInMonth(10, now.getFullYear()),
      nov = daysInMonth(11, now.getFullYear()),
      dec = daysInMonth(12, now.getFullYear()),
      monthRef = [jan, feb, mar, apr, may, jun, jul, aug, sep, oct, nov, dec],
      month = now.getMonth(),
      monthDay = monthRef[now.getMonth()],
      n = now.getDate(),
      uidi,
      uidm,
      uid;

    vm.id = now.getDate().toString() + now.getMonth().toString();
    vm.dataId;
    vm.events = [];
    vm.description;
    vm.type = 'Social';
    vm.month = months[month];
    vm.next = next;
    vm.prev = prev;
    vm.add = add;

    // Place Dates In Correct Place
    function placeIt() {
      if (month === 0) {
        $(".date_item").first().css({
          'margin-left': '200px'
        })
      } else if (month === 1) {
        $("date_item").first().css({
          'margin-left': '0px'
        })
      } else if (month === 2) {
        $(".date_item").first().css({
          'margin-left': '50px'
        })
      } else if (month === 3) {
        $(".date_item").first().css({
          'margin-left': '200px'
        })
      } else if (month === 4) {
        $(".date_item").first().css({
          'margin-left': '300px'
        })
      } else if (month === 5) {
        $(".date_item").first().css({
          'margin-left': '100px'
        })
      } else if (month === 6) {
        $(".date_item").first().css({
          'margin-left': '200px'
        })
      } else if (month === 7) {
        $(".date_item").first().css({
          'margin-left': '0px'
        })
      } else if (month === 8) {
        $(".date_item").first().css({
          'margin-left': '150px'
        })
      } else if (month === 9) {
        $(".date_item").first().css({
          'margin-left': '250px'
        })
      } else if (month === 10) {
        $(".date_item").first().css({
          'margin-left': '50px'
        })
      } else if (month === 11) {
        $(".date_item").first().css({
          'margin-left': '150px'
        })
      }
    }

    // Highlight Present Day
    function presentDay() {
      $(".date_item").eq(n - 1).addClass("present");
    }

    // Print List Of Dates For Current Month
    function showDays(days) {
      for (var i = 1; i < days; i++) {
        var uidi = i;
        var uidm = month;
        var uid = uidi.toString() + uidm.toString();
        $(".dates").append("<div class='date_item' data='" + uid + "'>" + i + "</div>");
      }
    }

    // Get The Current Date
    function daysInMonth(month, year) {
      return new Date(year, month, 0).getDate() + 1;
    }

    // Next Month
    function next() {
      if (month < 11) {
        month++;
        $(".dates").html('');
        vm.month = months[month];
        monthDay = monthRef[month];
        showDays(monthDay);
        placeIt();
      }
    }

    // Previous Month
    function prev() {
      if (month === 0) {
        return false
      } else {
        month--;
        $(".dates").html('');
        vm.month = months[month];
        monthDay = monthRef[month];
        showDays(monthDay);
        placeIt();
      }
    }

    // Add Events To Specified Date
    function add() {
      vm.events.push({
        id: vm.id,
        description: vm.description,
        type: vm.type
      });

      vm.description = "";
      console.log(vm.events);
    }

    // Fetch Unique ID For Each Date Item
    $(".dates").on("click", ".date_item", function() {
      vm.id = $(this).attr('data');
      vm.dataId = $(this).attr('data');
      $(this).addClass("present").siblings().removeClass("present");
      $scope.$apply();
    });

    showDays(monthDay);

    presentDay();

    placeIt();

  }

})();