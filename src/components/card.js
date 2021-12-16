export default class Card {
  constructor({cardData, userData, likeToggle, deleteCardSetup, openCardPopup}, config) {
    this._cardData = cardData;
    this._userData = userData;
    this._likeToggle = likeToggle;
    this._deleteCardSetup = deleteCardSetup;
    this._openCardPopup = openCardPopup;
    this._config = config;
  }

  _getCardTemplate() {
    const elementTemplate = document
      .querySelector(this._config.cardTemplateSelector)
      .content
      .querySelector(this._config.cardSelector)
      .cloneNode(true)

    return elementTemplate
  }

  _likeButtonListener(evt) {
    this._likeToggle(evt, this._cardData, this._likeCounter)
  }

  _deleteButtonListener(evt) {
    this._deleteCardSetup(evt)
  }

  _zoomImageListener() {
    this._openCardPopup(this._cardData)
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', evt => this._likeButtonListener(evt))
    this._deleteButton.addEventListener('click', evt => this._deleteButtonListener(evt))
    this._cardImage.addEventListener('click', () => this._zoomImageListener())
  }

  _checkLikes() {
    if (this._cardData.likes.length > 0) this._likeCounter.textContent = this._cardData.likes.length;
    if (this._cardData.likes.some(el => el._id === this._userData._id)) this._likeButton.classList.add(this._config.activeLikeClass)
  }

  _checkCardOwner() {
    if (this._cardData.owner._id !== this._userData._id) {
      this._deleteButton.style.display = 'none';
    }
  }

  _setCardValues() {
    this._cardImage.src = this._cardData.link
    this._cardImage.alt = this._cardData.name
    this._cardName.textContent = this._cardData.name;
    this.card.setAttribute('data-id', this._cardData._id)
  }

  generateCard() {
    this.card = this._getCardTemplate()
    this._likeButton = this.card.querySelector(this._config.likeButtonSelector)
    this._likeCounter = this.card.querySelector(this._config.likeCounterSelector)
    this._deleteButton = this.card.querySelector(this._config.deleteButtonSelector)
    this._cardImage = this.card.querySelector(this._config.cardImageSelector)
    this._cardName = this.card.querySelector(this._config.cardNameSelector)

    this._setCardValues()
    this._checkCardOwner()
    this._checkLikes()
    this._setEventListeners()

    return this.card;
  }
}