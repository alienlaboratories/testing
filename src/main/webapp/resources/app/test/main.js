//
// Angular main module.
//

'use strict';

import './css/main.css!';

import angular from 'angular';
import 'angular-ui-router';

import './route/main/controller';

var TEMPLATES = '/res/app/test/templates';

export var module = angular.module('app.main', [
  'ui.router',
  'app.route.main'
])

  .config([ '$urlRouterProvider', '$stateProvider',
    function($urlRouterProvider,   $stateProvider) {

      // Default path.
      $urlRouterProvider
        .otherwise('/main/config');

      // http://odetocode.com/blogs/scott/archive/2014/04/14/deep-linking-a-tabbed-ui-with-angularjs.aspx
      $stateProvider
        .state('main', {
          url: '/main',
          templateUrl: TEMPLATES + '/route/main/index.html',
          controller: 'MainViewController'
        })
          .state('main.config',   { url: '/config',   templateUrl: TEMPLATES + '/route/main/config.html'   })
          .state('main.profile',  { url: '/profile',  templateUrl: TEMPLATES + '/route/main/profile.html'  })
          .state('main.users',    { url: '/users',    templateUrl: TEMPLATES + '/route/main/users.html'    });
    }
  ])

  .run(['$state', function($state) {
    $state.transitionTo('main');
  }]);
