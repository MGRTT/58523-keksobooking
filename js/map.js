'use strict';

(function () {

  if (!window.app) {
    window.app = {};
  }

  var TOP_MAP_OFFSET = 180;

  var changeCoords = new Event('changeCoords', {bubbles: true, cancelable: true});

  var moveElemHandler = function (cssClass, extraOffset) {
    return function (event) {
      var elem = event.target.closest(cssClass);

      if (elem) {
        event.preventDefault();

        var offsetCoord = {
          x: event.clientX - elem.offsetLeft,
          y: event.clientY - elem.offsetTop
        };

        var limitCoord = {
          left: Math.round(elem.offsetWidth / 2),
          top: TOP_MAP_OFFSET - elem.offsetHeight,
          right: Math.round(elem.offsetParent.offsetWidth - elem.offsetWidth / 2),
          bottom: elem.offsetParent.offsetHeight - (extraOffset || 0)
        };

        elem.style.left = event.clientX - offsetCoord.x + 'px';
        elem.style.top = event.clientY - offsetCoord.y + 'px';

        var setElemPositionHandler = function (evt) {
          evt.preventDefault();

          var left = evt.clientX - offsetCoord.x;
          var top = evt.clientY - offsetCoord.y;

          if (left < limitCoord.left) {
            left = limitCoord.left;
          }
          if (left > limitCoord.right) {
            left = limitCoord.right;
          }
          if (top > limitCoord.bottom) {
            top = limitCoord.bottom;
          }
          if (top < limitCoord.top) {
            top = limitCoord.top;
          }

          elem.style.left = left + 'px';
          elem.style.top = top + 'px';

          elem.dispatchEvent(changeCoords);
        };

        var endElemMoveHandler = function () {
          document.removeEventListener('mousemove', setElemPositionHandler);
          document.removeEventListener('mouseup', endElemMoveHandler);
        };

        document.addEventListener('mousemove', setElemPositionHandler);
        document.addEventListener('mouseup', endElemMoveHandler);
      }
    };
  };

  window.app.map = {
    moveElemHandler: moveElemHandler
  };
})();
