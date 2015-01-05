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
  })

.controller('DataCtrl', function($scope, $http) {
  $http.get('http://0.0.0.0:8090/articles').then(function(resp) {
    $scope.article = resp.data.articles;
  }, function(err) {
    console.error('ERR', err);
    // err.status will contain the status code
  })
});
