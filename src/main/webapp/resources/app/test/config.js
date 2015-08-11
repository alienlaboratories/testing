//
// Angular config module.
//

'use strict';

import angular from 'angular';

// Global configuration.
var module = angular.module('app.config', []);

// https://docs.angularjs.org/guide/providers
module
  .constant('TEMPLATES', '/res/app/test/templates');

// https://docs.angularjs.org/guide/services#creating-services
module
  .factory('app.config', [
    '$http',
    function($http) {
      return new CachingRequestModel($http, '/data/config');
    }
  ]);

module
  .factory('app.users', [
    '$http',
    function($http) {
      return new CachingRequestModel($http, '/data/users');
    }
  ]);

/**
 * Config model.
 */
class CachingRequestModel {

  constructor($http, path) {
    console.assert($http);
    this.$http = $http;
    this.path = path;
    this.cache = null;
  }

  update() {
    var self = this;

    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
    return new Promise(function(resolve, reject) {
      console.debug('Fetching...');
      self.$http.get(self.path).then(function(response) {
        console.debug('Status: ' + response.status);
        self.cache = response.data;
        resolve();
      });
    });
  }

  result() {
    return this.cache;
  }
}
