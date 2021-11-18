import '../pages/index.css';
import {enableValidation, resetValidation} from './validate.js';
import {createCard, addCard} from "./cards.js";
import {openPopup, closePopup} from "./modal.js";
import {initialCards} from "./initial-cards.js";

const editForm = document.querySelector('.edit-form')
const addForm = document.querySelector('.add-form')
const popupEdit = document.querySelector('.edit-name')
const popupAdd = document.querySelector('.add-card')
const editButton = document.querySelector('.profile__edit-button')
const addButton = document.querySelector('.profile__add-button')
const name = editForm.querySelector('.input-name')
const job = editForm.querySelector('.input-title')
const profileName = document.querySelector('.profile__name')
const profileJobTitle = document.querySelector('.profile__job-title')
const closeButtons = document.querySelectorAll('.popup__close-button')
const popups = document.querySelectorAll('.popup')
const imgNameInput = document.querySelector('.input-imgname')
const linkInput = document.querySelector('.input-link')
const editInputList = Array.from(document.querySelectorAll('.edit-name .popup__form-input'))
const addInputList = Array.from(document.querySelectorAll('.add-card .popup__form-input'))
const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__form-input',
    submitButtonSelector: '.popup__button-save',
    inputErrorClass: 'popup__form-input_error',
    errorClass: 'popup__error_visible'
}

// Обработчик "отправки" формы Edit
function editFormSubmit (e) {
  e.preventDefault();
  profileName.textContent = name.value
  profileJobTitle.textContent = job.value

  editForm.reset()
  closePopup()
}

// Обработчик "отправки" формы Add
function addFormSubmit(e) {
  e.preventDefault();
  const cardData = {
    name: imgNameInput.value,
    link: linkInput.value
  }

  // Собираем карточку с данными из инпутов
  const card = createCard(cardData)

  // Добавляем карточку на страницу
  addCard(card)

  addForm.reset()
  closePopup()
}

// Слушатель "отправки" формы Edit
editForm.addEventListener('submit', editFormSubmit);

// Слушатель отправки формы Add
addForm.addEventListener('submit', addFormSubmit)

// Слушатель открытия модального окна Edit
editButton.addEventListener('click', () => {
  resetValidation(editInputList, validationConfig, editForm)
  openPopup(popupEdit)
})

// Слушатель открытия модального окна Add
addButton.addEventListener('click', () => {
  resetValidation(addInputList, validationConfig, addForm)
  openPopup(popupAdd)
})

// Слушатель с закрытием модальных окон по клику на крестик
closeButtons.forEach (el => el.addEventListener('click', closePopup));

// Слушатель и функция закрытия модальных окон при клике вне окна
popups.forEach(el => el.addEventListener('click',(e) => {
  if (e.target.classList.contains('popup_active')) closePopup();
}))

// Добавление дефолтных карточек при открытии страницы
initialCards.forEach((item) => {
  const initialCard = createCard(item)
  addCard(initialCard);
})

// Активируем валидацию
enableValidation(validationConfig);