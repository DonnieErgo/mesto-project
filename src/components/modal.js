import {editForm} from './index.js';

const closeButtons = document.querySelectorAll('.popup__close-button')
const popups = document.querySelectorAll('.popup')

// Обработчик "отправки" формы Edit
export function editFormSubmit (e) {
  e.preventDefault();
  const name = editForm.querySelector('.input-name').value
  const job = editForm.querySelector('.input-title').value
  const profileName = document.querySelector('.profile__name')
  const profileJobTitle = document.querySelector('.profile__job-title')
  profileName.textContent = name
  profileJobTitle.textContent = job

  closePopup()
}

// Функция открытия модального окна
export function openPopup(popupElement) {
  popupElement.classList.add('popup_active');
  document.addEventListener('keydown', closeOnEsc);
}

// Функция закрытия модального окна при нажатии "Escape"
function closeOnEsc(e) {
  if (e.key === 'Escape') closePopup();
}

// Функция закрытия модального окна
export function closePopup() {
  document.querySelector('.popup_active .popup__form').validate()
  document.querySelector('.popup_active').classList.remove('popup_active');
  document.removeEventListener('keydown', closeOnEsc);
}

// Слушатель с закрытием модальных окон по клику на крестик
closeButtons.forEach (el => el.addEventListener('click', closePopup));

// Слушатель и функция закрытия модальных окон при клике вне окна
popups.forEach(el => el.addEventListener('click', function (e) {
  if (e.target.classList.contains('popup_active')) closePopup();
  e.stopPropagation();
}))