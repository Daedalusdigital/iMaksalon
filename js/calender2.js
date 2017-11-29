var app = angular.module('dateTimeApp', ['ngSanitize', 'angularSearchPlaces']);

app.controller('dateTimeCtrl', function ($scope) {
    var ctrl = this;
    
    ctrl.selected_date = new Date();
    ctrl.selected_date.setHours(10);
    ctrl.selected_date.setMinutes(0);
    
    ctrl.updateDate = function (newdate) {
        
        // Do something with the returned date here.
<<<<<<< Updated upstream
=======
     

>>>>>>> Stashed changes
        console.log(newdate);
        var timee = newdate.toString();
        var newTime = timee.substring(16,21);
        var newDate = timee.substring(0,15);

        $scope.newTimeSelected = newTime;
        $scope.newDateSelected = newDate;
    };
});
app.controller('reportCtl',['$scope','$http',function($scope,$http){
    /*  var client__id = SessionService.get("client__ID");    
      var firstname = SessionService.get("fname");
      var lastname = SessionService.get("lname");
      var email = SessionService.get("client_email");*/
  
  
      $scope.support = function(obj){
          $scope.loading = "Loading...";
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
                obj.guest_name = "";
                obj.guest_surname = "";
                obj.guest_email = "";
                obj.guest_comment = "";
                location.reload();

              },function(error){
                  console.log(error);
              });
  
      };
  
  }]);
 app.controller('bookingController', ['$scope','$http', 'BookingService', 'populateStylistService','populateServices','SessionService',function($scope,$http,BookingService,populateStylistService,populateServices,SessionService){
        console.log("Working");

        var clientId =  SessionService.get("clientId");
        var clientName = SessionService.get("clientName");
        var clientSname = SessionService.get("clientSurname");

        $scope.clientid = clientId;
        $scope.clientname = clientName;
        $scope.clientsname = clientSname;
        
        $scope.makeBooking = function(values){
            //alert("Clicked");
            var serviceDate = $scope.newDateSelected;
            var serviceTime = $scope.newTimeSelected;

            //alert("Booked Service "+values.bookedService.name+" Stylist Id "+values.stylistId.style_id+" Client Id "+clientId+" Service Date "+serviceDate+" Service Time "+serviceTime+" Service Price "+values.bookedService.price+" Stylist Location "+values.stylistId.salon_physical_address)
            var object = angular.toJson({booked_service: values.bookedService.name, stylist_id: values.stylistId.style_id, client_id: clientId, service_date: serviceDate, service_time: serviceTime, service_location: values.stylistId.salon_physical_address});
           
            console.log(object);
             BookingService.sendBooking(object).then(function(res){
                if(res.data.response=='1'){
                    $scope.results = "You've booked successfully";
                    console.log("You've booked successfully");
                    alert("You've booked successfully");
                    location.reload();
                }
                else{
                    $scope.results = "Booking failed, please check your details";
                }
             });
        };
        
        populateStylistService.getStylists().then(function(res){
            $scope.stylistList = res.data;
            //$scope.stylistImage = res.data[0].profile_pic;
            console.log(res.data);
        });
        populateServices.getServices().then(function(res){
            $scope.serviceList = res.data;
            console.log(res.data);
        });
    }]);

    app.factory('BookingService',['$http',function($http){
          var service={};
          service.sendBooking=function(object){
              var promise=$http.post('https://prod-07.southcentralus.logic.azure.com:443/workflows/e56c907f3bd5481eafce38f606e1fe18/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=uxUIzpF9qyHfwNrVWSQWzMG7wyziqNpo3mqHUWjhKm0',object);
              return promise;
          };
          return service;
    }]);

    app.factory('populateStylistService',['$http',function($http){
          var service={};
          service.getStylists=function(object){
              var promise=$http.get('https://prod-14.southcentralus.logic.azure.com:443/workflows/ddfbff4cd859434897cf388edee47955/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=k5pJbHXL04UUSW4tqaiB38pGbI195PuLkqQ81yVeUoo');
              return promise;
          };
          return service;
    }]);

    app.factory('populateServices',['$http',function($http){
          var service={};
          service.getServices=function(object){
              var promise=$http.get('https://prod-19.southcentralus.logic.azure.com:443/workflows/03520c6f053b40f3b917e3695cdcdcf8/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=9Lm3IX8yB9vMpyCA2p2I2fKJcr5behrTCOecT4w8Rdw');
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

 
app.directive('datePicker', function ($timeout, $window) {
    return {
        restrict: 'AE',
        scope: {
            selecteddate: "=",
            updatefn: "&",
            open: "=",
            datepickerTitle: "@",
            customMessage: "@",
            picktime: "@",
            pickdate: "@",
            pickpast: '=',
            mondayfirst: '@'
        },
        transclude: true,
        link: function (scope, element, attrs, ctrl, transclude) {
            transclude(scope, function(clone, scope) {
                element.append(clone);
            });
            
            if (!scope.selecteddate) {
                scope.selecteddate = new Date();
            }

            if (attrs.datepickerTitle) {
                scope.datepicker_title = attrs.datepickerTitle;
            }

            scope.days = [
                { "long":"Sunday","short":"Sun" },
                { "long":"Monday","short":"Mon" },
                { "long":"Tuesday","short":"Tue" },
                { "long":"Wednesday","short":"Wed" },
                { "long":"Thursday","short":"Thu" },
                { "long":"Friday","short":"Fri" },
                { "long":"Saturday","short":"Sat" },
            ];
            if (scope.mondayfirst == 'true') {
                var sunday = scope.days[0];
                scope.days.shift();
                scope.days.push(sunday);
            }

            scope.monthNames = [
                "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
            ];

            function getSelected() {
                if (scope.currentViewDate.getMonth() == scope.localdate.getMonth()) {
                    if (scope.currentViewDate.getFullYear() == scope.localdate.getFullYear()) {
                        for (var number in scope.month) {
                            if (scope.month[number].daydate == scope.localdate.getDate()) {
                                scope.month[number].selected = true;
                                if (scope.mondayfirst == 'true') {
                                    if (parseInt(number) === 0) {
                                        number = 6;
                                    } else {
                                        number = number - 1;
                                    }
                                }
                                scope.selectedDay = scope.days[scope.month[number].dayname].long;
                            }
                        }
                    }
                }
            }

            function getDaysInMonth() {
                var month = scope.currentViewDate.getMonth();
                var date = new Date(scope.currentViewDate.getFullYear(), month, 1);
                var days = [];
                var today = new Date();
                while (date.getMonth() === month) {
                    var showday = true;
                    if (!scope.pickpast && date < today) {
                        showday = false;
                    }
                    if (today.getDate() == date.getDate() &&
                        today.getYear() == date.getYear() &&
                        today.getMonth() == date.getMonth()) {
                        showday = true;
                    }
                    var day = new Date(date);
                    var dayname = day.getDay();
                    var daydate = day.getDate();
                    days.push({ 'dayname': dayname, 'daydate': daydate, 'showday': showday });
                    date.setDate(date.getDate() + 1);
                }
                scope.month = days;
            }

            function initializeDate() {
                scope.currentViewDate = new Date(scope.localdate);
                scope.currentMonthName = function () {
                    return scope.monthNames[scope.currentViewDate.getMonth()];
                };
                getDaysInMonth();
                getSelected();
            }

            // Takes selected time and date and combines them into a date object
            function getDateAndTime(localdate) {
                var time = scope.time.split(':');
                if (scope.timeframe == 'am' && time[0] == '12') {
                    time[0] = 0;
                } else if (scope.timeframe == 'pm' && time[0] !== '12') {
                    time[0] = parseInt(time[0]) + 12;
                }
                return new Date(localdate.getFullYear(), localdate.getMonth(), localdate.getDate(), time[0], time[1]);                
            }

            // Convert to UTC to account for different time zones
            function convertToUTC(localdate) {
                var date_obj = getDateAndTime(localdate);
                var utcdate = new Date(date_obj.getUTCFullYear(), date_obj.getUTCMonth(), date_obj.getUTCDate(), date_obj.getUTCHours(), date_obj.getUTCMinutes());
                return utcdate;
            }
            // Convert from UTC to account for different time zones
            function convertFromUTC(utcdate) {
                localdate = new Date(utcdate);
                return localdate;
            }

            // Returns the format of time desired for the scheduler, Also I set the am/pm
            function formatAMPM(date) {
                var hours = date.getHours();
                var minutes = date.getMinutes();
                hours >= 12 ? scope.changetime('pm') : scope.changetime('am');
                hours = hours % 12;
                hours = hours ? hours : 12; // the hour '0' should be '12'
                minutes = minutes < 10 ? '0' + minutes : minutes;
                var strTime = hours + ':' + minutes;
                return strTime;
            }
            
            scope.$watch('open', function() {
                if (scope.selecteddate !== undefined && scope.selecteddate !== null) {
                    scope.localdate = convertFromUTC(scope.selecteddate);
                } else {
                    scope.localdate = new Date();
                    scope.localdate.setMinutes(Math.round(scope.localdate.getMinutes() / 60) * 30);
                }
                scope.time = formatAMPM(scope.localdate);
                scope.setTimeBar(scope.localdate);
                initializeDate();
                scope.updateInputTime();
            });

            scope.selectDate = function (day) {

                if (scope.pickdate == "true" && day.showday) {
                    for (var number in scope.month) {
                        var item = scope.month[number];
                        if (item.selected === true) {
                            item.selected = false;
                        }
                    }
                    day.selected = true;
                    scope.selectedDay = scope.days[day.dayname].long;
                    scope.localdate = new Date(scope.currentViewDate.getFullYear(), scope.currentViewDate.getMonth(), day.daydate);
                    initializeDate(scope.localdate);
                    scope.updateDate();
                }
            };

            scope.updateDate = function () {
                if (scope.localdate) {
                    var newdate = getDateAndTime(scope.localdate);
                    scope.updatefn({newdate:newdate});
                }
            };

            scope.moveForward = function () {
                scope.currentViewDate.setMonth(scope.currentViewDate.getMonth() + 1);
                if (scope.currentViewDate.getMonth() == 12) {
                    scope.currentViewDate.setDate(scope.currentViewDate.getFullYear() + 1, 0, 1);
                }
                getDaysInMonth();
                getSelected();
            };

            scope.moveBack = function () {
                scope.currentViewDate.setMonth(scope.currentViewDate.getMonth() - 1);
                if (scope.currentViewDate.getMonth() == -1) {
                    scope.currentViewDate.setDate(scope.currentViewDate.getFullYear() - 1, 0, 1);
                }
                getDaysInMonth();
                getSelected();
            };

            scope.calcOffset = function (day, index) {
                if (index === 0) {
                    var offset = (day.dayname * 14.2857142) + '%';
                    if (scope.mondayfirst == 'true') {
                        offset = ((day.dayname - 1) * 14.2857142) + '%';
                    }
                    return offset;
                }
            };
            
            ///////////////////////////////////////////////
            // Check size of parent element, apply class //
            ///////////////////////////////////////////////
            scope.checkWidth = function (apply) {
                var parent_width = element.parent().width();
                if (parent_width < 620) {
                    scope.compact = true;
                } else {
                    scope.compact = false;
                }
                if (apply) {
                    scope.$apply();
                }
            };
            scope.checkWidth(false);
            
            //////////////////////
            // Time Picker Code //
            //////////////////////
            if (scope.picktime) {
                var currenttime;
                var timeline;
                var timeline_width;
                var timeline_container;
                var sectionlength;

                scope.getHours = function () {
                    var hours = new Array(11);
                    return hours;
                };

                scope.time = "12:00";
                scope.hour = 12;
                scope.minutes = 0;
                scope.currentoffset = 0;

                scope.timeframe = 'am';

                scope.changetime = function(time) {
                    scope.timeframe = time;
                    scope.updateDate();
                    scope.updateInputTime();                    
                };
                
                scope.edittime = {
                    digits: []
                };
                
                scope.updateInputTime = function () {
                    scope.edittime.input = scope.time + ' ' + scope.timeframe;
                    scope.edittime.formatted = scope.edittime.input;
                };
                
                scope.updateInputTime();
                
                function checkValidTime (number) {
                    validity = true;
                    switch (scope.edittime.digits.length) {
                        case 0:
                            if (number === 0) {
                                validity = false;
                            }
                            break;
                        case 1:
                            if (number > 5) {
                                validity = false;
                            } else {
                                validity = true;
                            }
                            break;
                        case 2:
                            validity = true;
                            break;
                        case 3:
                            if (scope.edittime.digits[0] > 1) {
                                validity = false;
                            } else if (scope.edittime.digits[1] > 2) {
                                validity = false;
                            } else if (scope.edittime.digits[2] > 5) {
                                validity = false;
                            }
                            else {
                                validity = true;                                
                            }
                            break;
                        case 4:
                            validity = false;
                            break;
                    }
                    return validity;
                }
                
                function formatTime () {
                    var time = "";
                    if (scope.edittime.digits.length == 1) {
                        time = "--:-" + scope.edittime.digits[0];
                    } else if (scope.edittime.digits.length == 2) {
                        time = "--:" + scope.edittime.digits[0] + scope.edittime.digits[1];
                    } else if (scope.edittime.digits.length == 3) {
                        time = "-" + scope.edittime.digits[0] + ':' + scope.edittime.digits[1] + scope.edittime.digits[2];
                    } else if (scope.edittime.digits.length == 4) {
                        time = scope.edittime.digits[0] + scope.edittime.digits[1].toString() + ':' + scope.edittime.digits[2] + scope.edittime.digits[3];
                        console.log(time);
                    }
                    return time + ' ' + scope.timeframe;
                };
                
                scope.changeInputTime = function (event) {
                    var numbers = {48:0,49:1,50:2,51:3,52:4,53:5,54:6,55:7,56:8,57:9};
                    if (numbers[event.which] !== undefined) {
                        if (checkValidTime(numbers[event.which])) {
                            scope.edittime.digits.push(numbers[event.which]);
                            console.log(scope.edittime.digits);
                            scope.time_input = formatTime();
                            scope.time = numbers[event.which] + ':00';
                            scope.updateDate();
                            scope.setTimeBar();
                        }
                    } else if (event.which == 65) {
                        scope.timeframe = 'am';
                        scope.time_input = scope.time + ' ' + scope.timeframe;
                    } else if (event.which == 80) {
                        scope.timeframe = 'pm';
                        scope.time_input = scope.time + ' ' + scope.timeframe;
                    } else if (event.which == 8) {
                        scope.edittime.digits.pop();
                        scope.time_input = formatTime();
                        console.log(scope.edittime.digits);
                    }
                    scope.edittime.formatted = scope.time_input;
                    // scope.edittime.input = formatted;
                };
                
                var pad2 = function (number) {
                    return (number < 10 ? '0' : '') + number;
                };
           
                scope.moving = false;
                scope.offsetx = 0;
                scope.totaloffset = 0;
                scope.initializeTimepicker = function () {
                    currenttime = $('.current-time');
                    timeline = $('.timeline');
                    if (timeline.length > 0) {
                        timeline_width = timeline[0].offsetWidth;
                    }
                    timeline_container = $('.timeline-container');
                    sectionlength = timeline_width / 24 / 6;
                };

                angular.element($window).on('resize', function () {
                    scope.initializeTimepicker();
                    if (timeline.length > 0) {
                        timeline_width = timeline[0].offsetWidth;
                    }
                    sectionlength = timeline_width / 24;
                    scope.checkWidth(true);
                });
           
                scope.setTimeBar = function (date) {
                    currenttime = $('.current-time');
                    var timeline_width = $('.timeline')[0].offsetWidth;
                    var hours = scope.time.split(':')[0];
                    if (hours == 12) {
                        hours = 0;
                    }
                    var minutes = scope.time.split(':')[1];
                    var minutes_offset = (minutes / 60) * (timeline_width / 12);
                    var hours_offset = (hours / 12) * timeline_width;
                    scope.currentoffset = parseInt(hours_offset + minutes_offset - 1);
                    currenttime.css({
                        transition: 'transform 0.4s ease',
                        transform: 'translateX(' + scope.currentoffset + 'px)',
                    });
                };

                scope.getTime = function () {
                    // get hours
                    var percenttime = (scope.currentoffset + 1) / timeline_width;
                    var hour = Math.floor(percenttime * 12);
                    var percentminutes = (percenttime * 12) - hour;
                    var minutes = Math.round((percentminutes * 60) / 5) * 5;
                    if (hour === 0) {
                        hour = 12;
                    }
                    if (minutes == 60) {
                        hour += 1;
                        minutes = 0;
                    }

                    scope.time = hour + ":" + pad2(minutes);
                    scope.updateInputTime();
                    scope.updateDate();
                };
           
                var initialized = false;

                element.on('touchstart', function() {
                    if (!initialized) {
                        element.find('.timeline-container').on('touchstart', function (event) {
                            scope.timeSelectStart(event);
                        });
                        initialized = true;
                    }
                });

                scope.timeSelectStart = function (event) {
                    scope.initializeTimepicker();
                    var timepicker_container = element.find('.timepicker-container-inner');
                    var timepicker_offset = timepicker_container.offset().left;
                    if (event.type == 'mousedown') {
                        scope.xinitial = event.clientX;
                    } else if (event.type == 'touchstart') {
                        scope.xinitial = event.originalEvent.touches[0].clientX;
                    }
                    scope.moving = true;
                    scope.currentoffset = scope.xinitial - timepicker_container.offset().left;
                    scope.totaloffset = scope.xinitial - timepicker_container.offset().left;
                    console.log(timepicker_container.width());
                    if (scope.currentoffset < 0) {
                        scope.currentoffset = 0;
                    } else if (scope.currentoffset > timepicker_container.width()) {
                        scope.currentoffset = timepicker_container.width();
                    }
                    currenttime.css({
                        transform: 'translateX(' + scope.currentoffset + 'px)',
                        transition: 'none',
                        cursor: 'ew-resize',
                    });
                    scope.getTime();
                };
           
                angular.element($window).on('mousemove touchmove', function (event) {
                    if (scope.moving === true) {
                        event.preventDefault();
                        if (event.type == 'mousemove') {
                            scope.offsetx = event.clientX - scope.xinitial;
                        } else if (event.type == 'touchmove') {
                            scope.offsetx = event.originalEvent.touches[0].clientX - scope.xinitial;
                        }
                        var movex = scope.offsetx + scope.totaloffset;
                        if (movex >= 0 && movex <= timeline_width) {
                            currenttime.css({
                                transform: 'translateX(' + movex + 'px)',
                            });
                            scope.currentoffset = movex;
                        } else if (movex < 0) {
                            currenttime.css({
                                transform: 'translateX(0)',
                            });
                            scope.currentoffset = 0;
                        } else {
                            currenttime.css({
                                transform: 'translateX(' + timeline_width + 'px)',
                            });
                            scope.currentoffset = timeline_width;
                        }
                        scope.getTime();
                        scope.$apply();
                    }
                });
           
                angular.element($window).on('mouseup touchend', function (event) {
                    if (scope.moving) {
                        // var roundsection = Math.round(scope.currentoffset / sectionlength);
                        // var newoffset = roundsection * sectionlength;
                        // currenttime.css({
                        //     transition: 'transform 0.25s ease',
                        //     transform: 'translateX(' + (newoffset - 1) + 'px)',
                        //     cursor: 'pointer',
                        // });
                        // scope.currentoffset = newoffset;
                        // scope.totaloffset = scope.currentoffset;
                        // $timeout(function () {
                        //     scope.getTime();
                        // }, 250);
                    }
                    scope.moving = false;
                });

                scope.adjustTime = function (direction) {
                    event.preventDefault();
                    scope.initializeTimepicker();
                    var newoffset;
                    if (direction == 'decrease') {
                        newoffset = scope.currentoffset - sectionlength;
                    } else if (direction == 'increase') {
                        newoffset = scope.currentoffset + sectionlength;
                    }
                    if (newoffset < 0 || newoffset > timeline_width) {
                        if (newoffset < 0) {
                            newoffset = timeline_width - sectionlength;
                        } else if (newoffset > timeline_width) {
                            newoffset = 0 + sectionlength;
                        }
                        if (scope.timeframe == 'am') {
                            scope.timeframe = 'pm';
                        }
                        else if (scope.timeframe == 'pm') {
                            scope.timeframe = 'am';
                        }
                    }
                    currenttime.css({
                        transition: 'transform 0.4s ease',
                        transform: 'translateX(' + (newoffset - 1) + 'px)',
                    });
                    scope.currentoffset = newoffset;
                    scope.totaloffset = scope.currentoffset;
                    scope.getTime();
                };
            }

            // End Timepicker Code //

        }
    };
});