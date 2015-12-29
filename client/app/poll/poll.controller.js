'use strict';

(function() {

class PollController {

  constructor($http, $scope, $routeParams, Auth, socket) {
    var app = this;
    $scope.isVoting = true;

    $http.get('/api/polls/' + $routeParams.id).then(response => {
      app.poll = response.data;
      socket.syncUpdates('poll', [app.poll]);
    });

    app.vote = function() {
      $scope.isVoting = false;
      var optionsArray = [];
      // '[{"answer":"Coke","count":1},{"answer":"Pepsi","count":0}]'
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
      console.log(optionsArray);
      $http.put('/api/polls/' + $routeParams.id, optionsArray).success(function() {
        $http.get('/api/polls/' + $routeParams.id).then(response => {
          console.log(response.data);
        });
      });
    };
  }
}

angular.module('voteroidApp')
  .controller('PollController', PollController);

})();
