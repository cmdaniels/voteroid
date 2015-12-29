'use strict';

(function() {

class PollController {

  constructor($http, $scope, $routeParams, Auth, socket) {
    var app = this;
    $scope.isVoting = true;
    app.isEditing = false;

    $scope.labels = [];
    $scope.data = [[]];
    $scope.series = [];

    $http.get('/api/polls/' + $routeParams.id).then(response => {
      app.poll = response.data;
      socket.syncUpdates('poll', [app.poll]);
    });

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('poll');
    });

    app.isOwner = function() {
      if (Auth.getCurrentUser().email === app.poll.createdBy) {
        return true;
      } else {
        return false;
      }
    };

    app.toggleEdit = function() {
      app.isEditing = true;
    };

    app.deleteOption = function(option) {
      var optionsArray = [];
      app.poll.options.forEach(function(pollOption) {
        if (pollOption.answer !== option.answer) {
          optionsArray.push(pollOption);
        }
      });
      $http.put('/api/polls/' + $routeParams.id, optionsArray);
      app.poll.options.splice(app.poll.options.indexOf(option), 1);
    };

    app.addOption = function(newOption) {
      var optionsArray = [];
      app.poll.options.forEach(function(pollOption) {
        optionsArray.push({
          answer: pollOption.answer,
          count: pollOption.count
        });
      });
      optionsArray.push({
        answer: newOption,
        count: 0
      });
      $http.put('/api/polls/' + $routeParams.id, optionsArray);
      app.poll.options.push({
        answer: newOption,
        count: 0
      });
      $scope.newOption = '';
    };

    app.vote = function() {
      if ($scope.choice === undefined) {

      } else {
        $scope.isVoting = false;
        var optionsArray = [];
        app.poll.options.forEach(function(option) {
          if (option.answer === $scope.choice) {
            optionsArray.push({
              answer: option.answer,
              count: (option.count + 1)
            });
            option.count++;
          } else {
            optionsArray.push({
              answer: option.answer,
              count: option.count
            });
          }
        });
        $http.put('/api/polls/' + $routeParams.id, optionsArray).success(function() {
          app.poll.options.forEach(function(option) {
            $scope.labels.push(option.answer);
            $scope.data[0].push(option.count);
          });
        });
      }
    };
  }
}

angular.module('voteroidApp')
  .controller('PollController', PollController);

})();
