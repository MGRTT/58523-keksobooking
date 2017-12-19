'use strict';

(function () {

  window.utils = {
    getRandomNumber: function (min, max) {
      return Math.round(Math.random() * (max - min) + min);
    },

    getRandomElement: function (arr) {
      return arr[Math.floor(Math.random() * arr.length)];
    },

    getUnique: function (arr, startIndex) {
      var index = window.utils.getRandomNumber(startIndex, arr.length - 1);
      var tmp = arr[index];

      arr[index] = arr[startIndex];
      arr[startIndex] = tmp;

      return tmp;
    },

    getRandomArr: function (target) {
      var arr = [];
      var length = window.utils.getRandomNumber(0, target.length - 1);
      for (var i = 0; i < length; i++) {
        arr.push(window.utils.getUnique(target, i));
      }
      return arr;
    },

    clickHandler: function () {
      var args = Array.from(arguments);
      var callback = args[0];

      return function (event) {
        args.splice(0, 1, event);
        callback.apply(null, args);
      };
    },

    ajax: function (settings) {
      var defSettings = {
        method: 'GET',
        url: '',
        data: null,
        sinc: true,
        success: null,
        sendError: null,
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
        if (xhr.readyState === 4 && xhr.status === 200) {
          options.success(xhr.response);
        }

        if (xhr.readyState === 4 && xhr.status !== 200) {
          if (typeof options.sendError === 'function') {
            options.sendError(xhr.response);
          }
        }
      };

      xhr.onerror = function () {
        if (typeof options.sendError === 'function') {
          options.sendError('Произошла ошибка соединения!');
        }
      };

      xhr.send(options.data);
    }
  };
})();
