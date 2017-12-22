'use strict';

(function () {
  if (!window.app) {
    window.app = {};
  }
  var formHandler = function (settings) {
    return function (event) {
      event.preventDefault();
      var valid = true;
      if (settings.elem.title.value.length < 30) {
        valid = false;
        settings.sendError([{fieldName: '«Заголовок объявления»', errorMessage: 'должно быть не менее 30 символов'}], settings.errorBox);
      }
      if (settings.elem.title.value.length > 100) {
        valid = false;
        settings.sendError([{fieldName: '«Заголовок объявления»', errorMessage: 'должно быть не более 100 символов'}], settings.errorBox);
      }
      if (!settings.elem.address.value.length) {
        valid = false;
        settings.sendError([{fieldName: '«Адрес объявления»', errorMessage: 'не может быть пустым'}], settings.errorBox);
      }
      if (valid) {
        settings.data = new FormData(settings.elem);
        window.app.utils.ajax(settings);
      }
    };
  };
  window.app.formHandler = formHandler;
})();
