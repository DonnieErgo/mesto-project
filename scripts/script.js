const editButton = document.querySelector('.profile__edit-button')
const addButton = document.querySelector('.profile__add-button')
const closeButtons = document.querySelectorAll('.popup__close-button')
const popupEdit = document.querySelector('.edit-name')
const popupAdd = document.querySelector('.add-card')
const popupZoom = document.querySelector('.card-zoom')
const editForm = document.querySelector('.edit-form')
const addForm = document.querySelector('.add-form')
const popups = document.querySelectorAll('.popup')

// Слушатель с закрытием модальных окон по клику на крестик
closeButtons.forEach (el => el.addEventListener('click', closePopup));

// Функция открытия модального окна
function openPopup(popupElement) {
  popupElement.classList.add('popup_active');
  document.addEventListener('keydown', closeOnEsc);
}

// Функция закрытия модального окна
function closePopup() {
  popups.forEach(el => el.classList.remove('popup_active'));
  document.removeEventListener('keydown', closeOnEsc);
}

// Функция закрытия модального окна при нажатии "Escape"
function closeOnEsc(e) {
  if (e.key === 'Escape') closePopup();
}

// Слушатель и функция закрытия модальных окон при клике вне окна
popups.forEach(el => el.addEventListener('click', function (e) {
  if (e.target.classList.contains('popup_active')) closePopup();
  e.stopPropagation();
}))

// Слушатель открытия модального окна Edit
editButton.addEventListener('click', () => openPopup(popupEdit))

// Слушатель открытия модального окна Add
addButton.addEventListener('click', () => openPopup(popupAdd))

// Обработчик "отправки" формы Edit
function editFormSubmit (e) {
  e.preventDefault();
  const name = editForm.querySelector('.input-name').value
  const job = editForm.querySelector('.input-title').value
  const profileName = document.querySelector('.profile__name')
  const profileJobTitle = document.querySelector('.profile__job-title')
  profileName.textContent = name
  profileJobTitle.textContent = job
  closePopup()
}

// Слушатель "отправки" формы Edit
editForm.addEventListener('submit', editFormSubmit);

// Обработчик "отправки" формы Add
function addFormSubmit(e) {
  e.preventDefault();

  const cardData = {
    name: document.querySelector('.input-imgname').value,
    link: document.querySelector('.input-link').value
  }

  // Собираем карточку с данными из инпутов
  const card = createCard(cardData)

  // Добавляем карточку на страницу
  addCard(card)

  addForm.reset()
  closePopup()
}

// Функция добавления новой карточки на страницу
function addCard (element) {
  const cardContainer = document.querySelector('.elements')
  cardContainer.prepend(element)
}

// Функция создания карточками
function createCard(cardData) {
  const addCardTemplate = document.querySelector('#element-template').content
  const element = addCardTemplate.querySelector('.elements__element').cloneNode(true);
  element.querySelector('.elements__image').src = cardData.link;
  element.querySelector('.elements__image').alt = cardData.name;
  element.querySelector('.elements__header').textContent = cardData.name;

  element.querySelector('.elements__like-button').addEventListener('click', likeButtonToggle)
  element.querySelector('.elements__delete-button').addEventListener('click', deleteButtonToggle)

  return element
}

// Функция кнопки like
function likeButtonToggle (e) {
    e.target.classList.toggle('elements__like-button_active')
}

// Функция кнопки delete
function deleteButtonToggle (e) {
    e.target.closest('.elements__element').remove()
}

// Функция открытия модального окна с картинкой
function handleCardImageClick (e) {
  const target = e.target
  if (target.closest('.elements__image')) {
    openCardPopup(target.src, target.alt)
  }
}

// Слушатель отправки формы Add
addForm.addEventListener('submit', addFormSubmit)

// Добавление дефолтных карточек при открытии страницы
initialCards.forEach((item) => {
  const initialCard = createCard(item)
  addCard(initialCard);
})

// Создание модального окна с картинкой
function openCardPopup (cardUrl, cardCaption){
  const cardZoom = document.querySelector('.card-zoom')
  cardZoom.querySelector('.popup__img').src = cardUrl;
  cardZoom.querySelector('.popup__img').alt = cardCaption;
  cardZoom.querySelector('.popup__caption').textContent = cardCaption;
  openPopup(popupZoom)
}

// Слушатель открытия модального окна с увеличенной картинкой
document.querySelector('.elements').addEventListener('click', handleCardImageClick)