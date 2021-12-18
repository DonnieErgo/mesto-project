export class Popup {
  constructor(config, popupSelector) {
    this._popupActiveClass = config.popupActiveClass;

    this._popup = document.querySelector(popupSelector)
    this._closeButton = this._popup.querySelector(config.closeButtonSelector)
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

  setEventListeners() {
    this._popup.addEventListener('click', this._closeOnOverlayClick.bind(this))
    this._closeButton.addEventListener('click', this._handleClickCloseButton.bind(this))
  }

  open() {
    this._popup.classList.add(this._popupActiveClass);
    document.addEventListener('keydown', this._handleEscCloseMethod)
  }

  close() {
    this._popup.classList.remove(this._popupActiveClass);
    document.removeEventListener('keydown', this._handleEscCloseMethod)
  }
}

export class PopupWithImage extends Popup {
  constructor(config, popupSelector) {
    super(config, popupSelector)
    this._cardZoomImg = document.querySelector(config.cardZoomImgSelector)
    this._cardZoomCaption = document.querySelector(config.cardZoomCaptionSelector)
  }

  open(cardData) {
    this._cardZoomImg.src = cardData.link
    this._cardZoomImg.alt = cardData.name
    this._cardZoomCaption.textContent = cardData.name
    super.open()
  }
}

export class PopupWithForm extends Popup {
  constructor(config, popupSelector, submitForm) {
    super(config, popupSelector)
    this._popupForm = this._popup.querySelector(config.formSelector)
    this._popupInputs = this._popupForm.querySelectorAll(config.inputSelector)
    this.submitButton = this._popupForm.querySelector(config.submitButtonSelector)
    this._submitForm = submitForm
  }

  _getInputValues() {
    const valuesObject = {}
    this._popupInputs.forEach(input => {
      valuesObject[input.name] = input.value
    })
    return valuesObject
  }

  setEventListeners() {
    super.setEventListeners()
    this._popupForm.addEventListener('submit', evt => {
      evt.preventDefault()
      this.submitButton.textContent = 'Сохраняем...'
      this._submitForm(this._getInputValues())
    })
  }

  close() {
    super.close()
    this._popupForm.reset()
  }
}

export class PopupWithApprove extends Popup {
  constructor(config, popupSelector, approveHandler) {
    super(config, popupSelector)
    this._approveHandler = approveHandler;
    this.submitButton = this._popup.querySelector(config.submitButtonSelector)
  }

  setEventListeners() {
    super.setEventListeners()
    this.submitButton.addEventListener('click', this._approveHandler)
  }
}