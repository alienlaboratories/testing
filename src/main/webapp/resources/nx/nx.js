//
// Test module.
//

'use strict';

/**
 * Util class.
 */
export class NX {

  static version() {
    return '0.0.1';
  }

  /**
   * Parses a string and returns it's primitive value (int, float, boolean or string).
   * @param str
   * @returns {*}
   */
  static parseValue(str) {
    if (!isNaN(str)) {
      return parseFloat(str);
    }
    if ((/^true$/i).test(str)) {
      return true;
    }
    if ((/^false$/i).test(str)) {
      return false;
    }

    return str;
  }

  /**
   * Parses current URL's query params and returns a dictionary of values.
   * @returns {{}}
   */
  static queryParams() {
    var params = {};
    var search = window.decodeURIComponent(window.location.search);
    var parts = search.substring(1).split('&');
    for (let p of parts) {
      var expr = p.split('=');
      var key = expr[0];
      var value;
      if (expr.length == 1) {
        value = true;
      } else {
        value = NX.parseValue(window.decodeURIComponent(expr[1]));
      }
      params[key] = value;
    }

    return params;
  }

}
