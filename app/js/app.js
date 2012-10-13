'use strict';

// Declare app level module which depends on filters, and services
angular.module('censusApp', ['censusApp.filters', 'censusApp.services', 'censusApp.directives']).
    config(['$routeProvider', function ($routeProvider) {

        // states list
        $routeProvider.when('/states', {templateUrl:'partials/state-list.html', controller:StateListCtrl});
        $routeProvider.otherwise({redirectTo:'/states'});

        // state views
        $routeProvider.when('/state/:stateCode', {templateUrl:'partials/state-details.html', controller:StateCtrl});
        $routeProvider.when('/state/:stateCode/list/counties', {templateUrl:'partials/county-list.html', controller:CountyListCtrl});
        $routeProvider.when('/state/:stateCode/list/cities', {templateUrl:'partials/city-list.html', controller:CityListCtrl});

        // county views
        $routeProvider.when('/state/:stateCode/county/:countyCode', {templateUrl:'partials/county-details.html', controller:CountyCtrl});
        $routeProvider.when('/state/:stateCode/county/:countyCode/list/cities', {templateUrl:'partials/city-list.html', controller:CityListCtrl});

        // city views
        $routeProvider.when('/state/:stateCode/county/:countyCode/city/:cityCode', {templateUrl:'partials/city-details.html', controller:CityCtrl});

        // census view
        $routeProvider.when('/state/:stateCode/section/censuses', {templateUrl:'partials/censuses.html', controller:CensusCtrl});

}]);
