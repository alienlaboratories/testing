//
// Angular main module.
//

'use strict';

import angular from 'angular';
import 'angular-ui-router';

import './css/main.css!';

import './config';
import './panel';

// Main module (exported to bootstrap).
export var module = angular.module('app.main', [
  'ui.router',
  'app.config',
  'app.panel'
]);

module
  .config([
    '$urlRouterProvider',
    '$stateProvider',
    'TEMPLATES',
    function($urlRouterProvider, $stateProvider, TEMPLATES) {

      // https://github.com/angular-ui/ui-router/wiki
      // Contains <ui-view/> for child views.
      $stateProvider
        .state('main', {
          url: '/',
          templateUrl: TEMPLATES + 'state/main.html',
          controller: 'MainController'
        });

      // https://github.com/angular-ui/ui-router/wiki/Nested-States-and-Nested-Views
      $stateProvider
        .state('main.config', {
          url: '^/config',
          templateUrl: TEMPLATES + 'state/config.html',
          controller: 'ConfigController'
        })
        .state('main.profile', {
          url: '^/profile',
          templateUrl: TEMPLATES + 'state/profile.html',
          controller: 'ProfileController'
        })
        .state('main.users', {
          url: '^/users',
          templateUrl: TEMPLATES + 'state/users.html',
          controller: 'UsersController'
        });

      // Default route.
      $urlRouterProvider
        .otherwise('/config');

    }
  ]);

module
  .controller('MainController', [
    '$scope',
    '$state',
    function($scope, $state) {

      $scope.items = [
        { title: 'Config',  route: 'main.config',  active: false },
        { title: 'Profile', route: 'main.profile', active: false },
        { title: 'Users',   route: 'main.users',   active: false }
      ];

      $scope.getClass = function(item) {
        return item.active ? 'active' : '';
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

    }
  ]);

module
  .run([
    '$state',
    function($state) {
      $state.transitionTo('main');
    }
  ]);
