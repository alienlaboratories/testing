//
// Angular view module.
//

'use strict';

import angular from 'angular';

import { NX } from 'nx/nx';
import { Test } from '../../util';

export var app_route_main = angular.module('app.view.main', [])

  .controller('MainViewController', ['$scope', function($scope) {
    console.log(`NX: ${NX.version()}`);
    console.log(NX.queryParams());
    new Test().listen().fireListeners(100);
  }]);
