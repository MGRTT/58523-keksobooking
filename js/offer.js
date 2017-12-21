'use strict';

(function () {

  window.offer = {
    activePin: null,
    currentOffer: null,
    map: document.querySelector('.map'),

    show: function (event, data) {
      event.preventDefault();

      var target = event.target.closest('.map__pin:not(.map__pin--main)');

      if (target) {
        var index = target.dataset.num;
        target.classList.add('map__pin--active');
        if (window.offer.activePin) {
          window.offer.activePin.classList.remove('map__pin--active');
        }
        if (window.offer.currentOffer) {
          window.offer.currentOffer.remove();
        }

        window.offer.currentOffer = window.map.createOffer(data[index]);
        window.offer.activePin = target;
      }
    }
  };
})();
