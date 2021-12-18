export const editButton = document.querySelector('.profile__edit-button')
export const addButton = document.querySelector('.profile__add-button')
export const avatarButton = document.querySelector('.profile__avatar-btn')
export const forms = document.querySelectorAll('.popup__form');
const editForm = document.querySelector('.edit-form')
export const nameInput = editForm.querySelector('.input-name')
export const jobInput = editForm.querySelector('.input-title')
export const profileAvatar = document.querySelector('.profile__avatar')
export const deletePopup = document.querySelector('.delete-card')
export const likeActiveClass = 'elements__like-button_active'
export const cardContainerSelector = '.elements';

export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__form-input',
  submitButtonSelector: '.popup__button-save',
  inputErrorClass: 'popup__form-input_error',
  errorClass: 'popup__error_visible'
}

export const popupConfig = {
  popupActiveClass: 'popup_active',
  closeButtonSelector: '.popup__close-button',
  cardZoomImgSelector: '.popup__img',
  cardZoomCaptionSelector: '.popup__caption',
  formSelector: '.popup__form',
  inputSelector: '.popup__form-input',
  submitButtonSelector: '.popup__button-save'
}

export const userInfoConfig = {
  userNameSelector: '.profile__name',
  userAboutSelector: '.profile__job-title',
  userAvatarSelector: '.profile__avatar'
}

export const cardTemplateConfig = {
  cardTemplateSelector: '#element-template',
  cardSelector: '.elements__element',
  likeButtonSelector: '.elements__like-button',
  likeCounterSelector: '.elements__like-counter',
  deleteButtonSelector: '.elements__delete-button',
  cardImageSelector: '.elements__image',
  cardNameSelector: '.elements__header',
  activeLikeClass: 'elements__like-button_active'
}
