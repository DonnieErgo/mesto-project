const fetchConfig = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-4',
  headers: {
    authorization: '959c9c28-048d-4fb8-b6da-ee5d034c5179',
    'Content-Type': 'application/json'
  }
}

// Проверка ответа
const resCheck = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};

// Получаем данные профиля
export const getProfileData = () => {
  return fetch(`${fetchConfig.baseUrl}/users/me`, {
    headers: fetchConfig.headers
  })
  .then(resCheck)
}

// Получаем данные карточек
export const getCardData = () => {
  return fetch(`${fetchConfig.baseUrl}/cards`, {
    headers: fetchConfig.headers
  })
  .then(resCheck)
}

// Отправляем изменения профиля
export const sendProfileData = (data) => {
  return fetch(`${fetchConfig.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: fetchConfig.headers,
    body: JSON.stringify({
      name: data.name,
      about: data.about
    })
  })
  .then(resCheck)
}

// Отправляем новую карточку
export const sendCardData = (card) => {
  return fetch(`${fetchConfig.baseUrl}/cards`, {
    method: 'POST',
    headers: fetchConfig.headers,
    body: JSON.stringify({
      name: card.name,
      link: card.link
    })
  })
  .then(resCheck)
}

// Отправляем удаление карточки
export const sendDeleteCard = (id) => {
  return fetch(`${fetchConfig.baseUrl}/cards/${id}`, {
    method: 'DELETE',
    headers: fetchConfig.headers,
  })
  .then(resCheck)
}

// Отправляем лайк карточки
export const addCardLike = (id) => {
  return fetch(`${fetchConfig.baseUrl}/cards/likes/${id}`, {
    method: 'PUT',
    headers: fetchConfig.headers,
  })
  .then(resCheck)
}

// Удаляем лайк карточки
export const deleteCardLike = (id) => {
  return fetch(`${fetchConfig.baseUrl}/cards/likes/${id}`, {
    method: 'DELETE',
    headers: fetchConfig.headers,
  })
  .then(resCheck)
}

// Смена аватара
export const changeAvatar = (url) => {
  return fetch(`${fetchConfig.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: fetchConfig.headers,
    body: JSON.stringify({
      name: card.name,
      link: card.link
    })
  })
  .then(resCheck)
}