'use strict';

(function () {

  var load = function (onLoad, onError) {
    var settings = {
      method: 'GET',
      url: 'https://1510.dump.academy/keksobooking/data',
      success: onLoad,
      sendError: onError,
      type: 'json'
    };

    window.utils.ajax(settings);
  };

  var save = function (onLoad, onError, data) {
    var settings = {
      method: 'POST',
      url: 'https://1510.dump.academy/keksobooking',
      success: onLoad,
      sendError: onError,
      type: 'json',
      data: data
    };

    window.utils.ajax(settings);
  };

  window.backend = {};
  window.backend.load = load;
  window.backend.save = save;
})();
