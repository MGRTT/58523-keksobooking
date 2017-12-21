'use strict';

(function () {
  var offerData = null;
  var loadData = new Event('loadData', {bubbles: true, cancelable: true});

  var onLoad = function (data) {
    offerData = data;
    document.dispatchEvent(loadData);
  };

  var onError = function () {
    var errorMessage = document.createElement('div');
    var map = document.querySelector('.map');

    errorMessage.style.position = 'absolute';
    errorMessage.style.padding = '20px 60px';
    errorMessage.style.borderRadius = '5px';
    errorMessage.style.backgroundColor = 'white';
    errorMessage.style.color = 'red';
    errorMessage.style.fontSize = '14px';
    errorMessage.textContent = 'Ошибка соединения';

    map.appendChild(errorMessage);
  };

  window.backend.load(onLoad, onError);

  window.data = {};
  window.data.get = function () {
    return offerData;
  };

})();
