'use strict';

/**
 * @ngdoc function
 * @name onscrollNewsaggApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the onscrollNewsaggApp
 */
angular.module('onscrollNewsaggApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });

function DataController($scope, $http) {
  $scope.items = []

  $scope.getItems = function() {
    $http({method : 'GET',url : 'http://localhost:9000/articles'})
      .success(function(data, status) {
        $scope.items = data;
      })
  }
}
