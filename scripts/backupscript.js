// Обработчик «отправки» формы Add
function addFormSubmit (evt) {
  evt.preventDefault();
  const cardName = addForm.querySelector('.input-imgname').value
  const cardSrc = addForm.querySelector('.input-link').value

  profileName.src = cardName
  profileJobTitle.textContent = cardSrc

  closePopup(popupAdd)
}

// Создания новой карточки
function createElement (elementInfo) {
  const addCardTemplate = document.querySelector('#element-template').content
  const element = addCardTemplate.querySelector('.elements__element').cloneNode(true);

  element.querySelector('.elements__image').src = elementInfo.link;
  element.querySelector('.elements__image').alt = elementInfo.name;
  element.querySelector('.elements__header').textContent = elementInfo.name;

  // сюда можно запихать слушатели на кнопки удаления/лайка (click -> evt.target и toggle/closest elem remove)

  return element
}

// Функция добавления карточек
function addCard(elementInfo, container){
  const element = createCard(elementInfo);
  container.prepend(element)
}

// Слушатель отправки формы Add
addForm.addEventListener('submit', addFormSubmit);