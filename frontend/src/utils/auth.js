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
        "Accept": "application/json",
        "Content-Type": "application/json",
      }
    })
    .then(res => {if (res.ok) return res.json()})
  }

  getLogoutUser() {
    return fetch(`${this._baseUrl}/signout`, {
      method: 'GET',
      credentials: 'include',
    })
    .then(res => {if (res.ok) return res.json()})
  }
}

const auth = new Auth(authSetting);

export default auth
