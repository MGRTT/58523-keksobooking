'use strict';

(function () {

  if (!window.app) {
    window.app = {};
  }

  var MIN_TITLE_LENGTH = 30;
  var MAX_TITLE_LENGTH = 100;

  var noticeForm = document.querySelector('.notice__form');

  var formHandler = function (settings) {
    return function (event) {
      event.preventDefault();

      var valid = true;

      if (settings.elem.title.value.length < MIN_TITLE_LENGTH) {
        valid = false;
        settings.sendError([{fieldName: '«Заголовок объявления»', errorMessage: 'должно быть не менее ' + MIN_TITLE_LENGTH + ' символов'}], settings.errorBox, settings.delay);
      }
      if (settings.elem.title.value.length > MAX_TITLE_LENGTH) {
        valid = false;
        settings.sendError([{fieldName: '«Заголовок объявления»', errorMessage: 'должно быть не более ' + MAX_TITLE_LENGTH + ' символов'}], settings.errorBox, settings.delay);
      }
      if (!settings.elem.address.value.length) {
        valid = false;
        settings.sendError([{fieldName: '«Адрес объявления»', errorMessage: 'не может быть пустым'}], settings.errorBox, settings.delay);
      }
      if (valid) {
        settings.data = new FormData(settings.elem);
        window.app.utils.getAjax(settings);
        noticeForm.reset();
      }
    };
  };

  window.app.formHandler = formHandler;
})();
