'use strict';

/* Directives */


angular.module('censusApp.directives', []).
    directive('appVersion', ['version', function (version) {
        return function (scope, elm, attrs) {
            elm.text(version);
        };
    }])
    .directive('censusHeader', function() {
        console.log('creating');
        return {
            restrict: 'C',

            replace: true,

            transclude: true,

            scope: { title:'@headerTitle' },

            template: '<div class="header">' +
                            '<a href="#" class="back button">Back</a>' +
                            '<a href="#" class="home button">Home</a>' +
                            '<h1>{{ title }}</h1>' +
                        '</div>',

            // The linking function will add behavior to the template
            link: function(scope, element, attrs) {

                // Title element
                var title = angular.element(element.children()[0]);

                // Clicking on title should open/close the zippy
                title.bind('click', sayHello);

                function sayHello() {
                    alert('hello');
                }
            }
        }
    });