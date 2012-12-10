'use strict';

/* Services */

// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('censusApp.services', [], function ($provide) {

    // example notify service
    $provide.factory('notify', ['$window', function (win) {
        return function (msg) {
            win.alert(msg);
        };
    }]);

    $provide.factory('googleCityMap', function () {
        return function (cityName, cityAbbreviation, mapElement) {

            // add the google visualization map (expects div w/ id=map to exist)
            var data = google.visualization.arrayToDataTable([['City'],[cityName]]);
            var map = new google.visualization.GeoChart(mapElement);

            var options = {
                region: 'US-' + cityAbbreviation,
                resolution: 'provinces',
                displayMode: 'markers',
                legend: 'none'
            };

            map.draw(data, options);
        };
    });

    $provide.factory('googleStateMap', function () {
        return function (stateName, mapElement) {

            // add the google visualization map (expects div w/ id=map to exist)
            var data = google.visualization.arrayToDataTable([['Country'],[stateName]]);
            var map = new google.visualization.GeoChart(mapElement);

            // google visualization configuration
            var options = {};
            options['region'] = 'US';
            options['dataMode'] = 'regions';
            options['resolution'] = 'provinces';
            options['legend'] = 'none';
            options['backgroundColor'] = '#F3F3F3';

            map.draw(data, options);
        };
    });

    $provide.factory('twitter', ['$http', function(http) {
        return function(term) {
            // get the tweets about the city
            http.jsonp('http://search.twitter.com/search.json?q=' + term).success(
                function(data, status, headers, config) {
                    console.log(data);
                }
            );
        };
    }]);
}).
value('version', '0.1');
