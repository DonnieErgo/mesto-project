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
  document.querySelector('.popup_active').classList.remove('popup_active');
  document.removeEventListener('keydown', closeOnEsc);
}