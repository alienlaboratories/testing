//
// Util module.
//

'use strict';

export function async(f, context, args) {
  window.setTimeout(function() {
    f.apply(context, args);
  }, 0);
}

export class HasListeners {

  constructor() {
    this.listeners = [];
  }

  addListener(listener) {
    console.assert(listener);
    this.listeners.push(listener);
    return listener;
  }

  removeListener(listener) {
    for (let i in this.listeners) {
      if (listener === this.listeners[i]) {
        this.listeners.splice(i, 1);
        return;
      }
    }
    console.assert(false);
  }

  fireListeners() {
    for (let listener of this.listeners) {
      async(listener, this, arguments);
    }
  }

}
