import Popup from './Popup.js';

// Класс для зума картинок
export default class PopupWithImage extends Popup {
  constructor(config, popupSelector) {
    super(config, popupSelector)
    this._cardZoomImg = document.querySelector(config.cardZoomImgSelector)
    this._cardZoomCaption = document.querySelector(config.cardZoomCaptionSelector)
  }

  // Открытие зума
  open(cardData) {
    this._cardZoomImg.src = cardData.link
    this._cardZoomImg.alt = cardData.name
    this._cardZoomCaption.textContent = cardData.name
    super.open()
  }
}