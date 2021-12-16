export default class FormValidator {
  constructor(validationConfig, formElement) {
    this._validationConfig = validationConfig;
    this._formElement = formElement;
  }

  _isFormValid() {
    return this._inputList.every(inputElement => inputElement.validity.valid)
  }

  _getErrorElement(inputElement) {
    return this._formElement.querySelector(`.${inputElement.id}-error`)
  }

  _toggleButtonState() {
    if (this._isFormValid()) {
      this._submitButton.disabled = false
    } else {
      this._submitButton.disabled = true
    }
  }

  _hideInputError(inputElement) {
    const errorElement = this._getErrorElement(inputElement)
    inputElement.classList.remove(this._validationConfig.inputErrorClass)
    errorElement.classList.remove(this._validationConfig.errorClass)
    errorElement.textContent = '';
  }

  _showInputError(inputElement) {
    const errorElement = this._getErrorElement(inputElement)
    inputElement.classList.add(this._validationConfig.inputErrorClass)
    errorElement.classList.add(this._validationConfig.errorClass)
    errorElement.textContent = inputElement.validationMessage;
  }

  _checkInputValidity(inputElement) {
    if (inputElement.validity.valid) {
    // Если валидно - прячем ошибку
      this._hideInputError(inputElement)
    } else {
    // Если нет - показываем
      this._showInputError(inputElement)
    }
  }

  _setEventListeners() {
    this._formElement.addEventListener('submit', evt => {
      evt.preventDefault()
    })

    this._inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
    // Проверяем валидность инпута
        this._checkInputValidity(inputElement);
    // Переключение состояния кнопки
        this._toggleButtonState();
      })
    })

    this._formElement.addEventListener('reset', () => {
      this._submitButton.disabled = true
      this._inputList.forEach(inputElement => {
          this._hideInputError(inputElement)
      });
    })

    this._toggleButtonState();
  }

  enableValidation() {
    this._inputList = Array.from(this._formElement.querySelectorAll(this._validationConfig.inputSelector))
    this._submitButton = this._formElement.querySelector(this._validationConfig.submitButtonSelector)
    this._setEventListeners();
  }
}

// // Сброс валидации формы
// export function resetValidation(inputList, selectors, form) {
//   const button = form.querySelector(selectors.submitButtonSelector);
//   button.disabled = true
//   inputList.forEach(inputElement => {
//       hideInputError(inputElement, form, selectors)
//   });
// }

// // Проверка формы на валидность
// const isFormValid = (inputList) => {
//   return inputList.every(inputElement => inputElement.validity.valid)
// }

// // Находим нужный span с ошибкой
// const getErrorElement = (inputElement, formElement) => {
//   return formElement.querySelector(`.${inputElement.id}-error`)
// }

// // Прячем ошибку
// const hideInputError = (inputElement, formElement, selectors) => {
//   const errorElement = getErrorElement(inputElement, formElement)
//   inputElement.classList.remove(selectors.inputErrorClass)
//   errorElement.classList.remove(selectors.errorClass)
//   errorElement.textContent = '';
// }

// // Показываем ошибку
// const showInputError = (inputElement, formElement, selectors) => {
//   const errorElement = getErrorElement(inputElement, formElement)
//   inputElement.classList.add(selectors.inputErrorClass)
//   errorElement.classList.add(selectors.errorClass)
//   errorElement.textContent = inputElement.validationMessage;
// }

// // Проверка и отображение ошибок
// const checkInputValidity = (inputElement, formElement, selectors) => {
//   if (inputElement.validity.valid) {
//   // Если валидно - прячем ошибку
//     hideInputError(inputElement, formElement, selectors)
//   } else {
//   // Если нет - показываем
//     showInputError(inputElement, formElement, selectors)
//   }
// };

// // Переключение состояния кнопки
// const toggleButtonState = (submitButton, inputList) => {
//   if (isFormValid(inputList)) {
//     submitButton.disabled = false
//   } else {
//     submitButton.disabled = true
//   }
// };

// // Убираем стандартное поведение при сабмите
// const setEventListeners = (formElement, selectors) => {
//   formElement.addEventListener('submit', evt => {
//     evt.preventDefault()
//   })

//   // Находим все инпуты для каждой формы
//   const inputList = Array.from(formElement.querySelectorAll(selectors.inputSelector));

//   // Находим кнопки сабмита
//   const submitButton = formElement.querySelector(selectors.submitButtonSelector);

//   // Добавляем слушатели для каждого инпута
//   inputList.forEach(inputElement => {
//     inputElement.addEventListener('input', () => {
//   // Проверяем валидность инпута
//       checkInputValidity(inputElement, formElement, selectors);
//   // Переключение состояния кнопки
//       toggleButtonState(submitButton, inputList, selectors);
//     })
//   })

//   // Ставим кнопку в изначальное положение
//   toggleButtonState(submitButton, inputList, selectors);
// }

//   // Находим все формы
// export const enableValidation = selectors => {
//   const formList = Array.from(document.querySelectorAll(selectors.formSelector));
//   formList.forEach(formElement => {
//   // Ставим слушатели на каждую форму
//     setEventListeners(formElement, selectors)
//   })
// }