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

// const fetchConfig = {
//   baseUrl: 'https://nomoreparties.co/v1/plus-cohort-4',
//   headers: {
//     authorization: '959c9c28-048d-4fb8-b6da-ee5d034c5179',
//     'Content-Type': 'application/json'
//   }
// }

// // Проверка ответа
// const resCheck = (res) => {
//   if (res.ok) {
//     return res.json();
//   }
//   return Promise.reject(`Ошибка: ${res.status}`);
// };

// // Получаем данные профиля
// export const getProfileData = () => {
//   return fetch(`${fetchConfig.baseUrl}/users/me`, {
//     headers: fetchConfig.headers
//   })
//   .then(resCheck)
// }

// // Получаем данные карточек
// export const getCardData = () => {
//   return fetch(`${fetchConfig.baseUrl}/cards`, {
//     headers: fetchConfig.headers
//   })
//   .then(resCheck)
// }

// // Отправляем изменения профиля
// export const sendProfileData = (data) => {
//   return fetch(`${fetchConfig.baseUrl}/users/me`, {
//     method: 'PATCH',
//     headers: fetchConfig.headers,
//     body: JSON.stringify({
//       name: data.name,
//       about: data.about
//     })
//   })
//   .then(resCheck)
// }

// // Отправляем новую карточку
// export const sendCardData = (card) => {
//   return fetch(`${fetchConfig.baseUrl}/cards`, {
//     method: 'POST',
//     headers: fetchConfig.headers,
//     body: JSON.stringify({
//       name: card.name,
//       link: card.link
//     })
//   })
//   .then(resCheck)
// }

// // Отправляем удаление карточки
// export const sendDeleteCard = (id) => {
//   return fetch(`${fetchConfig.baseUrl}/cards/${id}`, {
//     method: 'DELETE',
//     headers: fetchConfig.headers,
//   })
//   .then(resCheck)
// }

// // Отправляем лайк карточки
// export const addCardLike = (id) => {
//   return fetch(`${fetchConfig.baseUrl}/cards/likes/${id}`, {
//     method: 'PUT',
//     headers: fetchConfig.headers,
//   })
//   .then(resCheck)
// }

// // Удаляем лайк карточки
// export const deleteCardLike = (id) => {
//   return fetch(`${fetchConfig.baseUrl}/cards/likes/${id}`, {
//     method: 'DELETE',
//     headers: fetchConfig.headers,
//   })
//   .then(resCheck)
// }

// // Смена аватара
// export const changeAvatar = (url) => {
//   return fetch(`${fetchConfig.baseUrl}/users/me/avatar`, {
//     method: 'PATCH',
//     headers: fetchConfig.headers,
//     body: JSON.stringify({avatar: url})
//   })
//   .then(resCheck)
// }