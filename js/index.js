// Bootstrap app with top-level controller
app.controller('PlacesSearchController', ['$window', PlacesSearchController]);

function PlacesSearchController($window) {
  this.city = "San Francisco";
  this.searchTerms = "";
  this.searchResult = {};
  this.go = function() {
    if (this.searchTerms) {
      $window.alert("Do something with the search result!");
    }
  };
}

angular.module('angularSearchPlaces', [])


/***** Search Places Input Directive *****
 *
 * A directive that when added to an input field, searches a city
 *
 * Depedencies: $compile, $timeout, $templateRequest
 *
 * Suggested usage:
 * <input type="text"
    ej-search-places-input
    search-results-limit="15"
    complete-result="searchResult"
    placeholder="e.g., Mission Dolores Park, Chinese food, etc..."
    ng-model="searchTerms"
    city="LOS_ANGELES" />
 *
 * The directive is restricted to being an attribute only, so only add
 * "ej-search-places-input" to an <input>, as above.
 *
 * Attributes:
 * - search-results-limit: optional, takes a number representing how many search
 *   results you want displayed below the input box. Defaults to 8.
 * - complete-result: optional, takes a scope variable that should be defined in
 *   your controller as an empty object. Once a search result is clicked on from
 *   the list, it will be populated with the complete result object from the
 *   Google Places API. This allows you to use more than just the name of the
 *   place (represented by the search terms)
 * - ng-model: required, as this is used to do the actual search
 * - city: optional, defaults to San Francisco. See below for how to add cities.
 * - placeholder: optional, but a nice touch
 *
 * Additional Info:
 * The "Powered by Google" icon that shows up at the bottom of the search
 * results is required by Google in exchange for the use of their PlacesSearch
 * API.
 *
 */

.directive('ejSearchPlacesInput', ['$compile', '$timeout', '$templateRequest',
            function($compile, $timeout, $templateRequest) {
/**
 *  In order to generate Nearby Search results, a location must be specified.
 *  (https://developers.google.com/maps/documentation/javascript/places#place_search_requests)
 *  The more accurate way to do it for a city is to specify location using
 *  LatLngBounds, which is made up of a two LatLng objects at the southwest and
 *  northeast corners.
 */
  // Manually find and set the latitude/longitude coordinates that best bound
  // the city (in this case, San Francisco)
  var SF_NE  = new google.maps.LatLng(-29.5221033, 31.1602553);
  var  SF_SW= new google.maps.LatLng(-30.0881708, 30.5262753);
  // Create the LatLngBounds object
  var SAN_FRANCISCO = new google.maps.LatLngBounds(SF_SW, SF_NE);

  function link($scope, $el, $attrs, ngModelCtrl) {

    $scope.queryInProgress = false;

    // Set the limit on search results to a reasonable number by default
    var resultsLimit = $scope.$eval($attrs.searchResultsLimit) || 8;

    // Set a debounce on updating the model so we're not sending tons of requests
    ngModelCtrl.$options = {
      debounce : 500
    };
    ngModelCtrl.$options.updateOnDefault = true;

    // Create an empty results array that can be populated with results
    $scope.results = [];

    // Grab the search results template and place it into the DOM
    var templatePath = 'search-results.html';
    $templateRequest(templatePath).then(function(content) {
      var $results = $compile(content)($scope);
      $el.after($results);
    });

    // For whatever reason, the PlacesService expects a div or a Map object. We
    // can't pass the div that displays our results because it gets removed from
    // the DOM. Thus, we feed it an empty div.
    var placesDiv = angular.element('<div id="empty" style="display: none;"></div>');
    $el.after(placesDiv);
    var places;
    // Call within a timeout to be safe and make sure that the PlacesService is
    // instantiated properly.
    $timeout(function() {
      var emptyDiv = document.getElementById('empty');
      places = new google.maps.places.PlacesService(emptyDiv);
    });

    // We want to watch the model for changes and query the PlacesService
    $scope.$watch("ngModel", function(newVal) {
      // Don't do any searching if there's no search terms
      if (!newVal) { return; }
      if (!$scope.city) {
        $scope.city = SAN_FRANCISCO;
      }
      // Only submit another query if there isn't one in progress already,
      // otherwise, this may lead to strange results showing up for the user due
      // to the asynchronicity of the requests
      if (!$scope.queryInProgress) {
        searchPlaces($scope.city, newVal);
      }
    });

    /**
     * Perform a Nearby Search for a particular location using the Google Maps
     * API PlacesService
     * @param  {LatLngBounds Obj} location    The location you want to search
     * @param  {String} searchTerms           What you're searching for
     */
    function searchPlaces(location, searchTerms) {
      // Build the request. In this case we are using LatLngBounds ("bounds").
      var request = {
        bounds: location,
        keyword: searchTerms
      };
      // Do The Thing (i.e., a nearby search)
      places.nearbySearch(request, buildResults);
      // Set the query to be in progress
      $scope.queryInProgress = true;
    }

    /**
     * Build the list of results from the PlacesService searching
     * @param  {Object} results The results from the PlacesSearch API query
     * @param  {Enum} status  An enumeration representing various statuses of
     *                        the PlacesSearch query
     */
    function buildResults(results, status) {
      // Once the results come in, the query is no longer in progress
      $scope.queryInProgress = false;
      // If the search returns results successfully with no errors
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        // Remove results after the specified limit
        if (resultsLimit < results.length) {
          results = results.slice(0, resultsLimit);
        }
        // Bind the results to the scope, you mope!
        $scope.results = results;
      }
      // If the search doesn't return results
      else if (status === google.maps.places.PlacesServiceStatus.ZERO_RESULTS) {
        $scope.results = [{name: 'No results. Try different search terms?'}];
      }
      $scope.$apply();
    }

    /**
     * Select the desired result from the list to populate the search box and
     * the complete search result object in the parent scope
     * @param  {Number} resultIndex The index of the result clicked on
     */
    $scope.selectResult = function(resultIndex) {
      $scope.ngModel = $scope.results[resultIndex].name;
      $scope.completeResult = $scope.results[resultIndex];
    };

  } // end link function

  return {
    restrict: 'A',
    require: 'ngModel',
    scope: {
      ngModel: '=',
      completeResult: '=?',
      city: '=?'
    },
    link: link
  };
}])

