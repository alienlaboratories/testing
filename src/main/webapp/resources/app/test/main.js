//
// Angular main module.
//

'use strict';

import angular from 'angular';
import 'angular-ui-router';

import { app_route_main } from './route/main/controller';

export var module = angular.module('app.main', [
  'ui.router',
  app_route_main.name
])

  .config([ '$urlRouterProvider', '$stateProvider',
    function($urlRouterProvider,   $stateProvider) {

      $urlRouterProvider
        .otherwise('/main');

      $stateProvider
        .state('main', {
          url: '/main',
          templateUrl: '/res/app/test/route/main/template.html',
          controller: 'MainViewController'
        });
    }
  ])

  .run(['$state', function($state) {
    $state.transitionTo('main');
  }]);
