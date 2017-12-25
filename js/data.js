'use strict';

(function () {

  if (!window.app) {
    window.app = {};
  }

  var offerData = null;
  var loadData = new Event('loadData', {bubbles: true, cancelable: true});
  var URL = 'https://1510.dump.academy/keksobooking/data';

  window.app.utils.configureAjax({
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
