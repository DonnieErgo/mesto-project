// Класс для работы с попапами
export default class Popup {
  constructor(config, popupSelector) {
    this._popupActiveClass = config.popupActiveClass;

    this._popup = document.querySelector(popupSelector)
    this._closeButton = this._popup.querySelector(config.closeButtonSelector)
    this._handleEscCloseMethod = this._handleEscClose.bind(this)
  }

  // Закрытие по кнопке
  _handleClickCloseButton() {
    this.close();
  }

  // Закрытие по клику вне окна
  _closeOnOverlayClick(evt) {
    if (evt.target.classList.contains('popup_active')) this.close();
  }

  // Закрытие по нажатию Esc
  _handleEscClose(evt) {
    if (evt.key === 'Escape') this.close();
  }

  // Навешивание слушателей
  setEventListeners() {
    this._popup.addEventListener('click', this._closeOnOverlayClick.bind(this))
    this._closeButton.addEventListener('click', this._handleClickCloseButton.bind(this))
  }

  // Открытие попапа и добавление слушателя на Esc
  open() {
    this._popup.classList.add(this._popupActiveClass);
    document.addEventListener('keydown', this._handleEscCloseMethod)
  }

  // Закрытие попапа и удаление слушателя на Esc
  close() {
    this._popup.classList.remove(this._popupActiveClass);
    document.removeEventListener('keydown', this._handleEscCloseMethod)
  }
}