export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _connectServerTemplate(url, method = 'GET', body = null) {
    return fetch(`${this._baseUrl}${url}`, {
      method: method,
      headers: this._headers,
      body: body
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
          return Promise.reject(`Ошибка: ${res.status}`);
      })
  }

  // Получаем данные профиля
  getInitialProfile() {return this._connectServerTemplate('/users/me')}

  // Получаем данные карточек
  getInitialCards() {return this._connectServerTemplate('/cards')}

  // Отправляем изменения профиля
  patchProfile(data) {return this._connectServerTemplate('/users/me', 'PATCH', JSON.stringify({name: data.name, about: data.about}))}

  // Отправляем новую карточку
  postNewCard(card) {return this._connectServerTemplate('/cards', 'POST', JSON.stringify({name: card.name, link: card.link}))}

  // Отправляем удаление карточки
  deleteCard(id) {return this._connectServerTemplate(`/cards/${id}`, 'DELETE')}

  // Отправляем лайк карточки
  putCardLike(id) {return this._connectServerTemplate(`/cards/likes/${id}`, 'PUT')}

  // Удаляем лайк карточки
  deleteCardLike(id) {return this._connectServerTemplate(`/cards/likes/${id}`, 'DELETE')}

  // Смена аватара
  patchAvatar(url) {return this._connectServerTemplate('/users/me/avatar', 'PATCH', JSON.stringify({avatar: url}))}
}