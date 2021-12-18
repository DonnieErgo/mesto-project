import '../pages/index.css';
// import {enableValidation, resetValidation} from './validate.js';
// import {openPopup, closePopup} from "./modal.js";
// import {getProfileData, getCardData, sendProfileData, sendCardData, changeAvatar, sendDeleteCard} from "./api.js";
import Api from "./api.js";
import Card from "./card.js";
import FormValidator from "./validate.js";
import Section from "./section.js";
import UserInfo from "./userinfo.js";
import { PopupWithImage, PopupWithForm, PopupWithApprove } from './popup.js';

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

const deletePopup = document.querySelector('.delete-card')
const deleteCardPopupButton = document.querySelector('.popup__button-delete-card')

const closeButtons = document.querySelectorAll('.popup__close-button')
const popups = document.querySelectorAll('.popup')
const likeActiveClass = 'elements__like-button_active'
const popupZoom = document.querySelector('.card-zoom')
const cardZoomImg = popupZoom.querySelector('.popup__img')
const cardZoomCaption = popupZoom.querySelector('.popup__caption')

const forms = document.querySelectorAll('.popup__form');

const cardContainerSelector = '.elements';

const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__form-input',
    submitButtonSelector: '.popup__button-save',
    inputErrorClass: 'popup__form-input_error',
    errorClass: 'popup__error_visible'
}

let user;

const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-4',
  headers: {
    authorization: '959c9c28-048d-4fb8-b6da-ee5d034c5179',
    'Content-Type': 'application/json'
  }
});

const popupConfig = {
  popupActiveClass: 'popup_active',
  closeButtonSelector: '.popup__close-button',
  cardZoomImgSelector: '.popup__img',
  cardZoomCaptionSelector: '.popup__caption',
  formSelector: '.popup__form',
  inputSelector: '.popup__form-input',
  submitButtonSelector: '.popup__button-save'
}

const userInfoConfig = {
  userNameSelector: '.profile__name',
  userAboutSelector: '.profile__job-title',
  userAvatarSelector: '.profile__avatar'
}

const userInfo = new UserInfo(userInfoConfig)

const editProfilePopup = new PopupWithForm(popupConfig, '.edit-name', (valuesObject) => {
  api.patchProfile(valuesObject)
  .then(res => {
    userInfo.setUserInfo(res.name, res.about, res.avatar)
    editProfilePopup.close()
  })
  .catch(err => console.log(err))
  .finally(() => setTimeout(() => {editProfilePopup.submitButton.textContent = 'Сохранить'}, 305))
})
editProfilePopup.setEventListeners()

const addCardPopup = new PopupWithForm(popupConfig, '.add-card', (valuesObject) => {
  api.postNewCard(valuesObject)
    .then(res => {
      const defaultCardSection = new Section(
        {
          items: res,
          renderer: item => {
            const cardItem = getNewCardClass(item, userInfo.userData)
            const card = cardItem.generateCard()
            defaultCardSection.addItem(card)
          }
        },
        cardContainerSelector)
      defaultCardSection.renderItems()
      addForm.reset()
      addCardPopup.close()
    })
    .catch(err => console.log(err))
    .finally(() => setTimeout(() => {addCardPopup.submitButton.textContent = 'Добавить'}, 305))
})
addCardPopup.setEventListeners()

const changeAvatarPopup = new PopupWithForm(popupConfig, '.change-avatar', (valuesObject) => {
  api.patchAvatar(valuesObject.avatar)
    .then(res => {
      profileAvatar.src = res.avatar
      avatarForm.reset()
      changeAvatarPopup.close()
    })
    .catch(err => console.log(err))
    .finally(() => setTimeout(() => { changeAvatarPopup.submitButton.textContent = 'Сохранить' }, 305))
})
changeAvatarPopup.setEventListeners()

const cardZoomPopup = new PopupWithImage(popupConfig, '.card-zoom')
cardZoomPopup.setEventListeners()

const deleteCardPopup = new PopupWithApprove(popupConfig, '.delete-card', () => {
  const id = deletePopup.getAttribute('data-id')
  const card = document.querySelector(`[data-id='${id}']`)
  deleteCardPopup.submitButton.textContent = 'Сохраняем...'

  api.deleteCard(id)
    .then(() => {
      card.remove()
      deleteCardPopup.close()
    })
    .catch(err => console.log(err))
    .finally(() => setTimeout(() => { deleteCardPopup.submitButton.textContent = 'Да' }, 305))
})
deleteCardPopup.setEventListeners()

function likeToggle(evt, cardData, likeCounter) {
  const id = cardData._id

  if (evt.target.classList.contains(likeActiveClass)) {
    api.deleteCardLike(id)
      .then(res => {
        evt.target.classList.remove(likeActiveClass)
        if (res.likes.length > 0) likeCounter.textContent = res.likes.length
        else likeCounter.textContent = ''
      })
  } else {
    api.putCardLike(id)
      .then(res => {
        likeCounter.textContent = res.likes.length
        evt.target.classList.add(likeActiveClass)
      })
      .catch(err => console.log(err))
  }
}

