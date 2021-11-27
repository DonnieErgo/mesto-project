import {approveDeleteCard, removeBtnListeners} from "./index.js";

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
  const activePopup = document.querySelector('.popup_active')

  if (activePopup.classList.contains('delete-card')) removeBtnListeners();

  activePopup.classList.remove('popup_active');
  document.removeEventListener('keydown', closeOnEsc);
}

// Функция открытия модального окна с подтверждением удаления карточки
export function openCardDeletePopup(cardData, element) {
  openPopup(document.querySelector('.delete-card'))
  document.addEventListener('keydown', closeOnEsc)
  document.querySelector('.popup__button-delete-card').addEventListener('click', () => approveDeleteCard(cardData, element))
}