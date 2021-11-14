// Активируем валидацию
enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__form-input',
  submitButtonSelector: '.popup__button-save',
  inputErrorClass: 'popup__form-input_error',
  errorClass: 'popup__error_visible'
});