function deleteCardSetup(evt) {
  deleteCardPopup.open()

  const card = evt.target.closest('.elements__element')
  const id = card.getAttribute('data-id')

  deletePopup.setAttribute('data-id', id)
}

function openCardPopup(cardData) {
  cardZoomPopup.open(cardData)
}

function getNewCardClass(cardData, userData) {
  return new Card({
    cardData: cardData,
    userData: userData,
    likeToggle: likeToggle,
    deleteCardSetup: deleteCardSetup,
    openCardPopup: openCardPopup,
  },
  {
    cardTemplateSelector: '#element-template',
    cardSelector: '.elements__element',
    likeButtonSelector: '.elements__like-button',
    likeCounterSelector: '.elements__like-counter',
    deleteButtonSelector: '.elements__delete-button',
    cardImageSelector: '.elements__image',
    cardNameSelector: '.elements__header',
    activeLikeClass: 'elements__like-button_active',
  })
}

// api.getInitialCards().then(() => {api.getInitialProfile().then{getInitialCards.resolve(cards) else reject}}.then())



// Запрашиваем данные
Promise.all([api.getInitialCards(), api.getInitialProfile()])
  .then(([cards, userData]) => {
    userInfo.userData = userData
    const defaultCardSection = new Section(
      {
        items: cards.reverse(),
        renderer: item => {
          const cardItem = getNewCardClass(item, userInfo.userData)
          const card = cardItem.generateCard()
          defaultCardSection.addItem(card)
        }
      }, cardContainerSelector)
    defaultCardSection.renderItems()
    userInfo.setUserInfo(userInfo.userData.name, userInfo.userData.about, userInfo.userData.avatar)
  })
  .catch(err => console.log(err))

// Наполняем профиль актуальными данными
function addProfileData(name, about, avatar) {
  profileName.textContent = name
  profileJobTitle.textContent = about
  profileAvatar.src = avatar
}

// Обработчик отправки формы Edit
// function editFormSubmit(e) {
//   e.preventDefault()
//   editSaveButton.textContent = 'Сохраняем...'

//   const data = {
//     name: nameInput.value,
//     about: jobInput.value
//   }

//   api.patchProfile(data)
//     .then(res => {
//       addProfileData(res.name, res.about, res.avatar)
//       editProfilePopup.close()
//     })
//     .catch(err => console.log(err))
//     .finally(() => editSaveButton.textContent = 'Сохранить')
// }

// Обработчик отправки формы Add
// function addFormSubmit(e) {
//   e.preventDefault()
//   addSaveButton.textContent = 'Добавляем...'

//   const cardData = {
//     name: imgNameInput.value,
//     link: linkInput.value
//   }

//   api.postNewCard(cardData)
//     .then(res => {
//       const defaultCardSection = new Section(
//         {
//           items: res,
//           renderer: item => {
//             const cardItem = getNewCardClass(item, user)
//             const card = cardItem.generateCard()
//             defaultCardSection.addItem(card)
//           }
//         },
//         cardContainerSelector)
//       defaultCardSection.renderItems()
//       addForm.reset()
//       addCardPopup.close()
//     })
//     .catch(err => console.log(err))
//     .finally(() => addSaveButton.textContent = 'Добавить')
// }

// Обработчик "отправки" формы Change
// function avatarFormSubmit(e) {
//   e.preventDefault()
//   avatarSaveButton.textContent = 'Сохранение...'

//   api.patchAvatar(avatarInput.value)
//     .then(res => {
//       profileAvatar.src = res.avatar
//       avatarForm.reset()
//       changeAvatarPopup.close()
//     })
//     .catch(err => console.log(err))
//     .finally(() => avatarSaveButton.textContent = 'Сохранить')
// }

// Функция отправки удаления карточки после подтверждения
// function deleteCardApproved() {
//   const id = deletePopup.getAttribute('data-id')
//   const card = document.querySelector(`[data-id='${id}']`)

//   api.deleteCard(id)
//     .then(() => {
//       card.remove()
//       deleteCardPopup.close()
//     })
//     .catch(err => console.log(err))
// }

// Слушатель отправки формы Edit
// editForm.addEventListener('submit', editFormSubmit);

// Слушатель отправки формы Add
// addForm.addEventListener('submit', addFormSubmit)

// Слушатель отправки формы Change
// avatarForm.addEventListener('submit', avatarFormSubmit)

// Слушатель подтверждени удаления карточки
// deleteCardPopupButton.addEventListener('click', deleteCardApproved)

// Слушатель открытия модального окна Edit
editButton.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJobTitle.textContent;
  editProfilePopup.open()
})

// Слушатель открытия модального окна Add
addButton.addEventListener('click', () => {
  addCardPopup.open()
})

// Слушатель открытия модального окна Change Avatar
avatarButton.addEventListener('click', () => {
  changeAvatarPopup.open()
})

forms.forEach(form => {
  const formValidation = new FormValidator(validationConfig, form);
  formValidation.enableValidation()
})