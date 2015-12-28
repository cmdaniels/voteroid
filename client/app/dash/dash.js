'use strict';

angular.module('voteroidApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/dash', {
        templateUrl: 'app/dash/dash.html',
        controller: 'DashController',
        controllerAs: 'dash',
        authenticate: true
      });
  });
