'use strict';

/* Controllers */

function StateListCtrl($scope, $http) {
	console.log('statelistctrl');

    $http({method: 'GET', url: '/app/api/states.json', cache: true}).
	    success(function(data, status, headers, config) {
			$scope.states = data.units;
		    // this callback will be called asynchronously
		    // when the response is available
	    }).

    	error(function(data, status, headers, config) {
			console.log(status);

		    // called asynchronously if an error occurs
		    // or server returns response with status
		    // code outside of the <200, 400) range
    });

	// shortcut method example
	//	$http.get('/someUrl').success(successCallback);
}

// useful for minification (when minified, funciton arguments above
//	are changed preventing dependency injection from working - this is one way to get around it)
StateListCtrl.$inject = ['$scope', '$http'];

function StateCtrl($scope, $http, $routeParams, googleStateMap) {
    console.log('stateCtrl: ' + $routeParams.stateCode);
    $http.get('/app/api/state/' + $routeParams.stateCode + '.json').success(

        function(data, status, headers, config) {

            // set the scope data
            $scope.state = data;

            // draw the map
            googleStateMap($scope.state.name, document.getElementById('map'));
        }
    );
}
StateCtrl.$inject = ['$scope','$http','$routeParams', 'googleStateMap'];


// county controller - gets data and populates county partial
function CountyCtrl($scope, $http, $routeParams) {
    var url = 'state/' + $routeParams.stateCode + '/county/' + $routeParams.countyCode;
    console.log('countyCtrl: ' + url);

    // get the county data
    $http.get('/app/api/' + url + '.json').success(
        function(data, status, headers, config) {

            // set the scope data
            console.log("Setting scope: " + data.name);
            $scope.county = data;
        }
    );
}
CountyCtrl.$inject = ['$scope','$http','$routeParams'];

function CountyListCtrl($scope, $http, $routeParams) {
    $http.get('/app/api/state/' + $routeParams.stateCode + '/counties.json').success(
        function(data, status, headers, config) {
            $scope.counties = data.units;
        }
    );
}
CountyListCtrl.$inject = ['$scope','$http','$routeParams'];

function CityListCtrl($scope, $http, $routeParams) {
    $http.get('/app/api/state/' + $routeParams.stateCode + '/cities.json').success(
        function(data, status, headers, config) {
            $scope.cities = data.units;
        }
    );
}
CityListCtrl.$inject = ['$scope','$http','$routeParams'];

// city controller - gets data and populates city partial
function CityCtrl($scope, $http, $routeParams, googleCityMap) {

    var url = 'state/' + $routeParams.stateCode + '/county/' + $routeParams.countyCode + '/city/' + $routeParams.cityCode;
    console.log('cityCtrl: ' + url);

    // get the city data
    $http.get('/app/api/' + url + '.json').success(
        function(data, status, headers, config) {

            // set the scope data
            $scope.city = data;

            // add the google visualization map (expects div w/ id=map to exist)
            googleCityMap($scope.city.name, $scope.city.stateAbbreviation, document.getElementById('map'))

            // get the tweets about the city
            $http.jsonp('http://search.twitter.com/search.json?q=' + $scope.city.name).success(
                function(data, status, headers, config) {
                    console.log(data);
                }
            );
        }
    );
}
CityCtrl.$inject = ['$scope','$http','$routeParams', 'googleCityMap'];
