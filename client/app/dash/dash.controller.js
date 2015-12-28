'use strict';

(function() {

class DashController {

  constructor($scope, $http, socket, Auth) {
    this.$http = $http;

    $scope.polls = [];

    $scope.getCurrentUser = Auth.getCurrentUser;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;

    $scope.inputs = [{}, {}];
    $scope.errorMessage = '';
    $scope.successMessage = '';

    $http.get('/api/polls').then(response => {
      response.data.forEach(function(poll) {
        if (poll.createdBy === $scope.getCurrentUser().email) {
          $scope.polls.push(poll);
        }
      });
      socket.syncUpdates('poll', $scope.polls);
    });

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('poll');
    });

    $scope.addPoll = function() {
      var valid = true;
      $scope.inputs.forEach(function(input) {
        if (input.value === undefined) {
          valid = false;
        }
      });
      if ($scope.inputs.length >= 2 && $scope.newPollName && valid) {
        var optionsArray = [];
        $scope.inputs.forEach(function(input) {
          optionsArray.push({answer: input.value, count: 0});
        });
        $http.post('/api/polls', {
          name: $scope.newPollName,
          options: optionsArray,
          createdAt: new Date().getTime(),
          createdBy: $scope.getCurrentUser().email
        });
        $scope.newPollName = '';
        $scope.inputs = [{}, {}];
        $scope.errorMessage = '';
        $scope.successMessage = 'Your poll was created successfully! You can find it below.';
      } else {
        $scope.successMessage = '';
        $scope.errorMessage = 'Make sure all fields are filled out and there are at least two options.';
      }
    };
  }

  deletePoll(poll) {
    this.$http.delete('/api/polls/' + poll._id);
  }
}

angular.module('voteroidApp')
  .controller('DashController', DashController);

})();
