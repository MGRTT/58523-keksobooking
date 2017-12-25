'use strict';

(function () {

  var form = document.querySelector('.notice__form');

  var generateStyle = function () {
    var style = document.createElement('style');

    style.type = 'text/css';
    style.textContent = [
      '.app-error {z-index:999; background-color: #fff; color: #000; border: 4px solid #fa9; border-radius: 10px; padding: 50px 50px; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); display: none;}',
      '.app-error--show {display: block}',
      '.notice__form {position: relative}',
      '.form-success {position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); color: #000; background-color: #fff; border: 4px solid green; border-radius: 10px; padding: 50px 50px;}'
    ].join('\n');

    document.head.appendChild(style);
  };

  var disableFields = function () {
    var fields = Array.from(form.elements);

    fields.forEach(function (item) {
      item.disabled = true;
    });
    form = null;
  };

  generateStyle();
  disableFields();
})();
