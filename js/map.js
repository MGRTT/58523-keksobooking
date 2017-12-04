'use strict';

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
var times = ['12:00', '13:00', '14:00'];
var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

var templateContent = document.querySelector('template').content;
var pinTemplate = templateContent.querySelector('.map__pin');
var offerTemplate = templateContent.querySelector('.map__card');
var mapPins = document.querySelector('.map__pins');
var map = document.querySelector('.map');
var offersNextSibling = map.querySelector('.map__filters-container');

var offerCount = 8;

var removeClass = function (block, className) {
  block.classList.remove(className);
};

removeClass(map, 'map--faded');

//  Случайное число в диапазоне от min до max
var getRandomNumber = function (min, max) {
  return Math.round(Math.random() * (max - min) + min);
};

//  Случайный элемент массива
var getRandomElement = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

//  Массив строк случайной длины
var getUnique = function (arr, startIndex) {
  var index = getRandomNumber(startIndex, arr.length - 1);
  var tmp = arr[index];

  arr[index] = arr[startIndex];
  arr[startIndex] = tmp;

  return tmp;
};

var getRandomArr = function (target) {
  var arr = [];
  var length = getRandomNumber(0, target.length - 1);
  for (var i = 0; i < length; i++) {
    arr.push(getUnique(target, i));
  }
  return arr;
};

//  Создание массива объектов
var getData = function (count) {
  var data = [];

  for (var i = 1; i <= count; i++) {
    var x = getRandomNumber(300, 900);
    var y = getRandomNumber(100, 500);
    var time = getRandomElement(times);

    var item = {};

    item.author = {};
    item.author.avatar = 'img/avatars/user0' + i + '.png';

    item.offer = {};
    item.offer.title = getRandomElement(titles);
    item.offer.address = x + ', ' + y;
    item.offer.price = getRandomNumber(1000, 1000000);
    item.offer.type = getRandomElement(types);
    item.offer.rooms = getRandomNumber(1, 5);
    item.offer.guests = getRandomNumber(1, 5);
    item.offer.checkin = time;
    item.offer.checkout = time;
    item.offer.features = getRandomArr(features);
    item.offer.description = '';
    item.offer.photos = [];

    item.location = {};
    item.location.x = x;
    item.location.y = y;

    data.push(item);
  }
  return data;
};


//  Создание и отрисовка пинов
var createPin = function (data) {
  var template = pinTemplate.cloneNode(true);

  template.querySelector('img').src = data.author.avatar;
  template.style.left = data.location.x - 20 + 'px';
  template.style.top = data.location.y + 44 + 'px';

  return template;
};

var renderPins = function (data) {
  var fragment = document.createDocumentFragment();

  data.forEach(function (item) {
    fragment.appendChild(createPin(item));
  });

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
  }
  return translation;
};

//  Создание и отрисовка объявления
var createOffer = function (data) {
  var template = offerTemplate.cloneNode(true);

  template.querySelector('h3').textContent = data.offer.title;
  template.querySelector('small').textContent = data.offer.address;
  template.querySelector('.popup__price').textContent = data.offer.price + ' \u20BD / ночь';
  template.querySelector('h4').textContent = translateType(data.offer.type);
  template.querySelectorAll('p')[2].textContent = data.offer.rooms + ' комнат для ' + data.offer.guests + ' гостей';
  template.querySelectorAll('p')[3].textContent = 'Заезд после ' + data.offer.checkin + ', выезд до ' + data.offer.checkout;
  template.querySelectorAll('p')[4].textContent = data.offer.description;
  template.querySelector('.popup__avatar').src = data.author.avatar;

  return template;
};

var renderOffer = function (data) {
  var fragment = document.createDocumentFragment();

  data.forEach(function (item) {
    fragment.appendChild(createOffer(item));
  });

  map.insertBefore(fragment, offersNextSibling);
};

var data = getData(offerCount);
renderPins(data);
renderOffer(data);
