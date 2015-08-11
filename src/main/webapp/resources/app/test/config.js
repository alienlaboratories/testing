//
// Angular config module.
//

'use strict';

import angular from 'angular';

// Global configuration.
export var module = angular.module('app.config', []);

module
  .constant('TEMPLATES', '/res/app/test/templates');

module
  .factory('config', [
    '$http',
    function($http) {
      return new ConfigModel($http);
    }
  ]);

/**
 * Config model.
 */
class ConfigModel {

  constructor($http) {
    console.assert($http);
    this.$http = $http;
    this.cache = null;
  }

  update() {
    var self = this;

    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
    return new Promise(function(resolve, reject) {
      console.log('Fetching...');
      self.$http.get('/config').then(function(response) {
        console.log('Status: ' + response.status);
        self.cache = response.data;
        resolve();
      });
    });
  }

  result() {
    return this.cache;
  }
}
