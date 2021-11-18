import {openPopup} from "./modal.js";
import {} from "./index.js";

const popupZoom = document.querySelector('.card-zoom')
const cardContainer = document.querySelector('.elements')
const cardZoomImg = document.querySelector('.card-zoom .popup__img')
const cardZoomCaption = document.querySelector('.card-zoom .popup__caption')

// Функция создания карточками
export function createCard(cardData) {
  const addCardTemplate = document.querySelector('#element-template').content
  const element = addCardTemplate.querySelector('.elements__element').cloneNode(true);
  const elementImage = element.querySelector('.elements__image')

  elementImage.src = cardData.link;
  elementImage.alt = cardData.name;
  element.querySelector('.elements__header').textContent = cardData.name;

  element.querySelector('.elements__like-button').addEventListener('click', likeButtonToggle)
  element.querySelector('.elements__delete-button').addEventListener('click', deleteButtonToggle)

  element.querySelector('.elements__image').addEventListener('click', () => openCardPopup(cardData.link, cardData.name));

  return element
}

// Функция добавления новой карточки на страницу
export function addCard (element) {
  cardContainer.prepend(element)
}

// Функция кнопки like
function likeButtonToggle (e) {
  e.target.classList.toggle('elements__like-button_active')
}

// Функция кнопки delete
function deleteButtonToggle (e) {
  e.target.closest('.elements__element').remove()
}

// Создание модального окна с картинкой
function openCardPopup (cardUrl, cardCaption){
  cardZoomImg.src = cardUrl;
  cardZoomImg.alt = cardCaption;
  cardZoomCaption.textContent = cardCaption;
  openPopup(popupZoom)
}