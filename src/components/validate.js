// Проверка формы на валидность
const isFormValid = (inputList) => {
  return inputList.every(inputElement => inputElement.validity.valid)
}

// Находим нужный span с ошибкой
const getErrorElement = (inputElement, formElement) => {
  return formElement.querySelector(`.${inputElement.id}-error`)
}

// Прячем ошибку
const hideInputError = (inputElement, formElement, enableValidation) => {
  const errorElement = getErrorElement(inputElement, formElement)
  inputElement.classList.remove(enableValidation.inputErrorClass)
  errorElement.classList.remove(enableValidation.errorClass)
  errorElement.textContent = '';
}

// Показываем ошибку
const showInputError = (inputElement, formElement, enableValidation) => {
  const errorElement = getErrorElement(inputElement, formElement)
  inputElement.classList.add(enableValidation.inputErrorClass)
  errorElement.classList.add(enableValidation.errorClass)
  errorElement.textContent = inputElement.validationMessage;
}

// Проверка и отображение ошибок
const checkInputValidity = (inputElement, formElement, enableValidation) => {
  if (inputElement.validity.valid) {
  // Если валидно - прячем ошибку
    hideInputError(inputElement, formElement, enableValidation)
  } else {
  // Если нет - показываем
    showInputError(inputElement, formElement, enableValidation)
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
const setEventListeners = (formElement, enableValidation) => {
  formElement.addEventListener('submit', e => {
    e.preventDefault()
    toggleButtonState(submitButton, inputList);
  })

  // Находим все инпуты для каждой формы
  const inputList = Array.from(formElement.querySelectorAll(enableValidation.inputSelector));

  // Находим кнопки сабмита
  const submitButton = formElement.querySelector(enableValidation.submitButtonSelector);

  // Ресетаем валидацию - используется в попапах
  formElement.validate = function () {
    formElement.reset()
    inputList.forEach(inputElement => {
      hideInputError(inputElement, formElement, enableValidation)
    })
    toggleButtonState(submitButton, inputList)
  }

  // Добавляем слушатели для каждого инпута
  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', () => {
  // Проверяем валидность инпута
      checkInputValidity(inputElement, formElement, enableValidation);
  // Переключение состояния кнопки
      toggleButtonState(submitButton, inputList, enableValidation);
    })
  })

  // Ставим кнопку в изначальное положение
  toggleButtonState(submitButton, inputList, enableValidation);
}

  // Находим все формы
export const enableValidation = enableValidation => {
  const formList = Array.from(document.querySelectorAll(enableValidation.formSelector));
  formList.forEach(formElement => {
  // Ставим слушатели на каждую форму
    setEventListeners(formElement, enableValidation)
  })
}