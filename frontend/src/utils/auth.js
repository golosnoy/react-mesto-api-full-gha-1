import { authApi } from "./utils";

class Auth {
  constructor(host) {
    this._host = host;
  }

  checkRes(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  }

  register(data) {
    return fetch(`${this._host}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "email": data.email,
        "password": data.password
      })
    })
    .then(this.checkRes);
  }

  authorization(data) {
    return fetch(`${this._host}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "email": data.email,
        "password": data.password
      })
    })
    .then(this.checkRes)
    .then((res) => {
      if (res.token){
        localStorage.setItem('token', res.token);
        return res;
      }
    });
  }

  validation() {
    return fetch(`${this._host}/users/me`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization" : localStorage.getItem('token')
      }
    })
    .then(this.checkRes);
  }

}

export const auth = new Auth(authApi);
