'use strict';

(function () {

  var SUCCESS_INTERVAL = 5000;

  var Key = {
    ENTER: 13,
    ESC: 27
  };

  var OPTIONS_MAP = {
    1: [1],
    2: [1, 2],
    3: [1, 2, 3],
    100: [0]
  };

  var LimitPrice = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };

  var templateContent = document.querySelector('template').content;
  var pinTemplate = templateContent.querySelector('.map__pin');
  var offerTemplate = templateContent.querySelector('.map__card');

  var map = document.querySelector('.map');
  var mapPins = map.querySelector('.map__pins');
  var filters = map.querySelector('.map__filters-container');
  var mainPin = map.querySelector('.map__pin--main');
  var noticeForm = document.querySelector('.notice__form');

  var mainPinMouseUpHandler = function () {
    map.classList.remove('map--faded');
    noticeForm.classList.remove('notice__form--disabled');

    window.app.ad.renderPins(window.app.data.get(), mapPins, pinTemplate);

    var fields = Array.from(noticeForm.elements);

    fields.forEach(function (item) {
      item.disabled = false;
    });

    mainPin.removeEventListener('mouseup', mainPinMouseUpHandler);
  };

  var doCloseHandler = function (event) {
    if (event.target.closest('.popup__close')) {
      window.app.ad.closeAdDetails(event);
    }
  };

  var syncValue = function (param1, param2) {
    param2.selectedIndex = param1.selectedIndex;
  };

  var pinMoveHandler = window.app.map.moveElemHandler('.map__pin--main', filters.offsetHeight);

  var formHandler = window.app.formHandler({
    method: 'POST',
    url: 'https://1510.dump.academy/keksobooking',
    errorBox: noticeForm,
    elem: noticeForm,
    sendError: window.app.utils.sendError,
    type: 'json',
    success: function () {
      var message = document.createElement('p');

      message.classList.add('form-success');
      message.textContent = 'Форма успешно отправлена';
      noticeForm.appendChild(message);

      setTimeout(function () {
        message.remove();
      }, SUCCESS_INTERVAL);
    }
  });

  document.addEventListener('loadData', function (event) {
    event.preventDefault();

    noticeForm.addEventListener('submit', formHandler);
    mainPin.addEventListener('mouseup', mainPinMouseUpHandler);
    map.addEventListener('click', window.app.utils.clickHandler(window.app.ad.showAdDetails, map, offerTemplate));
    map.addEventListener('click', window.app.utils.clickHandler(doCloseHandler));
    document.addEventListener('keydown', window.app.utils.keyDownHandler(window.app.ad.closeAdDetails, Key.ESC));
    map.addEventListener('keydown', window.app.utils.keyDownHandler(doCloseHandler, Key.ENTER));
    mainPin.addEventListener('mousedown', pinMoveHandler);
    window.app.utils.syncFields('change', noticeForm.timein, noticeForm.timeout, syncValue);
    window.app.utils.syncFields('change', noticeForm.timeout, noticeForm.timein, syncValue);

    window.app.utils.syncFields('change', noticeForm.type, noticeForm.price, function (field1, field2) {
      field2.value = LimitPrice[field1.value];
    });

    window.app.utils.syncFields('input', noticeForm.price, noticeForm.type, function (field1, field2) {
      var value = field2.value;

      if (value === 'bungalo' && field1.value < LimitPrice.bungalo) {
        field1.value = LimitPrice.bungalo;
      }
      if (value === 'flat' && field1.value < LimitPrice.flat) {
        field1.value = LimitPrice.flat;
      }
      if (value === 'house' && field1.value < LimitPrice.house) {
        field1.value = LimitPrice.house;
      }
      if (value === 'palace' && field1.value < LimitPrice.palace) {
        field1.value = LimitPrice.palace;
      }
    });

    window.app.utils.syncFields('change', noticeForm.rooms, noticeForm.capacity, function (param1, param2) {
      var value = parseInt(param1.value, 10);
      var options = param2.options;
      var optionsLength = options.length;
      var availableOptions = OPTIONS_MAP[value];
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
    });

    window.app.utils.syncFields('changeCoords', mainPin, noticeForm.address, function setAddres(elem1, elem2) {
      var latitude = elem1.style.left ? Math.round(parseInt(elem1.style.left, 10) + elem1.offsetWidth / 2) - 1 : Math.round(elem1.offsetLeft - elem1.offsetWidth / 2);
      var longitude = elem1.style.top ? parseInt(elem1.style.top, 10) + elem1.offsetHeight : elem1.offsetTop - elem1.offsetHeight;

      elem2.value = 'x: ' + latitude + ', ' + 'y: ' + longitude;
    });

    window.app.initFilters(window.app.data.get(), filters, function (data) {
      window.app.data.set(data);
      window.app.debounce(function () {
        window.app.ad.renderPins(window.app.data.get(), mapPins, pinTemplate);
      });
    });
  });
})();
