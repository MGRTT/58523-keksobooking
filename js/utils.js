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
    }
  };
})();
