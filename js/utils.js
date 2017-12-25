'use strict';

(function () {

  if (!window.app) {
    window.app = {};
  }

  var ERROR_INTERVAL = 5000;
  var STATUS_OK = 200;
  var READYSTATE_DONE = 4;

  var getRandomNumber = function (min, max) {
    return Math.round(Math.random() * (max - min) + min);
  };

  var getUnique = function (arr, startIndex) {
    var index = getRandomNumber(startIndex, arr.length - 1);
    var tmp = arr[index];

    arr[index] = arr[startIndex];
    arr[startIndex] = tmp;

    return tmp;
  };

  var getRandomArr = function (target, count) {
    var arr = [];

    for (var i = 0; i < count; i++) {
      arr.push(getUnique(target, i));
    }
    return arr;
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

  var configureAjax = function (settings) {
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
      headers: {}
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
      if (xhr.readyState === READYSTATE_DONE && xhr.status === STATUS_OK) {
        options.success(xhr.response);
      }

      if (xhr.readyState === READYSTATE_DONE && xhr.status !== STATUS_OK) {
        if (typeof options.sendError === 'function') {
          options.sendError(xhr.response, options.errorBox);
        }
      }
    };

    xhr.onerror = function () {
      if (typeof options.sendError === 'function') {
        options.sendError('Произошла ошибка соединения!', options.errorBox);
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

  var sendError = function (message, target) {
    var error = document.querySelector('#app-error');

    if (!error) {
      error = document.createElement('div');
      error.id = 'app-error';
      error.classList.add('app-error');
      target.appendChild(error);
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
    }, ERROR_INTERVAL);
  };

  var syncFields = function (evt, field1, field2, callback) {
    callback(field1, field2);

    field1.addEventListener(evt, function () {
      callback(field1, field2);
    });
  };

  var checkEntry = function (target, values) {
    for (var i = 0; i < values.length; i++) {
      if (target.indexOf(values[i]) === -1) {
        return false;
      }
    }
    return true;
  };

  window.app.utils = {
    configureAjax: configureAjax,
    sendError: sendError,
    getRandomArr: getRandomArr,
    clickHandler: clickHandler,
    keyDownHandler: keyDownHandler,
    syncFields: syncFields,
    checkEntry: checkEntry
  };
})();
