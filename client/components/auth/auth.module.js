'use strict';

angular.module('voteroidApp.auth', [
  'voteroidApp.constants',
  'voteroidApp.util',
  'ngCookies',
  'ngRoute'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
