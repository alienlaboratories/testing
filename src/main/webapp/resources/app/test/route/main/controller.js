//
// Angular view module.
//

'use strict';

import angular from 'angular';

import { NX } from 'nx/nx';
import { Test } from '../../util';

export var app_route_main = angular.module('app.route.main', [])

  .controller('MainViewController', ['$scope', function($scope) {
    console.log(`NX: ${NX.version()}`);
    console.log(NX.queryParams());

    var test = new Test();
    test.listen();
    test.fireListeners(100);
    test.listen(false);
    test.fireListeners(200); // Should only be called once.
  }]);