// A filter that highlights the search terms found in the results (ripped from
// angular-ui-bootstrap typeahead)
.filter('highlightSearchTerms', function() {

  function escapeRegexp(queryToEscape) {
    return queryToEscape.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1');
  }

  return function(matchItem, searchTerms) {
    return searchTerms ? ('' + matchItem).replace(new RegExp(escapeRegexp(searchTerms), 'gi'), '<strong>$&</strong>') : matchItem;
  };
});

angular.module('app', ["ngTouch", "angucomplete"]);

app.directive('angucomplete', function ($parse, $http, $sce, $timeout) {
  return {
      restrict: 'EA',
      scope: {
          "id": "@id",
          "placeholder": "@placeholder",
          "selectedObject": "=selectedobject",
          "url": "@url",
          "dataField": "@datafield",
          "titleField": "@titlefield",
          "descriptionField": "@descriptionfield",
          "imageField": "@imagefield",
          "imageUri": "@imageuri",
          "inputClass": "@inputclass",
          "userPause": "@pause",
          "localData": "=localdata",
          "searchFields": "@searchfields",
          "minLengthUser": "@minlength",
          "matchClass": "@matchclass"
      },
      template: '<div class="angucomplete-holder"><input id="{{id}}_value" ng-model="searchStr" type="text" placeholder="{{placeholder}}" class="{{inputClass}}" onmouseup="this.select();" ng-focus="resetHideResults()" ng-blur="hideResults()" /><div id="{{id}}_dropdown" class="angucomplete-dropdown" ng-if="showDropdown"><div class="angucomplete-searching" ng-show="searching">Searching...</div><div class="angucomplete-searching" ng-show="!searching && (!results || results.length == 0)">No results found</div><div class="angucomplete-row" ng-repeat="result in results" ng-mousedown="selectResult(result)" ng-mouseover="hoverRow()" ng-class="{\'angucomplete-selected-row\': $index == currentIndex}"><div ng-if="imageField" class="angucomplete-image-holder"><img ng-if="result.image && result.image != \'\'" ng-src="{{result.image}}" class="angucomplete-image"/><div ng-if="!result.image && result.image != \'\'" class="angucomplete-image-default"></div></div><div class="angucomplete-title" ng-if="matchClass" ng-bind-html="result.title"></div><div class="angucomplete-title" ng-if="!matchClass">{{ result.title }}</div><div ng-if="result.description && result.description != \'\'" class="angucomplete-description">{{result.description}}</div></div></div></div>',

      link: function($scope, elem, attrs) {
          $scope.lastSearchTerm = null;
          $scope.currentIndex = null;
          $scope.justChanged = false;
          $scope.searchTimer = null;
          $scope.hideTimer = null;
          $scope.searching = false;
          $scope.pause = 500;
          $scope.minLength = 3;
          $scope.searchStr = null;

          if ($scope.minLengthUser && $scope.minLengthUser != "") {
              $scope.minLength = $scope.minLengthUser;
          }

          if ($scope.userPause) {
              $scope.pause = $scope.userPause;
          }

          isNewSearchNeeded = function(newTerm, oldTerm) {
              return newTerm.length >= $scope.minLength && newTerm != oldTerm
          }

          $scope.processResults = function(responseData, str) {
              if (responseData && responseData.length > 0) {
                  $scope.results = [];

                  var titleFields = [];
                  if ($scope.titleField && $scope.titleField != "") {
                      titleFields = $scope.titleField.split(",");
                  }

                  for (var i = 0; i < responseData.length; i++) {
                      // Get title variables
                      var titleCode = [];

                      for (var t = 0; t < titleFields.length; t++) {
                          titleCode.push(responseData[i][titleFields[t]]);
                      }

                      var description = "";
                      if ($scope.descriptionField) {
                          description = responseData[i][$scope.descriptionField];
                      }

                      var imageUri = "";
                      if ($scope.imageUri) {
                          imageUri = $scope.imageUri;
                      }

                      var image = "";
                      if ($scope.imageField) {
                          image = imageUri + responseData[i][$scope.imageField];
                      }

                      var text = titleCode.join(' ');
                      if ($scope.matchClass) {
                          var re = new RegExp(str, 'i');
                          var strPart = text.match(re)[0];
                          text = $sce.trustAsHtml(text.replace(re, '<span class="'+ $scope.matchClass +'">'+ strPart +'</span>'));
                      }

                      var resultRow = {
                          title: text,
                          description: description,
                          image: image,
                          originalObject: responseData[i]
                      }

                      $scope.results[$scope.results.length] = resultRow;
                  }


              } else {
                  $scope.results = [];
              }
          }

          $scope.searchTimerComplete = function(str) {
              // Begin the search

              if (str.length >= $scope.minLength) {
                  if ($scope.localData) {
                      var searchFields = $scope.searchFields.split(",");

                      var matches = [];

                      for (var i = 0; i < $scope.localData.length; i++) {
                          var match = false;

                          for (var s = 0; s < searchFields.length; s++) {
                              match = match || (typeof $scope.localData[i][searchFields[s]] === 'string' && typeof str === 'string' && $scope.localData[i][searchFields[s]].toLowerCase().indexOf(str.toLowerCase()) >= 0);
                          }

                          if (match) {
                              matches[matches.length] = $scope.localData[i];
                          }
                      }

                      $scope.searching = false;
                      $scope.processResults(matches, str);

                  } else {
                      $http.get($scope.url + str, {}).
                          success(function(responseData, status, headers, config) {
                              $scope.searching = false;
                              $scope.processResults((($scope.dataField) ? responseData[$scope.dataField] : responseData ), str);
                          }).
                          error(function(data, status, headers, config) {
                              console.log("error");
                          });
                  }
              }
          }

          $scope.hideResults = function() {
              $scope.hideTimer = $timeout(function() {
                  $scope.showDropdown = false;
              }, $scope.pause);
          };

          $scope.resetHideResults = function() {
              if($scope.hideTimer) {
                  $timeout.cancel($scope.hideTimer);
              };
          };

          $scope.hoverRow = function(index) {
              $scope.currentIndex = index;
          }

          $scope.keyPressed = function(event) {
              if (!(event.which == 38 || event.which == 40 || event.which == 13)) {
                  if (!$scope.searchStr || $scope.searchStr == "") {
                      $scope.showDropdown = false;
                      $scope.lastSearchTerm = null
                  } else if (isNewSearchNeeded($scope.searchStr, $scope.lastSearchTerm)) {
                      $scope.lastSearchTerm = $scope.searchStr
                      $scope.showDropdown = true;
                      $scope.currentIndex = -1;
                      $scope.results = [];

                      if ($scope.searchTimer) {
                          $timeout.cancel($scope.searchTimer);
                      }

                      $scope.searching = true;

                      $scope.searchTimer = $timeout(function() {
                          $scope.searchTimerComplete($scope.searchStr);
                      }, $scope.pause);
                  }
              } else {
                  event.preventDefault();
              }
          }

          $scope.selectResult = function(result) {
              if ($scope.matchClass) {
                  result.title = result.title.toString().replace(/(<([^>]+)>)/ig, '');
              }
              $scope.searchStr = $scope.lastSearchTerm = result.title;
              $scope.selectedObject = result;
              $scope.showDropdown = false;
              $scope.results = [];
              //$scope.$apply();
          }

          var inputField = elem.find('input');

          inputField.on('keyup', $scope.keyPressed);

          elem.on("keyup", function (event) {
              if(event.which === 40) {
                  if ($scope.results && ($scope.currentIndex + 1) < $scope.results.length) {
                      $scope.currentIndex ++;
                      $scope.$apply();
                      event.preventDefault;
                      event.stopPropagation();
                  }

                  $scope.$apply();
              } else if(event.which == 38) {
                  if ($scope.currentIndex >= 1) {
                      $scope.currentIndex --;
                      $scope.$apply();
                      event.preventDefault;
                      event.stopPropagation();
                  }

              } else if (event.which == 13) {
                  if ($scope.results && $scope.currentIndex >= 0 && $scope.currentIndex < $scope.results.length) {
                      $scope.selectResult($scope.results[$scope.currentIndex]);
                      $scope.$apply();
                      event.preventDefault;
                      event.stopPropagation();
                  } else {
                      $scope.results = [];
                      $scope.$apply();
                      event.preventDefault;
                      event.stopPropagation();
                  }

              } else if (event.which == 27) {
                  $scope.results = [];
                  $scope.showDropdown = false;
                  $scope.$apply();
              } else if (event.which == 8) {
                  $scope.selectedObject = null;
                  $scope.$apply();
              }
          });

      }
  };
});

