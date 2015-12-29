'use strict';

angular.module('voteroidApp', [
  'voteroidApp.auth',
  'voteroidApp.admin',
  'voteroidApp.constants',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'btford.socket-io',
  'ui.bootstrap',
  'validation.match',
  'chart.js',
  'td.easySocialShare'
])
  .config(function($routeProvider, $locationProvider) {
    $routeProvider
      .otherwise({
        redirectTo: '/'
      });

    $locationProvider.html5Mode(true);
  });
