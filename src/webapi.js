const Request = require("./request")

class WebApi {
  constructor(credentials) {
    this._credentials = credentials || {}
  }

  setCredentials(credentials) {
    for (let key in credentials) {
      if (credentials.hasOwnProperty(key)) {
        this._credentials[key] = credentials[key]
      }
    }
  }

  getCredentials() {
    return this._credentials
  }

  resetCredentials() {
    this._credentials = null
  }

  setBaseURL(baseURL) {
    this._setCredential("baseURL", baseURL)
  }

  setClientId(clientId) {
    this._setCredential("clientId", clientId)
  }

  setClientSecret(clientSecret) {
    this._setCredential("clientSecret", clientSecret)
  }

  setAccessToken(accessToken) {
    this._setCredential("accessToken", accessToken)
  }

  getBaseURL() {
    return this._getCredential("baseURL")
  }

  getClientId() {
    return this._getCredential("clientId")
  }

  getClientSecret() {
    return this._getCredential("clientSecret")
  }

  getAccessToken() {
    const token = this._getCredential("accessToken")
    if (token) return token
    return this.refreshAccessToken()
  }

  resetClientId() {
    this._resetCredential("clientId")
  }

  resetClientSecret() {
    this._resetCredential("clientSecret")
  }

  resetAccessToken() {
    this._resetCredential("accessToken")
  }

  _setCredential(key, value) {
    this._credentials = this._credentials || {}
    this._credentials[key] = value
  }

  _getCredential(key) {
    if (!this._credentials) {
      return
    }

    return this._credentials[key]
  }

  _resetCredential(key) {
    if (!this._credentials) {
      return
    }

    this._credentials[key] = null
  }

  request() {
    return Request.builder().withBaseURL(this.getBaseURL())
  }
}

module.exports = WebApi
