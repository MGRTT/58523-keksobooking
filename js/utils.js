'use strict';

(function () {

  if (!window.app) {
    window.app = {};
  }

  var STATUS_OK = 200;
  var READY_STATE_DONE = 4;

  var getRandomNumber = function (min, max) {
    return Math.round(Math.random() * (max - min) + min);
  };

  var getUnique = function (elements, startIndex) {
    var index = getRandomNumber(startIndex, elements.length - 1);
    var tmp = elements[index];

    elements[index] = elements[startIndex];
    elements[startIndex] = tmp;

    return tmp;
  };

  var getRandomArr = function (targetItems, count) {
    var resultElements = [];

    for (var i = 0; i < count; i++) {
      resultElements.push(getUnique(targetItems, i));
    }
    return resultElements;
  };

  var clickHandler = function () {
    var args = Array.from(arguments);
    var callback = args[0];

    return function (event) {
      args.splice(0, 1, event);
      callback.apply(null, args);
    };
  };

  var keyDownHandler = function () {
    var args = Array.from(arguments);
    var callback = args.splice(0, 1)[0];
    var keyCode = args.splice(0, 1)[0];

    return function (event) {
      args.unshift(event);
      if (event.keyCode === keyCode) {
        callback.apply(null, args);
      }
    };
  };

  var getAjax = function (settings) {
    var defSettings = {
      method: 'GET',
      url: '',
      data: null,
      sinc: true,
      success: null,
      sendError: null,
      errorBox: null,
      type: '',
      readyStateChange: null,
      headers: {},
      delay: 5000
    };

    var options = Object.assign({}, defSettings, settings);
    var xhr = new XMLHttpRequest();

    xhr.responseType = options.type;
    xhr.open(options.method, options.url, options.sinc);
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

    for (var key in options.headers) {
      if (options.headers.hasOwnProperty(key)) {
        xhr.setRequestHeader(key, options.headers[key]);
      }
    }

    xhr.onreadystatechange = options.readyStateChange || function () {
      if (xhr.readyState === READY_STATE_DONE && xhr.status === STATUS_OK) {
        options.success(xhr.response);
      }

      if (xhr.readyState === READY_STATE_DONE && xhr.status !== STATUS_OK) {
        if (typeof options.sendError === 'function') {
          options.sendError(xhr.response, options.errorBox, options.delay);
        }
      }
    };

    xhr.onerror = function () {
      if (typeof options.sendError === 'function') {
        options.sendError('Произошла ошибка соединения!', options.errorBox, options.delay);
      }
    };

    xhr.send(options.data);
  };

  var renderErrorText = function (message) {
    var fragment = document.createDocumentFragment();

    message.forEach(function (item) {
      var row = document.createElement('p');

      row.textContent = 'Поле ' + item.fieldName + ': ' + item.errorMessage;
      fragment.appendChild(row);
    });
    return fragment;
  };

  var sendError = function (message, targetItems, delay) {
    var error = document.querySelector('#app-error');

    if (!error) {
      error = document.createElement('div');
      error.id = 'app-error';
      error.classList.add('app-error');
      targetItems.appendChild(error);
    }

    error.innerHTML = '';

    if (Object.prototype.toString.call(message) === '[object Array]') {
      error.appendChild(renderErrorText(message));
    } else {
      error.textContent = message;
    }

    error.classList.add('app-error--show');

    setTimeout(function () {
      error.classList.remove('app-error--show');
    }, delay);
  };

  var syncFields = function (evt, field1, field2, callback) {
    callback(field1, field2);

    field1.addEventListener(evt, function () {
      callback(field1, field2);
    });
  };

  var checkEntry = function (targetItems, values) {
    for (var i = 0; i < values.length; i++) {
      if (targetItems.indexOf(values[i]) === -1) {
        return false;
      }
    }
    return true;
  };

  window.app.utils = {
    getAjax: getAjax,
    sendError: sendError,
    getRandomArr: getRandomArr,
    clickHandler: clickHandler,
    keyDownHandler: keyDownHandler,
    syncFields: syncFields,
    checkEntry: checkEntry
  };
})();
