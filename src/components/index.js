import '../pages/index.css';
import {enableValidation, resetValidation} from './validate.js';
import {createCard} from "./cards.js";
import {openPopup, closePopup} from "./modal.js";
import {getProfileData, getCardData, sendProfileData, sendCardData} from "./api.js";

const editForm = document.querySelector('.edit-form')
const popupEdit = document.querySelector('.edit-name')
const editButton = document.querySelector('.profile__edit-button')
const nameInput = editForm.querySelector('.input-name')
const jobInput = editForm.querySelector('.input-title')
const profileName = document.querySelector('.profile__name')
const profileJobTitle = document.querySelector('.profile__job-title')
const profileAvatar = document.querySelector('.profile__avatar')
const editSaveButton = document.querySelector('.popup__button-save-edit')

const addForm = document.querySelector('.add-form')
const popupAdd = document.querySelector('.add-card')
const addButton = document.querySelector('.profile__add-button')
const imgNameInput = addForm.querySelector('.input-imgname')
const linkInput = addForm.querySelector('.input-link')
const cardContainer = document.querySelector('.elements')
const addSaveButton = document.querySelector('.popup__button-save-add')

const closeButtons = document.querySelectorAll('.popup__close-button')
const popups = document.querySelectorAll('.popup')

const editInputList = Array.from(document.querySelectorAll('.edit-name .popup__form-input'))
const addInputList = Array.from(document.querySelectorAll('.add-card .popup__form-input'))

const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__form-input',
    submitButtonSelector: '.popup__button-save',
    inputErrorClass: 'popup__form-input_error',
    errorClass: 'popup__error_visible'
}

let user;

// Запрашиваем даннеые
Promise.all([getCardData(), getProfileData()])
.then(([cards, userData]) => {
  cards.forEach(card => {
    addCard(createCard(card, userData))
    addProfileData(userData.name, userData.about, userData.avatar);
    user = userData;
  })
})
.catch(err => console.log(err))

// Наполняем профиль актуальными данными
function addProfileData(name, about, avatar) {
  profileName.textContent = name
  profileJobTitle.textContent = about
  profileAvatar.src = avatar
}

// Обработчик "отправки" формы Edit
function editFormSubmit(e) {
  e.preventDefault();
  editSaveButton.textContent = 'Сохраняем...'

  const data = {
    name: nameInput.value,
    about: jobInput.value
  }

  sendProfileData(data)
    .then(res => addProfileData(res.name, res.about, res.avatar))
    .catch(err => console.log(err))
    .finally(() => editSaveButton.textContent = 'Сохранить')

  closePopup()
}

// Обработчик "отправки" формы Add
function addFormSubmit(e) {
  e.preventDefault();
  addSaveButton.textContent = 'Добавляем...'

  const cardData = {
    name: imgNameInput.value,
    link: linkInput.value
  }

  sendCardData(cardData)
    .then(res => {
      addCard(createCard(res, user))
      addForm.reset()
    })
    .catch(err => console.log(err))
    .finally(() => addSaveButton.textContent = 'Добавить')

  closePopup()
}

// Слушатель "отправки" формы Edit
editForm.addEventListener('submit', editFormSubmit);

// Слушатель отправки формы Add
addForm.addEventListener('submit', addFormSubmit)

// Слушатель открытия модального окна Edit
editButton.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJobTitle.textContent;
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

// Функция добавления новой карточки на страницу
function addCard (element) {
  cardContainer.prepend(element)
}

// Активируем валидацию
enableValidation(validationConfig);