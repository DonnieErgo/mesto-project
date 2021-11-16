import {initialCards} from "./initial-cards.js";
import {closePopup, openPopup} from "./modal.js";

const popupZoom = document.querySelector('.card-zoom')

// Обработчик "отправки" формы Add
export function addFormSubmit(e) {
  e.preventDefault();

  const cardData = {
    name: document.querySelector('.input-imgname').value,
    link: document.querySelector('.input-link').value
  }

  // Собираем карточку с данными из инпутов
  const card = createCard(cardData)

  // Добавляем карточку на страницу
  addCard(card)

  closePopup()
}

// Функция добавления новой карточки на страницу
function addCard (element) {
  const cardContainer = document.querySelector('.elements')
  cardContainer.prepend(element)
}

// Функция создания карточками
function createCard(cardData) {
  const addCardTemplate = document.querySelector('#element-template').content
  const element = addCardTemplate.querySelector('.elements__element').cloneNode(true);
  element.querySelector('.elements__image').src = cardData.link;
  element.querySelector('.elements__image').alt = cardData.name;
  element.querySelector('.elements__header').textContent = cardData.name;

  element.querySelector('.elements__like-button').addEventListener('click', likeButtonToggle)
  element.querySelector('.elements__delete-button').addEventListener('click', deleteButtonToggle)

  return element
}

// Функция кнопки like
function likeButtonToggle (e) {
  e.target.classList.toggle('elements__like-button_active')
}

// Функция кнопки delete
function deleteButtonToggle (e) {
  e.target.closest('.elements__element').remove()
}

// Добавление дефолтных карточек при открытии страницы
initialCards.forEach((item) => {
  const initialCard = createCard(item)
  addCard(initialCard);
})

// Создание модального окна с картинкой
function openCardPopup (cardUrl, cardCaption){
  const cardZoom = document.querySelector('.card-zoom')
  cardZoom.querySelector('.popup__img').src = cardUrl;
  cardZoom.querySelector('.popup__img').alt = cardCaption;
  cardZoom.querySelector('.popup__caption').textContent = cardCaption;
  openPopup(popupZoom)
}

// Функция открытия модального окна с картинкой
export function handleCardImageClick (e) {
  const target = e.target
  if (target.closest('.elements__image')) {
    openCardPopup(target.src, target.alt)
  }
}