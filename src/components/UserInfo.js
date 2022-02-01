// Класс для отрисовки информации в профиле
export default class UserInfo {
  constructor(config) {
    this._userName = document.querySelector(config.userNameSelector);
    this._userAbout = document.querySelector(config.userAboutSelector);
    this._userAvatar = document.querySelector(config.userAvatarSelector);
  }

  // Возвращение объекта с информацией о пользователе
  getUserInfo() {
    return this.userData;
  }

  // Наполнение профиля актуальными данными
  setUserInfo(name, about, avatar) {
    this._userName.textContent = name;
    this._userAbout.textContent = about;
    this._userAvatar.src = avatar;
  }
}