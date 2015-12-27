'use strict';

(function() {

class AdminController {
  constructor(User, $http, $scope, socket) {
    this.$http = $http;
    this.polls = [];

    $http.get('/api/polls').then(response => {
      this.polls = response.data;
      socket.syncUpdates('poll', this.polls);
    });

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('poll');
    });

    // Use the User $resource to fetch all users
    this.users = User.query();
  }

  deleteUser(user) {
    user.$remove();
    this.users.splice(this.users.indexOf(user), 1);
  }

  deletePoll(poll) {
    this.$http.delete('/api/polls/' + poll._id);
  }
}

angular.module('voteroidApp.admin')
  .controller('AdminController', AdminController);

})();
