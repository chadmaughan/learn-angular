'use strict';

/* Directives */


angular.module('censusApp.directives', []).

    directive('appVersion', ['version', function (version) {
        return function (scope, element, attrs) {
            element.addClass('version');
            element.text(version);
        };
    }])

    .directive('censusHeader', function () {
        console.log('creating');
        return {
            restrict: 'E',

            replace: true,

            transclude: true,

            scope:{ title: '@headerTitle' },

            template:'<div class="header">' +
                '<span class="back button">Back</span>' +
                '<a href="#" class="home button">Home</a>' +
                '<h1>{{ title }}</h1>' +
                '</div>',

            // the linking function adds behavior to the template
            link:function (scope, element, attrs) {

                console.log('link: ' + element);

                // back button
                var back = angular.element(element.children()[0]);
                back.bind('click', function() {
                    window.back();
                });
            }
        }
    });