'use strict';

(function () {

  if (!window.app) {
    window.app = {};
  }

  var MIN_LENGTH = 30;
  var MAX_LENGTH = 100;

  var noticeForm = document.querySelector('.notice__form');

  var formHandler = function (settings) {
    return function (event) {
      event.preventDefault();

      var valid = true;

      if (settings.elem.title.value.length < MIN_LENGTH) {
        valid = false;
        settings.sendError([{fieldName: '«Заголовок объявления»', errorMessage: 'должно быть не менее 30 символов'}], settings.errorBox);
      }
      if (settings.elem.title.value.length > MAX_LENGTH) {
        valid = false;
        settings.sendError([{fieldName: '«Заголовок объявления»', errorMessage: 'должно быть не более 100 символов'}], settings.errorBox);
      }
      if (!settings.elem.address.value.length) {
        valid = false;
        settings.sendError([{fieldName: '«Адрес объявления»', errorMessage: 'не может быть пустым'}], settings.errorBox);
      }
      if (valid) {
        settings.data = new FormData(settings.elem);
        window.app.utils.configureAjax(settings);
        noticeForm.reset();
      }
    };
  };

  window.app.formHandler = formHandler;
})();
