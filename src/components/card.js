import {openPopup} from "./modal.js";
import {setupDeleteCard, api} from "./index.js";
// import {deleteCardLike, addCardLike} from "./api.js";

export default class Card {
  constructor({cardData, userData, likeToggle, deleteCardSetup, openCardPopup}, templateSelector) {
    this._cardData = JSON.parse(cardData);
    this._userData = JSON.parse(userData);
    this._templateSelector = templateSelector;
    this._likeToggle = likeToggle;
    this._deleteCardSetup = deleteCardSetup;
    this._openCardPopup = openCardPopup;
  }

  _getCardTemplate() {
    const elementTemplate = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.elements__element')
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
    if (this._cardData.likes.some(el => el._id === this._userData._id)) this._likeButton.classList.add('elements__like-button_active')
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
    this._likeButton = this.card.querySelector('.elements__like-button')
    this._likeCounter = this.card.querySelector('.elements__like-counter')
    this._deleteButton = this.card.querySelector('.elements__delete-button')
    this._cardImage = this.card.querySelector('.elements__image')
    this._cardName = this.card.querySelector('.elements__header')

    this._setCardValues()
    this._checkCardOwner()
    this._checkLikes()
    this._setEventListeners()

    return this.card;
  }
}

// // Функция создания карточками
// export function createCard (cardData, userData) {
//   const addCardTemplate = document.querySelector('#element-template').content
//   const element = addCardTemplate.querySelector('.elements__element').cloneNode(true)
//   const elementImage = element.querySelector('.elements__image')
//   const deleteButton = element.querySelector('.elements__delete-button')
//   const likeButton = element.querySelector('.elements__like-button')
//   const likeCounter = element.querySelector('.elements__like-counter')

//   elementImage.src = cardData.link;
//   elementImage.alt = cardData.name;
//   element.querySelector('.elements__header').textContent = cardData.name;
//   element.setAttribute('data-id', cardData._id)

//   deleteButtonOwner(cardData, userData, deleteButton)

//   if (cardData.likes.length > 0) likeCounter.textContent = cardData.likes.length;
//   if (cardData.likes.some(el => el._id === userData._id)) likeButton.classList.add('elements__like-button_active')

//   likeButton.addEventListener('click', (evt) => likeToggle(evt, cardData, likeCounter))
//   deleteButton.addEventListener('click', (evt) => setupDeleteCard(evt))
//   elementImage.addEventListener('click', () => openCardPopup(cardData))

//   return element
// }

// // Функция кнопки like
// function likeToggle (evt, cardData, likeCounter) {
//   const id = cardData._id
//   const activeClass = 'elements__like-button_active'

//   if (evt.target.classList.contains(activeClass)) {
//     api.deleteCardLike(id)
//       .then(res => {
//         evt.target.classList.remove(activeClass)
//         if (res.likes.length > 0) likeCounter.textContent = res.likes.length
//         else likeCounter.textContent = ''
//       })

//   } else {
//     api.putCardLike(id)
//       .then(res => {
//         likeCounter.textContent = res.likes.length
//         evt.target.classList.add(activeClass)
//       })
//       .catch(err => console.log(err))
//   }
// }

// // Проверка на овнера карточки
// function deleteButtonOwner (card, userData, deleteButton) {
//   if (card.owner._id !== userData._id) {
//     deleteButton.style.display = 'none';
//   }
// }

// Создание модального окна с картинкой
// function openCardPopup (cardData) {
//   const popupZoom = document.querySelector('.card-zoom')
//   const cardZoomImg = document.querySelector('.card-zoom .popup__img')
//   const cardZoomCaption = document.querySelector('.card-zoom .popup__caption')

//   cardZoomImg.src = cardData.link;
//   cardZoomImg.alt = cardData.name;
//   cardZoomCaption.textContent = cardData.name;
//   openPopup(popupZoom)
// }