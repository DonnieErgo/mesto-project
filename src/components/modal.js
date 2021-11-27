import {deleteCardPopup, removeBtnListeners} from "./index.js";
import {approveDeleteCard} from "./cards";

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
  activePopup.classList.remove('popup_active');
  document.removeEventListener('keydown', closeOnEsc);
}

// Функция открытия модального окна с подтверждением удаления карточки
export function openCardDeletePopup(cardData, element) {
  openPopup(deleteCardPopup)
  document.querySelector('.popup__button-delete-card').addEventListener('click', () => approveDeleteCard(cardData, element))
}

// Функция закрытия модального окна удаления карточки с вызовом очистки от слушателей
export function closeDeleteCardPopup() {
  removeBtnListeners();
  deleteCardPopup.classList.remove('popup_active');
  document.removeEventListener('keydown', closeOnEsc);
}