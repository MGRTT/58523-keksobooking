'use strict';

(function () {

  var pinWidth = 40;
  var pinHeight = 40;

  var templateContent = document.querySelector('template').content;
  var pinTemplate = templateContent.querySelector('.map__pin');
  var offerTemplate = templateContent.querySelector('.map__card');
  var mapPins = document.querySelector('.map__pins');
  var map = document.querySelector('.map');
  var filters = map.querySelector('.map__filters-container');
  var mainPin = map.querySelector('.map__pin--main');
  var noticeForm = document.querySelector('.notice__form');
  var formFieldset = document.querySelectorAll('fieldset');

  var popupClose = null;

  var limitedPins = [];
  var limitOfPins = 5;

  //  Pin
  var createPin = function (data, num) {
    var template = pinTemplate.cloneNode(true);

    template.querySelector('img').src = data.author.avatar;
    template.style.left = data.location.x - pinWidth / 2 + 'px';
    template.style.top = data.location.y + pinHeight + 'px';
    template.dataset.num = num;

    return template;
  };

  var renderPins = function (data) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < limitOfPins; i++) {
      var pin = createPin(data[i], i);

      fragment.appendChild(pin);
      limitedPins.push(fragment);
    }
    mapPins.appendChild(fragment);
  };

  var translateType = function (type) {
    var translation = null;

    switch (type) {
      case 'flat' :
        translation = 'Квартира';
        break;
      case 'bungalo' :
        translation = 'Бунгало';
        break;
      case 'house' :
        translation = 'Дом';
        break;
      default :
        break;
    }
    return translation;
  };

  var getFeatures = function (featuresList) {
    var featuresBox = document.createElement('ul');

    featuresBox.className = 'popup__features';

    featuresList.forEach(function (item) {
      var li = document.createElement('li');
      li.className = 'feature feature--' + item;
      featuresBox.appendChild(li);
    });
    return featuresBox;
  };

  //  Offer
  window.map = {
    createOffer: function (data) {
      var template = offerTemplate.cloneNode(true);

      template.querySelector('h3').textContent = data.offer.title;
      template.querySelector('small').textContent = data.offer.address;
      template.querySelector('.popup__price').textContent = data.offer.price + ' \u20BD / ночь';
      template.querySelector('h4').textContent = translateType(data.offer.type);
      template.querySelectorAll('p')[2].textContent = data.offer.rooms + ' комнат для ' + data.offer.guests + ' гостей';
      template.querySelectorAll('p')[3].textContent = 'Заезд после ' + data.offer.checkin + ', выезд до ' + data.offer.checkout;
      template.querySelectorAll('p')[4].textContent = data.offer.description;
      template.querySelector('.popup__avatar').src = data.author.avatar;
      template.replaceChild(getFeatures(data.offer.features), template.querySelector('.popup__features'));

      popupClose = template.querySelector('.popup__close');
      popupClose.addEventListener('click', closePopup);

      map.insertBefore(template, filters);

      return template;
    },
  };

  var disableFormInputs = function () {
    for (var i = 0; i < formFieldset.length; i++) {
      formFieldset[i].disabled = true;
    }
  };

  var showFormInputs = function () {
    for (var i = 0; i < formFieldset.length; i++) {
      formFieldset[i].disabled = false;
    }
  };

  disableFormInputs();

  var mainPinFirstMouseupHandler = function () {
    map.classList.remove('map--faded');
    noticeForm.classList.remove('notice__form--disabled');

    showFormInputs();
    renderPins(window.data.get());

    mainPin.removeEventListener('mouseup', mainPinFirstMouseupHandler);
  };

  var closePopup = function (event) {
    event.preventDefault();

    window.offer.activePin.classList.remove('map__pin--active');
    window.offer.currentOffer.remove();

    popupClose.removeEventListener('click', closePopup);
  };

  mainPin.addEventListener('mouseup', mainPinFirstMouseupHandler);

  document.addEventListener('loadData', function (event) {
    event.preventDefault();
    map.addEventListener('click', window.utils.clickHandler(window.offer.show, window.data.get()));
  });

  //  Drag
  var addressField = document.querySelector('#address');

  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var mainPinMmouseMoveHandler = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var limit = {
        left: Math.round(mainPin.offsetWidth / 2),
        top: 170 - mainPin.offsetHeight,
        right: Math.round(mainPin.offsetParent.offsetWidth - mainPin.offsetWidth / 2),
        bottom: mainPin.offsetParent.offsetHeight - mainPin.offsetHeight
      };

      var top = mainPin.offsetTop - shift.y;
      var left = mainPin.offsetLeft - shift.x;

      if (left < limit.left) {
        left = limit.left;
      }
      if (left > limit.right) {
        left = limit.right;
      }
      if (top > limit.bottom) {
        top = limit.bottom;
      }
      if (top < limit.top) {
        top = limit.top;
      }

      mainPin.style.top = top + 'px';
      mainPin.style.left = left + 'px';

      addressField.value = 'x: ' + parseInt(mainPin.style.left, 10) + ' y: ' + parseInt(mainPin.style.top, 10);
    };

    var mainPinMouseUpHandler = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', mainPinMmouseMoveHandler);
      document.removeEventListener('mouseup', mainPinMouseUpHandler);
    };

    document.addEventListener('mousemove', mainPinMmouseMoveHandler);
    document.addEventListener('mouseup', mainPinMouseUpHandler);
  });
})();
