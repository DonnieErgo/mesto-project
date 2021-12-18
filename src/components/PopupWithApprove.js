import Popup from './Popup.js';

// Класс для работы с попапами подтверждения действий
export default class PopupWithApprove extends Popup {
  constructor(config, popupSelector, approveHandler) {
    super(config, popupSelector)
    this._approveHandler = approveHandler;
    this.submitButton = this._popup.querySelector(config.submitButtonSelector)
  }

  // Навешивание слушателей
  setEventListeners() {
    super.setEventListeners()
    this.submitButton.addEventListener('click', this._approveHandler)
  }
}