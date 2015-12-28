'use strict';

(function() {

class PollController {

  constructor($http, $scope, $routeParams, Auth, socket) {
    $http.get('/api/polls/').then(response => {
      response.data.forEach(function(poll) {
        if(poll._id === $routeParams.id) {
          $scope.selectedPoll = poll;
        }
      });
      socket.syncUpdates('poll', $scope.selectedPoll);
    });
  }

}

angular.module('voteroidApp')
  .controller('PollController', PollController);

})();
