//
// Angular view module.
//

'use strict';

import { HasListeners } from 'nx/callback';

/**
 * Test.
 */
export class Test extends HasListeners {

  constructor() {
    super();
  }

  listen() {
    this.listener = super.addListener(this.fire.bind(this));
    return this;
  }

  fire(value) {
    console.log(`Callback: ${value}`);
    super.removeListener(this.listener);
    super.fireListeners(200);
  }

}
