//
// Angular view module.
//

'use strict';

import angular from 'angular';
import 'angular-bootstrap';

var module = angular.module('app.panel', [
  'app.config',
  'ui.bootstrap'
]);

//
// Panel controllers
//

module
  .controller('ConfigController', [
    '$scope',
    '$state',
    '$http',
    'app.config',
    function($scope, $state, $http, app_config) {

      // XMLHttp
      // https://docs.angularjs.org/api/ng/service/$http

      $scope.result = app_config.result();

      $scope.update = function() {
        app_config.update().then(function() {
          $scope.result = app_config.result();
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
    'TEMPLATES',
    function($scope, $state, $modal, TEMPLATES) {

      // Modal
      // https://angular-ui.github.io/bootstrap/#/modal

      $scope.reset = function() {
        var modal = $modal.open({
          templateUrl: TEMPLATES + 'modal/confirm.html',
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
    'app.users',
    function($scope, $state, $http, app_users) {

      $scope.result = app_users.result();

      $scope.update = function() {
        app_users.update().then(function() {
          $scope.result = app_users.result();
          $scope.$digest();
        });
      };

    }
  ]);

//
// Directives.
// https://docs.angularjs.org/guide/directive
//

module
  .directive('userList', [
    'TEMPLATES',
    function(TEMPLATES) {
      return {
        restrict: 'E',
        templateUrl: TEMPLATES + 'directive/user_list.html'
      }
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
