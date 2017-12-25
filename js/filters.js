'use strict';

(function () {

  if (!window.app) {
    window.app = {};
  }

  var MAX_PRICE = 50000;
  var MIN_PRICE = 10000;

  var selectCriteria = {
    type: 'any',
    price: 'any',
    rooms: 'any',
    guests: 'any',
    wifi: false,
    dishwasher: false,
    parking: false,
    washer: false,
    elevator: false,
    conditioner: false,
    features: []
  };

  var initFilters = function (data, elem, callback) {
    var filtrate = function (field, item) {
      var result = true;

      if (selectCriteria[field] !== 'any') {
        result = selectCriteria[field] === item.offer[field];
      }
      return result;
    };

    var filtratePrice = function (item) {
      var result = true;

      if (selectCriteria.price !== 'any') {
        switch (selectCriteria.price) {
          case 'middle':
            result = item.offer.price >= MIN_PRICE && item.offer.price <= MAX_PRICE;
            break;
          case 'low':
            result = item.offer.price < MIN_PRICE;
            break;
          case 'high':
            result = item.offer.price > MAX_PRICE;
            break;
          default:
            break;
        }
      }
      return result;
    };

    elem.addEventListener('change', function (event) {
      event.preventDefault();

      var newData = [];
      var target = event.target;
      var filteredField = target.nodeName.toLowerCase() === 'input' ? target.value : target.id.slice(target.id.indexOf('-') + 1);
      var filteredValue = target.nodeName.toLowerCase() === 'input' ? target.checked : target.options[target.selectedIndex].value;

      selectCriteria[filteredField] = typeof filteredValue === 'boolean' || isNaN(filteredValue) ? filteredValue : parseInt(filteredValue, 10);
      for (var key in selectCriteria) {
        if (selectCriteria.hasOwnProperty(key)) {
          if (typeof selectCriteria[key] === 'boolean') {
            if (selectCriteria[key]) {
              if (!selectCriteria.features.includes(key)) {
                selectCriteria.features.push(key);
              }
            } else {
              if (selectCriteria.features.includes(key)) {
                var index = selectCriteria.features.indexOf(key);
                selectCriteria.features.splice(index, 1);
              }
            }
          }
        }
      }
      data.forEach(function (item) {
        if (selectCriteria.features.length > 0) {
          var checkFeatures = window.app.utils.checkEntry(item.offer.features, selectCriteria.features);
          if (checkFeatures) {
            newData.push(item);
          }
        } else {
          newData = data.slice();
        }
      });

      newData = newData.filter(function (item) {
        return filtrate('type', item) && filtrate('guests', item) && filtrate('rooms', item) && filtratePrice(item);
      });
      callback(newData);
    });
  };

  window.app.initFilters = initFilters;
})();
