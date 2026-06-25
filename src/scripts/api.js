const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-14",
  headers: {
    authorization: "40896f1e-dae8-4c04-92da-9811f2a37340",
    "Content-Type": "application/json",
  },
};

// проверка ответа от сервера
function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }

  return Promise.reject(`Ошибка: ${res.status}`);
}

// получение данных профиля
export const getProfileInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then((res) => checkResponse(res));
};
// загрузка карточек с сервера
export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then((res) => checkResponse(res));
};
// запрос на изменение данных профиля
export const updateProfileInfo = (profileData) => {
  return fetch(`${config.baseUrl}/users/me`, {
  method: 'PATCH',
  headers: config.headers,
  body: JSON.stringify({
    name: profileData.name,
    about: profileData.about,
  })
})
.then((res) => checkResponse(res));
}

// запрос на создание новой карточки
export const createNewCard = (newCard) => {
  return fetch(`${config.baseUrl}/cards`, {
  method: 'POST',
  headers: config.headers,
  body: JSON.stringify({
    name: newCard.name,
    link: newCard.link,
  })
})
.then((res) => checkResponse(res));
}
// запрос на удаление карточки
export const deleteMyCard = (cardData) => {
  return fetch(`${config.baseUrl}/cards/${cardData._id}`, {
  method: 'DELETE',
  headers: config.headers,
})
.then((res) => checkResponse(res));
}
// запрос на постановку лайка
export const likeCard = (cardData) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardData._id}`, {
  method: 'PUT',
  headers: config.headers,
})
.then((res) => checkResponse(res));
}
// запрос на удаление лайка
export const deleteLikeCard = (cardData) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardData._id}`, {
  method: 'DELETE',
  headers: config.headers,
})
.then((res) => checkResponse(res));
}

// запрос на обновление аватара
export const updateAvatar = (profileData) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
  method: 'PATCH',
  headers: config.headers,
  body: JSON.stringify({
    avatar: profileData.avatar
  })
})
.then((res) => checkResponse(res));
}