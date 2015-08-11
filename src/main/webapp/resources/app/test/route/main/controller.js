//
// Angular view module.
//

'use strict';

import angular from 'angular';
import 'angular-bootstrap';

import { Test } from '../../util';

export var app_route_main = angular.module('app.route.main', [
  'ui.bootstrap'
])

  .controller('MainViewController', ['$rootScope', '$scope', '$state', function($rootScope, $scope, $state) {

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

    // TODO(burdon): remove.
    var test = new Test();
    test.listen();
    test.fireListeners(100);
    test.listen(false);
    test.fireListeners(200); // Should only be called once.
  }]);
