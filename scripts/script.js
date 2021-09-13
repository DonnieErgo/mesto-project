const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const closeButton = document.querySelectorAll('.popup__close-button');

editButton.addEventListener('click', function () {
  document.querySelector('.edit-name').classList.toggle('popup_active');
  });

for (const button of closeButton) {
  button.addEventListener('click', () => {
    document.querySelector('.edit-name').classList.remove('popup_active');
  });
}

addButton.addEventListener('click', function () {
  document.querySelector('.add-card').classList.toggle('popup_active');
  });

for (const button of closeButton) {
  button.addEventListener('click', () => {
    document.querySelector('.add-card').classList.remove('popup_active');
  });
}