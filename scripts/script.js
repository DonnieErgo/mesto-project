const editButton = document.querySelector('.profile__edit-button')
const addButton = document.querySelector('.profile__add-button')
const closeButton = document.querySelectorAll('.popup__close-button')
const popupEdit = document.querySelector('.edit-name')
const popupAdd = document.querySelector('.add-card')
const popupZoom = document.querySelector('.card-zoom')
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
function editFormSubmit (e) {
  e.preventDefault();
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
    name: 'Пушишка',
    link: 'https://images.unsplash.com/photo-1548247416-ec66f4900b2e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8Y2F0fGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
  {
    name: 'Бабочка на носике',
    link: 'https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
  },
  {
    name: 'Сонный кот',
    link: 'https://images.unsplash.com/photo-1511044568932-338cba0ad803?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1100&q=80'
  },
  {
    name: 'Мау?',
    link: 'https://images.unsplash.com/photo-1520315342629-6ea920342047?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Котик',
    link: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Не покормили',
    link: 'https://images.unsplash.com/photo-1501820488136-72669149e0d4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1100&q=80'
  }
  ];

// Обработчик «отправки» формы Add
function addFormSubmit(e) {
  e.preventDefault();
  const cardName = addForm.querySelector('.input-imgname')
  const cardSrc = addForm.querySelector('.input-link')

  createElement(cardName.value, cardSrc.value)

  e.target.reset();
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
function likeButtonToggle (e) {
    e.target.classList.toggle('elements__like-button_active')
}

// Функция кнопки delete
function deleteButtonToggle (e) {
    e.target.closest('.elements__element').remove()
}

// Слушатель отправки формы Add
addForm.addEventListener('submit', addFormSubmit)

// Добавляем дефолтные карточки
initialCards.forEach(function(item) {
  const initialCardsName = item.name
  const initialCardsLink = item.link
  createElement(initialCardsName, initialCardsLink);
})