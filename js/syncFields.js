'use strict';

(function () {

  window.syncFields = function (evt, field1, field2, callback) {
    callback(field1, field2);

    field1.addEventListener(evt, function () {
      callback(field1, field2);
    });
  };
})();
