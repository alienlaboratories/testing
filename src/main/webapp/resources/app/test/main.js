//
// Angular main module.
//

'use strict';

import './css/main.css!';

import angular from 'angular';
import 'angular-ui-router';
import 'angular-bootstrap';

import { app_route_main } from './route/main/controller';

var ROOT = '/res/app/test';

export var module = angular.module('app.main', [
  'ui.router',
  'ui.bootstrap',
  app_route_main.name
])

  .config([ '$urlRouterProvider', '$stateProvider',
    function($urlRouterProvider,   $stateProvider) {

      $urlRouterProvider
        .otherwise('/main');

      $stateProvider
        .state('main', {
          url: '/main',
          templateUrl: ROOT + '/route/main/template.html',
          controller: 'MainViewController'
        });
    }
  ])

  .run(['$state', function($state) {
    $state.transitionTo('main');
  }]);
