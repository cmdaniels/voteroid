'use strict';

describe('Controller: DashCtrl', function () {

  // load the controller's module
  beforeEach(module('voteroidApp'));

  var DashCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DashCtrl = $controller('DashCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
