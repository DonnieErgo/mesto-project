export class Popup {
  constructor(config, popupSelector) {
    this._popupActiveClass = config.popupActiveClass;

    this._popup = document.querySelector(popupSelector)
    this._closeButton = this._popup.querySelector(config.closeButtonSelector)
    this._handleClickCloseButtonMethod = this._handleClickCloseButton.bind(this)
    this._closeOnOverlayClickMethod = this._closeOnOverlayClick.bind(this)
    this._handleEscCloseMethod = this._handleEscClose.bind(this)
  }

  _handleClickCloseButton() {
    this.close();
  }

  _closeOnOverlayClick(evt) {
    if (evt.target.classList.contains('popup_active')) this.close();
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') this.close();
  }

  _setEventListeners() {
    document.addEventListener('keydown', this._handleEscCloseMethod)
    this._popup.addEventListener('click', this._closeOnOverlayClickMethod)
    this._closeButton.addEventListener('click', this._handleClickCloseButtonMethod)
  }

  _removeEventListeners() {
    document.removeEventListener('keydown', this._handleEscCloseMethod)
    this._popup.removeEventListener('click', this._closeOnOverlayClickMethod)
    this._closeButton.removeEventListener('click', this._handleClickCloseButtonMethod)
  }

  open() {
    this._popup.classList.add(this._popupActiveClass);
    this._setEventListeners();
  }

  close() {
    this._popup.classList.remove(this._popupActiveClass);
    this._removeEventListeners();
  }
}

export class PopupWithImage extends Popup {
  constructor(config, popupSelector) {
    super(config, popupSelector);
    this._cardZoomImg = document.querySelector(config.cardZoomImgSelector);
    this._cardZoomCaption = document.querySelector(config.cardZoomCaptionSelector);
  }

  open(cardData) {
    this._cardZoomImg.src = cardData.link;
    this._cardZoomImg.alt = cardData.name;
    this._cardZoomCaption.textContent = cardData.name;
    super.open()
  }
}