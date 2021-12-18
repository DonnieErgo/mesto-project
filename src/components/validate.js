// Класс для валидации полей в формах
export default class FormValidator {
  constructor(validationConfig, formElement) {
    this._validationConfig = validationConfig;
    this._formElement = formElement;
  }

  // Проверка формы на валидность
  _isFormValid() {
    return this._inputList.every(inputElement => inputElement.validity.valid)
  }

  // Находим нужный span с ошибкой
  _getErrorElement(inputElement) {
    return this._formElement.querySelector(`.${inputElement.id}-error`)
  }

  // Переключение состояния кнопки
  _toggleButtonState() {
    if (this._isFormValid()) {
      this._submitButton.disabled = false
    } else {
      this._submitButton.disabled = true
    }
  }

  // Прячем ошибку
  _hideInputError(inputElement) {
    const errorElement = this._getErrorElement(inputElement)
    inputElement.classList.remove(this._validationConfig.inputErrorClass)
    errorElement.classList.remove(this._validationConfig.errorClass)
    errorElement.textContent = '';
  }

  // Показываем ошибку
  _showInputError(inputElement) {
    const errorElement = this._getErrorElement(inputElement)
    inputElement.classList.add(this._validationConfig.inputErrorClass)
    errorElement.classList.add(this._validationConfig.errorClass)
    errorElement.textContent = inputElement.validationMessage;
  }

  // Проверка и отображение ошибок
  _checkInputValidity(inputElement) {
    if (inputElement.validity.valid) {
    // Если валидно - прячем ошибку
      this._hideInputError(inputElement)
    } else {
    // Если нет - показываем
      this._showInputError(inputElement)
    }
  }

  // Навешиваем слушатели
  _setEventListeners() {
    // Убираем стандартное поведение при сабмите
    this._formElement.addEventListener('submit', evt => {
      evt.preventDefault()
    })

    // Добавляем слушатели для каждого инпута
    this._inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
    // Проверяем валидность инпута
        this._checkInputValidity(inputElement);
    // Переключение состояния кнопки
        this._toggleButtonState();
      })
    })

    // Слушатель на ресет для обнуления валидации
    this._formElement.addEventListener('reset', () => {
      this._submitButton.disabled = true
      this._inputList.forEach(inputElement => {
          this._hideInputError(inputElement)
      });
    })

    // Задаем начальное состояние кнопки
    this._toggleButtonState();
  }

  // Активируем валидацию
  enableValidation() {
    this._inputList = Array.from(this._formElement.querySelectorAll(this._validationConfig.inputSelector))
    this._submitButton = this._formElement.querySelector(this._validationConfig.submitButtonSelector)
    this._setEventListeners();
  }
}