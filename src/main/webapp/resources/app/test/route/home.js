//
// Angular view module.
//

'use strict';

import angular from 'angular';
import 'angular-bootstrap';

var module = angular.module('app.route.home', [
  'app.config',
  'ui.bootstrap'
]);

module
  .config([
    '$urlRouterProvider',
    '$stateProvider',
    'TEMPLATES',
    function($urlRouterProvider, $stateProvider, TEMPLATES) {

      // Default path.
      $urlRouterProvider
        .otherwise('/home/config');

      $stateProvider
        .state('home.config', {
          url: '/config',
          templateUrl: TEMPLATES + '/route/home/config.html',
          controller: 'ConfigController'
        })
        .state('home.profile', {
          url: '/profile',
          templateUrl: TEMPLATES + '/route/home/profile.html',
          controller: 'ProfileController'
        })
        .state('home.users', {
          url: '/users',
          templateUrl: TEMPLATES + '/route/home/users.html',
          controller: 'UsersController'
        });

    }
  ]);

module
  .controller('MainController', [
    '$scope',
    '$state',
    function($scope, $state) {

      $scope.items = [
        { title: 'Config',  route: 'home.config',  active: false },
        { title: 'Profile', route: 'home.profile', active: false },
        { title: 'Users',   route: 'home.users',   active: false }
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

    }
  ]);

//
// Main controllers
//

module
  .controller('ConfigController', [
    '$scope',
    '$state',
    '$http',
    'config',
    function($scope, $state, $http, config) {

      // XMLHttp
      // https://docs.angularjs.org/api/ng/service/$http

      $scope.result = config.result();

      $scope.update = function() {
        config.update().then(function() {
          $scope.result = config.result();
          $scope.$digest();
        });
      };

    }
  ]);

module
  .controller('ProfileController', [
    '$scope',
    '$state',
    '$modal',
    function($scope, $state, $modal) {

      // Modal
      // https://angular-ui.github.io/bootstrap/#/modal

      $scope.reset = function() {
        var modal = $modal.open({
          templateUrl: '/res/app/test/templates/modal/confirm.html',
          controller: 'ConfirmController',
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

    }
  ]);

module
  .controller('UsersController', [
    '$scope',
    '$state',
    '$http',
    function($scope, $state, $http) {

      // TODO(burdon): Get XML list and style as list.

      $scope.result = null;

      $scope.update = function() {
        $http.get('/data').
          then(function(response) {
            $scope.result = response.data;
          });
      };

    }
  ]);

//
// Auxiliary controllers.
//

module
  .controller('ConfirmController', [
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
    }
  ]);
