import { authSetting } from "./constants";

class Auth {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  getRegistrationUser({ password, email }) {
    return fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        password: password,
        email: email
      })
    })
    .then(res => {if (res.ok) return res.json()})
  }

  getAuthorizationUser({ password, email }) {
    return fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        password: password,
        email: email
      })
    })
    .then(res => {if (res.ok) return res.json()})
  }

  checkValidityUser(jwt) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${jwt}`
      }
    })
    .then(res => res.json())
  }
}

const auth = new Auth(authSetting);

export default auth
