import '../pages/index.css';
import {enableValidation, resetValidation} from './validate.js';
import {createCard} from "./cards.js";
import {openPopup, closePopup} from "./modal.js";
import {getProfileData, getCardData, sendProfileData, sendCardData, changeAvatar, sendDeleteCard} from "./api.js";

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

const avatarForm = document.querySelector('.change-avatar-form')
const avatarPopup = document.querySelector('.change-avatar')
const avatarButton = document.querySelector('.profile__avatar-btn')
const avatarInput = document.querySelector('.input-avatar')
const avatarSaveButton = document.querySelector('.popup__button-save-avatar')

const deleteCardPopup = document.querySelector('.delete-card')
const deleteCardPopupButton = document.querySelector('.popup__button-delete-card')

const closeButtons = document.querySelectorAll('.popup__close-button')
const popups = document.querySelectorAll('.popup')

const editInputList = Array.from(document.querySelectorAll('.edit-name .popup__form-input'))
const addInputList = Array.from(document.querySelectorAll('.add-card .popup__form-input'))
const avatarInputList = Array.from(document.querySelectorAll('.change-avatar .popup__form-input'))

const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__form-input',
    submitButtonSelector: '.popup__button-save',
    inputErrorClass: 'popup__form-input_error',
    errorClass: 'popup__error_visible'
}

let user;

// Запрашиваем данные
Promise.all([getCardData(), getProfileData()])
.then(([cards, userData]) => {
  cards.reverse().forEach(card => {
    addCard(createCard(card, userData))
  })
  addProfileData(userData.name, userData.about, userData.avatar);
  user = userData;
})
.catch(err => console.log(err))

// Наполняем профиль актуальными данными
function addProfileData(name, about, avatar) {
  profileName.textContent = name
  profileJobTitle.textContent = about
  profileAvatar.src = avatar
}

// Обработчик отправки формы Edit
function editFormSubmit(e) {
  e.preventDefault()
  editSaveButton.textContent = 'Сохраняем...'

  const data = {
    name: nameInput.value,
    about: jobInput.value
  }

  sendProfileData(data)
    .then(res => {
      addProfileData(res.name, res.about, res.avatar)
      closePopup()
    })
    .catch(err => console.log(err))
    .finally(() => editSaveButton.textContent = 'Сохранить')
}

// Обработчик отправки формы Add
function addFormSubmit(e) {
  e.preventDefault()
  addSaveButton.textContent = 'Добавляем...'

  const cardData = {
    name: imgNameInput.value,
    link: linkInput.value
  }

  sendCardData(cardData)
    .then(res => {
      addCard(createCard(res, user))
      addForm.reset()
      closePopup()
    })
    .catch(err => console.log(err))
    .finally(() => addSaveButton.textContent = 'Добавить')
}

// Обработчик "отправки" формы Change
function avatarFormSubmit(e) {
  e.preventDefault()
  avatarSaveButton.textContent = 'Сохранение...'

  changeAvatar(avatarInput.value)
    .then(res => {
      profileAvatar.src = res.avatar
      avatarForm.reset()
      closePopup()
    })
    .catch(err => console.log(err))
    .finally(() => avatarSaveButton.textContent = 'Сохранить')
}

// Обработчик нажатия на кнопку удаления карточки
export function setupDeleteCard(e) {
  openPopup(deleteCardPopup)

  const card = e.target.closest('.elements__element')
  const id = card.getAttribute('data-id')

  deleteCardPopup.setAttribute('data-id', id)
}

// Функция отправки удаления карточки после подтверждения
function deleteCardApproved() {
  const id = deleteCardPopup.getAttribute('data-id')
  const card = document.querySelector(`[data-id='${id}']`)

  sendDeleteCard(id)
    .then(() => {
      card.remove()
      closePopup()
    })
    .catch(err => console.log(err))
}

// Слушатель отправки формы Edit
editForm.addEventListener('submit', editFormSubmit);

// Слушатель отправки формы Add
addForm.addEventListener('submit', addFormSubmit)

// Слушатель отправки формы Change
avatarForm.addEventListener('submit', avatarFormSubmit)

// Слушатель подтверждени удаления карточки
deleteCardPopupButton.addEventListener('click', deleteCardApproved)

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

// Слушатель открытия модального окна Change Avatar
avatarButton.addEventListener('click', () => {
  resetValidation(avatarInputList, validationConfig, avatarForm)
  openPopup(avatarPopup)
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