'use strict';

(function () {

  if (!window.app) {
    window.app = {};
  }

  var DEBOUNCE_INTERVAL = 1000;
  var lastTimeout;

  var debounce = function (cb) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }

    lastTimeout = window.setTimeout(cb, DEBOUNCE_INTERVAL);
  };

  window.app.debounce = debounce;
})();
