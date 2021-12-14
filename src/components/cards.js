import {openPopup} from "./modal.js";
import {setupDeleteCard, api} from "./index.js";
// import {deleteCardLike, addCardLike} from "./api.js";

const popupZoom = document.querySelector('.card-zoom')
const cardZoomImg = document.querySelector('.card-zoom .popup__img')
const cardZoomCaption = document.querySelector('.card-zoom .popup__caption')

// Функция создания карточками
export function createCard (cardData, userData) {
  const addCardTemplate = document.querySelector('#element-template').content
  const element = addCardTemplate.querySelector('.elements__element').cloneNode(true)
  const elementImage = element.querySelector('.elements__image')
  const deleteButton = element.querySelector('.elements__delete-button')
  const likeButton = element.querySelector('.elements__like-button')
  const likeCounter = element.querySelector('.elements__like-counter')

  elementImage.src = cardData.link;
  elementImage.alt = cardData.name;
  element.querySelector('.elements__header').textContent = cardData.name;
  element.setAttribute('data-id', cardData._id)

  deleteButtonOwner(cardData, userData, deleteButton)

  if (cardData.likes.length > 0) likeCounter.textContent = cardData.likes.length;
  if (cardData.likes.some(el => el._id === userData._id)) likeButton.classList.add('elements__like-button_active')

  likeButton.addEventListener('click', (evt) => likeToggle(evt, cardData, likeCounter))
  deleteButton.addEventListener('click', (evt) => setupDeleteCard(evt))
  elementImage.addEventListener('click', () => openCardPopup(cardData))

  return element
}

// Функция кнопки like
function likeToggle (evt, cardData, likeCounter) {
  const id = cardData._id
  const activeClass = 'elements__like-button_active'

  if (evt.target.classList.contains(activeClass)) {
    api.deleteCardLike(id)
      .then(res => {
        evt.target.classList.remove(activeClass)
        if (res.likes.length > 0) likeCounter.textContent = res.likes.length
        else likeCounter.textContent = ''
      })

  } else {
    api.putCardLike(id)
      .then(res => {
        likeCounter.textContent = res.likes.length
        evt.target.classList.add(activeClass)
      })
      .catch(err => console.log(err))
  }
}

// Создание модального окна с картинкой
function openCardPopup (cardData) {
  cardZoomImg.src = cardData.link;
  cardZoomImg.alt = cardData.name;
  cardZoomCaption.textContent = cardData.name;
  openPopup(popupZoom)
}

// Проверка на овнера карточки
function deleteButtonOwner (card, userData, deleteButton) {
  if (card.owner._id !== userData._id) {
    deleteButton.style.display = 'none';
  }
}