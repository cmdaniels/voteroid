'use strict';

(function() {

class MainController {

  constructor($http, $scope, Auth, socket) {
    this.$http = $http;
    this.polls = [];

    $scope.inputs = [{}, {}];

    $scope.getCurrentUser = Auth.getCurrentUser;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;

    $http.get('/api/polls').then(response => {
      this.polls = response.data;
      socket.syncUpdates('poll', this.polls);
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
          optionsArray.push({answer: input.value, count: 0})
        });
        $http.post('/api/polls', {
          name: $scope.newPollName,
          options: optionsArray,
          createdAt: new Date().getTime(),
          createdBy: $scope.getCurrentUser().email
        });
        $scope.newPollName = '';
        $scope.inputs = [{}, {}];
      } else {
        alert('Invalid! Make sure all fields are filled out.');
      }
    }
  }

  deletePoll(poll) {
    this.$http.delete('/api/polls/' + poll._id);
  }
}

angular.module('voteroidApp')
  .controller('MainController', MainController);

})();
