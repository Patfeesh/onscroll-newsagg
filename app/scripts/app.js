'use strict';

/**
 * @ngdoc overview
 * @name onscrollNewsaggApp
 * @description
 * # onscrollNewsaggApp
 *
 * Main module of the application.
 */
angular
  .module('onscrollNewsaggApp', [
    'ngAnimate',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
