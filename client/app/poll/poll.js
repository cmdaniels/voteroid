'use strict';

angular.module('voteroidApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/poll/:id', {
        templateUrl: 'app/poll/poll.html',
        controller: 'PollController',
        controllerAs: 'pollCtrl'
      });
  });
