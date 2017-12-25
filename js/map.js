'use strict';

(function () {

  if (!window.app) {
    window.app = {};
  }

  var TOP_LIMIT = 180;

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
          top: TOP_LIMIT - elem.offsetHeight,
          right: Math.round(elem.offsetParent.offsetWidth - elem.offsetWidth / 2),
          bottom: elem.offsetParent.offsetHeight - (extraOffset || 0)
        };

        elem.style.left = event.clientX - offsetCoord.x + 'px';
        elem.style.top = event.clientY - offsetCoord.y + 'px';

        var elemMouseMoveHandler = function (evt) {
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

        var elemMouseUpHandler = function () {
          document.removeEventListener('mousemove', elemMouseMoveHandler);
          document.removeEventListener('mouseup', elemMouseUpHandler);
        };

        document.addEventListener('mousemove', elemMouseMoveHandler);
        document.addEventListener('mouseup', elemMouseUpHandler);
      }
    };
  };

  window.app.map = {
    moveElemHandler: moveElemHandler
  };
})();
