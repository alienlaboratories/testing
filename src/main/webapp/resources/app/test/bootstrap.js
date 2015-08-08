//
// Angular bootstrap.
//

import angular from 'angular';
import { module } from './main';

angular.element(document).ready(function() {
  angular.bootstrap(document.querySelector('#app-root'), [
    module.name
  ], {
    strictDi: true
  });
});
