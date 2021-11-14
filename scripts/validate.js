const enableValidation = config => {

// Проверка формы на валидность
  const isFormValid = (inputList) => {
    return inputList.every(inputElement => inputElement.validity.valid)
  }

// Находим нужный span с ошибкой
  const getErrorElement = (inputElement, formElement) => {
    return formElement.querySelector(`.${inputElement.id}-error`)
  }

// Прячем ошибку
  const hideInputError = (inputElement, formElement) => {
    const errorElement = getErrorElement(inputElement, formElement)
    inputElement.classList.remove(config.inputErrorClass)
    errorElement.classList.remove(config.errorClass)
    errorElement.textContent = '';
  }

// Показываем ошибку
  const showInputError = (inputElement, formElement) => {
    const errorElement = getErrorElement(inputElement, formElement)
    inputElement.classList.add(config.inputErrorClass)
    errorElement.classList.add(config.errorClass)
    errorElement.textContent = inputElement.validationMessage;
  }

// Переключение состояния кнопки
  const toggleButtonState = (submitButton, inputList) => {
    if (isFormValid(inputList)) {
      submitButton.disabled = false
    } else {
      submitButton.disabled = true
    }
  };

// Проверка и отображение ошибок
  const checkInputValidity = (inputElement, formElement) => {
    if (inputElement.validity.valid) {
    // Если валидно - прячем ошибку
      hideInputError(inputElement, formElement)
    } else {
    // Если нет - показываем
      showInputError(inputElement, formElement)
    }
  };

// Убираем стандартное поведение при сабмите
  const setEventListeners = formElement => {
    formElement.addEventListener('submit', e => {
      e.preventDefault()
    })

  //
  formElement.validate = function () {
    inputList.forEach(inputElement => {
      checkInputValidity(inputElement, formElement)
    })
    toggleButtonState(submitButton, inputList)
  }

  // Чистим форму после закрытия
  formElement.resetValidate = function () {
    formElement.reset()
    toggleButtonState(submitButton, inputList)
  }

  // Находим все инпуты для каждой формы
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));

  // Находим кнопки сабмита
    const submitButton = formElement.querySelector(config.submitButtonSelector);

  // Добавляем слушатели для каждого инпута
    inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
      // Проверяем валидность инпута
        checkInputValidity(inputElement, formElement);
      // Переключение состояния кнопки
        toggleButtonState(submitButton, inputList);
      })
    })

  // Ставим кнопку в изначальное положение
    toggleButtonState(submitButton, inputList);
  }

  // Находим все формы
    const formList = Array.from(document.querySelectorAll(config.formSelector));

    formList.forEach(formElement => {
    // Ставим слушатели на каждую форму
      setEventListeners(formElement)
    })
}