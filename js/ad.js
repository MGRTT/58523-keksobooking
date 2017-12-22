'use strict';
(function () {
  if (!window.app) {
    window.app = {};
  }
  var typeAd = {
    flat: 'Квартира',
    bungalo: 'Бунгало',
    house: 'Дом',
    palace: 'Дворец'
  };
  var pinWidth = 40;
  var pinHeight = 40;
  var ADCOUNT = 5;
  var currentShowAd = null;
  var displayableLabels = [];

  var createPin = function (data, pinTemplate, num) {
    var template = pinTemplate.cloneNode(true);

    template.querySelector('img').src = data.author.avatar;
    template.style.left = data.location.x - pinWidth / 2 + 'px';
    template.style.top = data.location.y + pinHeight + 'px';
    template.dataset.num = num;
    displayableLabels.push(template);
    return template;
  };

  var renderPins = function (data, target, template) {
    var fragment = document.createDocumentFragment();
    displayableLabels.forEach(function (item) {
      item.remove();
    });
    displayableLabels = [];
    var count = data.length > ADCOUNT ? ADCOUNT : data.length;
    var ads = window.app.utils.getRandomArr(data, count);

    ads.forEach(function (item, i) {
      fragment.appendChild(createPin(item, template, i));
    });

    target.appendChild(fragment);
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

  var createOffer = function (data, offerTemplate) {
    var template = offerTemplate.cloneNode(true);

    template.querySelector('h3').textContent = data.offer.title;
    template.querySelector('small').textContent = data.offer.address;
    template.querySelector('.popup__price').textContent = data.offer.price + ' \u20BD / ночь';
    template.querySelector('h4').textContent = typeAd[data.offer.type];
    template.querySelectorAll('p')[2].textContent = data.offer.rooms + ' комнат для ' + data.offer.guests + ' гостей';
    template.querySelectorAll('p')[3].textContent = 'Заезд после ' + data.offer.checkin + ', выезд до ' + data.offer.checkout;
    template.querySelectorAll('p')[4].textContent = data.offer.description;
    template.querySelector('.popup__avatar').src = data.author.avatar;
    template.replaceChild(getFeatures(data.offer.features), template.querySelector('.popup__features'));

    return template;
  };

  var showAdDetails = function (event, targetBox, template) {
    var target = event.target.closest('.map__pin:not(.map__pin--main)');
    if (target) {
      event.preventDefault();
      var data = window.app.data.get();
      var index = target.dataset.num;
      target.classList.add('map__pin--active');
      if (currentShowAd) {
        currentShowAd.pin.classList.remove('map__pin--active');
        currentShowAd.details.remove();
      }
      var addDetails = createOffer(data[index], template);
      targetBox.appendChild(addDetails);
      currentShowAd = {};
      currentShowAd.pin = target;
      currentShowAd.details = addDetails;
    }
  };

  var closeAdDetails = function () {
    if (currentShowAd) {
      currentShowAd.details.remove();
      currentShowAd.pin.classList.remove('map__pin--active');
    }
  };

  window.app.ad = {
    renderPins: renderPins,
    showAdDetails: showAdDetails,
    closeAdDetails: closeAdDetails
  };
})();
