export default class UserInfo {
  constructor(config, userData) {
    this._userNameSelector = config.userNameSelector;
    this._userAboutSelector = config.userAboutSelector;
    this._userAvatarSelector = config.userAvatarSelector;
  }

  getUserInfo() {
    return this._userData;
  }

  // Наполняем профиль актуальными данными
  setUserInfo(name, about, avatar) {
    document.querySelector(this._userNameSelector).textContent = name;
    document.querySelector(this._userAboutSelector).textContent = about;
    document.querySelector(this._userAvatarSelector).src = avatar;
  }
}