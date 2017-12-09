'use strict';

(function () {
  var noticeForm = document.querySelector('.notice__form');
  var timeIn = noticeForm.querySelector('#timein');
  var timeOut = noticeForm.querySelector('#timeout');
  var roomsNumber = noticeForm.querySelector('#room_number');
  var guestsNumber = noticeForm.querySelector('#capacity');

  var connectFields = function (evt, field1, field2, callback) {
    callback(field1, field2);

    field1.addEventListener(evt, function () {
      callback(field1, field2);
    });
  };

  var timeSinc = function (param1, param2) {
    param2.selectedIndex = param1.selectedIndex;
  };

  connectFields('change', timeIn, timeOut, timeSinc);
  connectFields('change', timeOut, timeIn, timeSinc);

  var getMinPrice = function (field1, field2) {
    var value = null;

    switch (field1.value) {
      case 'bungalo' :
        value = 0;
        break;
      case 'flat' :
        value = 1000;
        break;
      case 'house' :
        value = 5000;
        break;
      case 'palace' :
        value = 10000;
        break;
      default :
        break;
    }

    field2.value = value;
  };

  var setMinPrice = function (field1, field2) {
    var value = field2.value;

    if (value === 'bungalo' && field1.value < 0) {
      field1.value = 0;
    }
    if (value === 'flat' && field1.value < 1000) {
      field1.value = 1000;
    }
    if (value === 'house' && field1.value < 5000) {
      field1.value = 5000;
    }
    if (value === 'palace' && field1.value < 10000) {
      field1.value = 10000;
    }
  };

  connectFields('change', noticeForm.type, noticeForm.price, getMinPrice);
  connectFields('input', noticeForm.price, noticeForm.type, setMinPrice);

  var connectRoomsAndGuests = function (param1, param2) {
    var optionsMapping = {
      1: [1],
      2: [1, 2],
      3: [1, 2, 3],
      100: [0]
    };

    var value = parseInt(param1.value, 10);
    var options = param2.options;
    var optionsLength = options.length;
    var availableOptions = optionsMapping[value];
    var curValue = null;

    for (var i = 0; i < optionsLength; i++) {
      curValue = parseInt(options[i].value, 10);

      if (availableOptions.indexOf(curValue) !== -1) {
        options[i].disabled = false;
        if (curValue === value || availableOptions.length === 1) {
          options[i].selected = true;
        }
      } else {
        options[i].disabled = true;
      }
    }
  };

  connectFields('change', roomsNumber, guestsNumber, connectRoomsAndGuests);
})();
