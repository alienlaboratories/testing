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

  listen(active=true) {
    if (active) {
      if (!this.handle) {
        this.handle = super.addListener(this.fire.bind(this));
      }
    } else if (this.handle) {
      this.handle();
    }
  }

  fire(value) {
    console.log(`Callback: ${value}`);
  }

}
