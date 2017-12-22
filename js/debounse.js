'use strict';
(function () {
  if (!window.app) {
    window.app = {};
  }
  var DEBOUNCE_INTERVAL = 3000;
  var lastTimeout;

  var debounse = function (cb) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }

    lastTimeout = window.setTimeout(cb, DEBOUNCE_INTERVAL);
  };

  window.app.debounse = debounse;
})();
