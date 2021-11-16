import '../pages/index.css';
import {enableValidation} from './validate.js';
import {addFormSubmit, handleCardImageClick} from "./cards.js";
import {editFormSubmit, openPopup} from "./modal.js";

export const editForm = document.querySelector('.edit-form')
export const addForm = document.querySelector('.add-form')
const popupEdit = document.querySelector('.edit-name')
const popupAdd = document.querySelector('.add-card')
const editButton = document.querySelector('.profile__edit-button')
const addButton = document.querySelector('.profile__add-button')
const elements = document.querySelector('.elements');

// Слушатель "отправки" формы Edit
editForm.addEventListener('submit', editFormSubmit);

// Слушатель отправки формы Add
addForm.addEventListener('submit', addFormSubmit)

// Слушатель открытия модального окна с увеличенной картинкой
elements.addEventListener('click', handleCardImageClick)

// Слушатель открытия модального окна Edit
editButton.addEventListener('click', () => openPopup(popupEdit))

// Слушатель открытия модального окна Add
addButton.addEventListener('click', () => openPopup(popupAdd))

// Активируем валидацию
enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__form-input',
  submitButtonSelector: '.popup__button-save',
  inputErrorClass: 'popup__form-input_error',
  errorClass: 'popup__error_visible'
});