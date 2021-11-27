// Сброс валидации формы
export function resetValidation(inputList, selectors, form) {
  inputList.forEach(inputElement => {
      hideInputError(inputElement, form, selectors)
  });
}

// Проверка формы на валидность
const isFormValid = (inputList) => {
  return inputList.every(inputElement => inputElement.validity.valid)
}

// Находим нужный span с ошибкой
const getErrorElement = (inputElement, formElement) => {
  return formElement.querySelector(`.${inputElement.id}-error`)
}

// Прячем ошибку
const hideInputError = (inputElement, formElement, selectors) => {
  const errorElement = getErrorElement(inputElement, formElement)
  inputElement.classList.remove(selectors.inputErrorClass)
  errorElement.classList.remove(selectors.errorClass)
  errorElement.textContent = '';
}

// Показываем ошибку
const showInputError = (inputElement, formElement, selectors) => {
  const errorElement = getErrorElement(inputElement, formElement)
  inputElement.classList.add(selectors.inputErrorClass)
  errorElement.classList.add(selectors.errorClass)
  errorElement.textContent = inputElement.validationMessage;
}

// Проверка и отображение ошибок
const checkInputValidity = (inputElement, formElement, selectors) => {
  if (inputElement.validity.valid) {
  // Если валидно - прячем ошибку
    hideInputError(inputElement, formElement, selectors)
  } else {
  // Если нет - показываем
    showInputError(inputElement, formElement, selectors)
  }
};

// Переключение состояния кнопки
const toggleButtonState = (submitButton, inputList) => {
  if (isFormValid(inputList)) {
    submitButton.disabled = false
  } else {
    submitButton.disabled = true
  }
};

// Убираем стандартное поведение при сабмите
const setEventListeners = (formElement, selectors) => {
  formElement.addEventListener('submit', e => {
    e.preventDefault()
    submitButton.disabled = true
  })

  // Находим все инпуты для каждой формы
  const inputList = Array.from(formElement.querySelectorAll(selectors.inputSelector));

  // Находим кнопки сабмита
  const submitButton = formElement.querySelector(selectors.submitButtonSelector);

  // Добавляем слушатели для каждого инпута
  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', () => {
  // Проверяем валидность инпута
      checkInputValidity(inputElement, formElement, selectors);
  // Переключение состояния кнопки
      toggleButtonState(submitButton, inputList, selectors);
    })
  })

  // Ставим кнопку в изначальное положение
  toggleButtonState(submitButton, inputList, selectors);
}

  // Находим все формы
export const enableValidation = selectors => {
  const formList = Array.from(document.querySelectorAll(selectors.formSelector));
  formList.forEach(formElement => {
  // Ставим слушатели на каждую форму
    setEventListeners(formElement, selectors)
  })
}