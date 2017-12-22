'use strict';
(function () {
  var form = document.querySelector('.notice__form');
  var genericStyle = function () {
    var style = document.createElement('style');
    style.type = 'text/css';
    style.textContent = [
      '.app-error {z-index:999; background-color: #fff; color: #C83E02; border: 3px solid #BC120E; padding: 10px; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); display: none;}',
      '.app-error--show {display: block}',
      '.notice__form {position: relative}',
      '.form-success {position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); color: green; background-color: #fff; border: 3px solid green; padding: 10px;}'
    ].join('\n');
    document.head.appendChild(style);
  };
  var disabledFields = function () {
    var fields = Array.from(form.elements);
    fields.forEach(function (item) {
      item.disabled = true;
    });
    form = null;
  };
  genericStyle();
  disabledFields();
})();
