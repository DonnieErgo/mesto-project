const editButton = document.querySelector('.profile__edit-button')
const addButton = document.querySelector('.profile__add-button')
const closeButton = document.querySelectorAll('.popup__close-button')
const popupEdit = document.querySelector('.edit-name')
const popupAdd = document.querySelector('.add-card')
const popupZoom = document.querySelector('.zoom-card')
const editForm = document.querySelector('.edit-form')
const nameInput = document.querySelector('.input-name')
const jobInput = document.querySelector('.input-job')
const addForm = document.querySelector('.add-form')
const cardContainer = document.querySelector('.elements')


// Закрываем попапы по клику на крестик
closeButton.forEach (function(item) {
  item.addEventListener('click', function(e) {
    const parentModal = this.closest('.popup');
    parentModal.classList.remove('popup_active');
  });
});

// Функция открытия попапа
function openPopup(popupElement) {
  popupElement.classList.add('popup_active');
}

// Функция закрытия попапа
function closePopup (popupName) {
  popupName.classList.remove("popup_active");
}

// Открываем попап Edit
editButton.addEventListener('click', () => openPopup(popupEdit))

// Открываем попап Add
addButton.addEventListener('click', () => openPopup(popupAdd))

// Обработчик отправки формы Edit
function editFormSubmit (evt) {
  evt.preventDefault();
  const name = editForm.querySelector('.input-name').value
  const job = editForm.querySelector('.input-title').value
  const profileName = document.querySelector('.profile__name')
  const profileJobTitle = document.querySelector('.profile__job-title')
  profileName.textContent = name
  profileJobTitle.textContent = job
  closePopup(popupEdit)
}

// Слушатель отправки формы Edit
editForm.addEventListener('submit', editFormSubmit);

// Массив с дефолтными карточками
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
  ];

// Обработчик «отправки» формы Add
function addFormSubmit (evt) {
  evt.preventDefault();
  const cardName = addForm.querySelector('.input-imgname')
  const cardSrc = addForm.querySelector('.input-link')

  createElement(cardName.value, cardSrc.value)

  evt.target.reset();
  closePopup(popupAdd)
}

// Создание новой карточки
function createElement (elementInfo, elementSrc) {
  const addCardTemplate = document.querySelector('#element-template').content
  const element = addCardTemplate.querySelector('.elements__element').cloneNode(true);

  element.querySelector('.elements__image').src = elementSrc;
  element.querySelector('.elements__image').alt = elementInfo;
  element.querySelector('.elements__header').textContent = elementInfo;

  // Добавление слушателей кнопок like/delete
  element.querySelector('.elements__like-button').addEventListener('click', likeButtonToggle)
  element.querySelector('.elements__delete-button').addEventListener('click', deleteButtonToggle)

  // Добавляем новую карточку в начало списка
  cardContainer.prepend(element)
}

// Функция кнопки like
function likeButtonToggle (event) {
    event.target.classList.toggle('elements__like-button_active')
}

// Функция кнопки delete
function deleteButtonToggle (event) {
    event.target.closest('.elements__element').remove()
}

// Слушатель отправки формы Add
addForm.addEventListener('submit', addFormSubmit);

