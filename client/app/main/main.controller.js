'use strict';

(function() {

class MainController {

  constructor($http, $scope, Auth, socket) {
    this.$http = $http;
    this.polls = [];

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
  }
}

angular.module('voteroidApp')
  .controller('MainController', MainController);

})();
