import Popup from './Popup.js';

// Класс для работы с попапами содержащими формы
export default class PopupWithForm extends Popup {
  constructor(config, popupSelector, submitForm) {
    super(config, popupSelector)
    this._popupForm = this._popup.querySelector(config.formSelector)
    this._popupInputs = this._popupForm.querySelectorAll(config.inputSelector)
    this.submitButton = this._popupForm.querySelector(config.submitButtonSelector)
    this._submitForm = submitForm
  }

  // Сбор значений из инпутов в объект
  _getInputValues() {
    const valuesObject = {}
    this._popupInputs.forEach(input => {
      valuesObject[input.name] = input.value
    })
    return valuesObject
  }

  // Навешивание слушателей сабмита
  setEventListeners() {
    super.setEventListeners()
    this._popupForm.addEventListener('submit', evt => {
      evt.preventDefault()
      this.submitButton.textContent = 'Сохраняем...'
      this._submitForm(this._getInputValues())
    })
  }

  // Закрытие попапа с ресетом полей
  close() {
    super.close()
    this._popupForm.reset()
  }
}