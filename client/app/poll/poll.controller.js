'use strict';

(function() {

class PollController {

  constructor($http, $scope, $routeParams, Auth, socket) {
    var app = this;
    $scope.isVoting = true;

    $scope.labels = [];
    $scope.data = [[]];
    $scope.series = [];

    $http.get('/api/polls/' + $routeParams.id).then(response => {
      app.poll = response.data;
      socket.syncUpdates('poll', [app.poll]);
    });

    app.vote = function() {
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
    };
  }
}

angular.module('voteroidApp')
  .controller('PollController', PollController);

})();
