//
// Angular main module.
//

'use strict';

import angular from 'angular';
import 'angular-ui-router';

import './css/main.css!';

import './config';
import './route/home';

// Main module (exported to bootstrap).
export var module = angular.module('app.main', [
  'ui.router',
  'app.config',
  'app.route.home'
]);

module
  .config([
    '$urlRouterProvider',
    '$stateProvider',
    'TEMPLATES',
    function($urlRouterProvider, $stateProvider, TEMPLATES) {

      // https://github.com/angular-ui/ui-router/wiki
      // http://odetocode.com/blogs/scott/archive/2014/04/14/deep-linking-a-tabbed-ui-with-angularjs.aspx
      $stateProvider
        .state('home', {
          url: '/home',
          templateUrl: TEMPLATES + '/route/home/index.html',
          controller: 'MainController'
        });
    }
  ]);

module
  .run([
    '$state',
    function($state) {
      $state.transitionTo('home');
    }
  ]);
