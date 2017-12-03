'use strict';

//  Массивы со значениями ключей объекта offer
var titles = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'];

var types = ['flat', 'house', 'bungalo'];
var chekins = ['12:00', '13:00', '14:00'];
var checkouts = ['12:00', '13:00', '14:00'];
var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

//  Случайное число в диапазоне от min до max
var getRandomNumber = function (min, max) {
  return Math.round(Math.random() * (max - min) + min);
};

//  Случайный элемент массива
var getRandomElement = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

function getUnique(arr, startIndex) {
  var index = getRandomNumber(startIndex, arr.length - 1);
  var tmp = arr[index];
  arr[index] = arr[startIndex];
  arr[startIndex] = tmp;
  return tmp;
}

//  Массив строк случайной длины из features
function getRandomArr(target) {
  var arr = [];
  var length = getRandomNumber(0, target.length - 1);
  for (var i = 0; i < length; i++) {
    arr.push(getUnique(target, i));
  }
  return arr;
}

//  Создание объекта с объявлнием
var createAd = function (x) {
  var title = getRandomElement(titles);
  var type = getRandomElement(types);
  var checkin = getRandomElement(chekins);
  var checkout = getRandomElement(checkouts);
  var feature = getRandomArr(features);
  var price = getRandomNumber(1000, 1000000);
  var rooms = getRandomNumber(1, 5);
  var guests = getRandomNumber(1, 8);

  return {
    author: {
      avatar: 'img/avatars/user0' + x + '.png'
    },

    offer: {
      title: title,
      addres: location.x + ', ' + location.y,
      price: price,
      type: type,
      rooms: rooms,
      guests: guests,
      checkin: checkin,
      checkout: checkout,
      features: feature,
      description: '',
      photos: []
    },

    location: {
      x: getRandomNumber(300, 900),
      y: getRandomNumber(100, 500)
    }
  };
};

//  Массив объектов (8 штук)
var createArrayOfAds = function (count) {
  var arrayOfAds = [];

  for (var i = 0; i < count; i++) {
    arrayOfAds.push(createAd(i + 1));
  }

  return arrayOfAds;
};

var arrayOfAds = createArrayOfAds(8);


//  Удаляем класс .map--faded
var mapPines = document.querySelector('.map');

var removeClass = function (block, className) {
  block.classList.remove(className);
};

console.log(arrayOfAds);

removeClass(mapPines, 'map--faded');

var template = document.querySelector('template').content; // Нашли template
var pinTemplate = template.querySelector('.map__pin'); // Нашли шаблонный пин
var pinContainer = document.querySelector('.map__pins'); // Нашли блок, куда вставлять пины

//  Отрисуйте сгенерированные DOM-элементы в блок .map__pins. Для вставки элементов используйте DocumentFragment



//  На основе первого по порядку элемента из сгенерированного массива и шаблона template article.map__card
//  создайте DOM-элемент объявления, заполните его данными из объекта и вставьте полученный DOM-элемент в блок .map

