'use strict';

(function () {

  if (!window.app) {
    window.app = {};
  }

  var URL = 'https://1510.dump.academy/keksobooking/data';

  var offerData = null;
  var loadData = new Event('loadData', {bubbles: true, cancelable: true});

  window.app.utils.getAjax({
    method: 'GET',
    url: URL,
    errorBox: document.body,
    success: function (data) {
      offerData = data;
      document.dispatchEvent(loadData);
    },
    sendError: window.app.utils.sendError,
    type: 'json'
  });

  window.app.data = {
    get: function () {
      return offerData;
    },
    set: function (newData) {
      offerData = newData;
    }
  };
})();
