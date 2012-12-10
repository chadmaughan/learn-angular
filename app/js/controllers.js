'use strict';

/* Controllers */

function StateListCtrl($scope, $http) {
	console.log('statelistctrl');

    $http({method: 'GET', url: '/api/states', cache: true}).
	    success(function(data, status, headers, config) {
			$scope.states = data;
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

// useful for minification (when mini-fied, function arguments above
//	are changed preventing dependency injection from working - this is one way to get around it)
StateListCtrl.$inject = ['$scope', '$http'];

function StateCtrl($scope, $http, $routeParams, googleStateMap) {
    console.log('stateCtrl: ' + $routeParams.stateCode);
    $http.get('/api/state/' + $routeParams.stateCode).success(

        function(data, status, headers, config) {

            // set the scope data
            $scope.state = data;

            // create the images
            $scope.state.imageFlag = "images/flags/" + $scope.state.code + ".png";
            $scope.state.imageSeal = "images/seals/" + $scope.state.code + ".png";

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
    $http.get('/api/' + url).success(
        function(data, status, headers, config) {

            // set the scope data
            console.log("Setting scope: " + data.name);
            $scope.county = data;
        }
    );
}
CountyCtrl.$inject = ['$scope','$http','$routeParams'];

function CountyListCtrl($scope, $http, $routeParams) {
    $http.get('/api/state/' + $routeParams.stateCode + '/counties').success(
        function(data, status, headers, config) {
            $scope.counties = data;
        }
    );
}
CountyListCtrl.$inject = ['$scope','$http','$routeParams'];

function CityListCtrl($scope, $http, $routeParams) {
    $http.get('/api/state/' + $routeParams.stateCode + '/cities').success(
        function(data, status, headers, config) {
            $scope.cities = data;
        }
    );
}
CityListCtrl.$inject = ['$scope','$http','$routeParams'];

// city controller - gets data and populates city partial
function CityCtrl($scope, $http, $routeParams, googleCityMap, twitter) {

    var url = 'state/' + $routeParams.stateCode + '/county/' + $routeParams.countyCode + '/city/' + $routeParams.cityCode;
    console.log('cityCtrl: ' + url);

    // get the city data
    $http.get('/api/' + url).success(
        function(data, status, headers, config) {

            // set the scope data
            console.log(data);

            $scope.city = data;

            // add the google visualization map (expects div w/ id=map to exist)
            googleCityMap($scope.city.name, $scope.city.state_abbreviation, document.getElementById('map'))

            twitter($scope.city.name);
        }
    );
}
CityCtrl.$inject = ['$scope','$http','$routeParams', 'googleCityMap'];

function CensusCtrl($scope, $http, $routeParams) {
    $http.get('/api/state/' + $routeParams.stateCode + '/censuses').success(
        function(data, status, headers, config) {
            console.log(data);
            $scope.censuses = data;
        }
    );
}
CensusCtrl.$inject = ['$scope','$http','$routeParams'];
