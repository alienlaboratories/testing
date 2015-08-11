//
// Angular view module.
//

'use strict';

import angular from 'angular';
import 'angular-bootstrap';

import { Test } from '../../util';

var module = angular.module('app.route.main', [
  'ui.bootstrap'
]);

module.controller('MainViewController', [
  '$rootScope',
  '$scope',
  '$state',
  '$http',
  '$modal',
  function($rootScope, $scope, $state, $http, $modal) {

    $scope.items = [
      { title: 'Config',  route: 'main.config',  active: false },
      { title: 'Profile', route: 'main.profile', active: false },
      { title: 'Users',   route: 'main.users',   active: false }
    ];

    $scope.getClass = function(item) {
      return item.active ? 'active' : '';
    };

    $scope.getPath = function(item) {
      return '#' + item.route.replace('\.', '/');
    };

    $scope.go = function(route) {
      $state.go(route);
    };

    $scope.active = function(route) {
      return $state.is(route);
    };

    $scope.$on("$stateChangeSuccess", function() {
      $scope.items.forEach(function(item) {
        item.active = $scope.active(item.route);
      });
    });

    // Modal
    // https://angular-ui.github.io/bootstrap/#/modal

    $scope.confirm = function() {
      var modal = $modal.open({
        templateUrl: '/res/app/test/templates/modal/confirm.html',
        controller: 'ConfirmModalCtrl',
        resolve: {
          message: function() { return 'Are you sure?'; }
        }
      });

      modal.result.then(function(state) {
        console.log('Stated: ' + state);
        $scope.state = state;
      }, function() {
        console.info('Modal dismissed at: ' + new Date());
      });
    };

    // XMLHttp
    // https://docs.angularjs.org/api/ng/service/$http
    // TODO(burdon): Separate controllers for substates (different modules and link from main).

    $scope.result = null;

    $scope.update = function() {
      $http.get('/data').
        then(function(response) {
          $scope.result = response.data;
        });
    };

  }]);

module.controller('ConfirmModalCtrl', [
  '$scope',
  '$modalInstance',
  'message',
  function($scope, $modalInstance, message) {

    $scope.message = message;

    $scope.ok = function () {
      $modalInstance.close(true);
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  }]);
