'use strict';

(function () {
  var offerData = null;
  var loadData = new Event('loadData', {bubbles: true, cancelable: true});

  var onLoad = function (data) {
    offerData = data;
    document.dispatchEvent(loadData);
  };

  window.backend.load(onLoad, null);

  window.data = {};
  window.data.get = function () {
    return offerData;
  };

})();
