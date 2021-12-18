// Класс для отрисовки информации в профиле
export default class UserInfo {
  constructor(config) {
    this._userNameSelector = config.userNameSelector;
    this._userAboutSelector = config.userAboutSelector;
    this._userAvatarSelector = config.userAvatarSelector;
  }

  // Возвращение объекта с информацией о пользователе
  getUserInfo() {
    return this.userData;
  }

  // Наполнение профиля актуальными данными
  setUserInfo(name, about, avatar) {
    document.querySelector(this._userNameSelector).textContent = name;
    document.querySelector(this._userAboutSelector).textContent = about;
    document.querySelector(this._userAvatarSelector).src = avatar;
  }
}