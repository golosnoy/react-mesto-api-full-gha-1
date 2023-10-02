import { authApi } from "./utils";

class Api {
  constructor(hostApi) {
    this._token = localStorage.getItem('token');
    this._domen = hostApi;
  }

  checkRes(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  }

  getCardsData() {
    const token = localStorage.getItem('token');
    return fetch(`${this._domen}/cards`, {
      headers: {
        authorization: token
      }
    })
    .then(this.checkRes);
  }

  getUserInfo() {
    const token = localStorage.getItem('token');
    return fetch(`${this._domen}/users/me`, {
      headers: {
        authorization: token
      }
    })
    .then(this.checkRes);
  }

  patchUserInfo(userData) {
    return fetch(`${this._domen}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: userData.name,
        about: userData.about,
        avatar: userData.avatar,
        email: userData.email,
        _id: userData.id
      })
    })

    .then(this.checkRes);
  }

  postCard(newCard) {
    return fetch(`${this._domen}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: newCard.name,
        link: newCard.link
      })
    })
    .then(this.checkRes);
  }

  deleteCard(cardId) {
    return fetch(`${this._domen}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token
      }
    })
    .then(this.checkRes);
  }

  getAppInfo() {
    return Promise.all([this.getCardsData(), this.getUserInfo()]);
  }

  changeLikeCardStatus(cardId, isLiked) {
    return fetch(`${this._domen}/cards/${cardId}/likes`, {
      method: (isLiked ? 'PUT' : 'DELETE'),
      headers: {
        authorization: this._token
      }
    })
    .then(this.checkRes);
  }

  updateAvatar(url) {
    const token = localStorage.getItem('token');
    return fetch(`${this._domen}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: url
      })
    })
    .then(this.checkRes);
  }
}

export const api = new Api(authApi);
