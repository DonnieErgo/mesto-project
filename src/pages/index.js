import './index.css';

import { editButton, addButton, avatarButton, forms, nameInput, jobInput, profileAvatar, deletePopup, likeActiveClass, cardContainerSelector, validationConfig, popupConfig, userInfoConfig, cardTemplateConfig } from '../utils/constants.js';
import Api from '../components/Api.js';
import Card from '../components/Card.js';
import FormValidator from '../components/Validate.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithApprove from '../components/PopupWithApprove.js';


// Коллбэк обработки клика по лайку (для класса Card)
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

// Коллбэк обработки клика по корзине удаления (для класса Card)
function deleteCardSetup(evt) {
  deleteCardPopup.open()

  const card = evt.target.closest('.elements__element')
  const id = card.getAttribute('data-id')

  deletePopup.setAttribute('data-id', id)
}

// Коллбэк обработки клика по картинке (для класса Card)
function openCardPopup(cardData) {
  cardZoomPopup.open(cardData)
}

// Создания нового экземпляра класса Card
function getNewCardClass(cardData, userData) {
  return new Card({
    cardData: cardData,
    userData: userData,
    likeToggle: likeToggle,
    deleteCardSetup: deleteCardSetup,
    openCardPopup: openCardPopup,
  }, cardTemplateConfig)
}

// Создание экземпляра класса Api
const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-4',
  headers: {
    authorization: '959c9c28-048d-4fb8-b6da-ee5d034c5179',
    'Content-Type': 'application/json'
  }
});

// Создание экземпляра класса UserInfo
const userInfo = new UserInfo(userInfoConfig)

// Создание экземпляра класса PopupWithForm
const editProfilePopup = new PopupWithForm(popupConfig, '.edit-name', (valuesObject) => {
  api.patchProfile(valuesObject)
  .then(res => {
    userInfo.setUserInfo(res.name, res.about, res.avatar)
    userInfo.userData = res
    editProfilePopup.close()
  })
  .catch(err => console.log(err))
  .finally(() => setTimeout(() => {editProfilePopup.submitButton.textContent = 'Сохранить'}, 305))
})
// Навешиваем слушатели на форму
editProfilePopup.setEventListeners()

// Создание экземпляра класса PopupWithForm
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
        }, cardContainerSelector)
      defaultCardSection.renderItems()
      addCardPopup.close()
    })
    .catch(err => console.log(err))
    .finally(() => setTimeout(() => {addCardPopup.submitButton.textContent = 'Добавить'}, 305))
})
// Навешиваем слушатели на форму
addCardPopup.setEventListeners()

// Создание экземпляра класса PopupWithForm
const changeAvatarPopup = new PopupWithForm(popupConfig, '.change-avatar', (valuesObject) => {
  api.patchAvatar(valuesObject.avatar)
    .then(res => {
      profileAvatar.src = res.avatar
      changeAvatarPopup.close()
    })
    .catch(err => console.log(err))
    .finally(() => setTimeout(() => { changeAvatarPopup.submitButton.textContent = 'Сохранить' }, 305))
})
// Навешиваем слушатели на форму
changeAvatarPopup.setEventListeners()

// Создание экземпляра класса PopupWithImage
const cardZoomPopup = new PopupWithImage(popupConfig, '.card-zoom')
cardZoomPopup.setEventListeners()

// Создание экземпляра класса PopupWithApprove
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
// Навешиваем слушатели на кнопку удаления
deleteCardPopup.setEventListeners()

// Слушатель открытия модального окна Edit
editButton.addEventListener('click', () => {
  const userData = userInfo.getUserInfo();
  nameInput.value = userData.name;
  jobInput.value = userData.about;
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

// Создание экземпляров класса FormValidator и включения валидации
forms.forEach(form => {
  const formValidation = new FormValidator(validationConfig, form);
  formValidation.enableValidation()
})

// Запрашиваем и устонавливаем начальные данные
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