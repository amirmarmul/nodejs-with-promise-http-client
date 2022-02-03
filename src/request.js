class Request {
  constructor(builder) {
    this.baseURL = builder.baseURL
    this.queryParameters = builder.queryParameters
    this.bodyParameters = builder.bodyParameters
    this.headers = builder.headers
    this.path = builder.path
  }

  _getter(key) {
    return function () {
      return this[key]
    }
  }

  getQueryParameters = this._getter("queryParameters")
  getBodyParameters = this._getter("bodyParameters")
  getHeaders = this._getter("headers")
  getPath = this._getter("path")

  getURI() {
    let uri = this.baseURL || ""

    if (this.path) {
      uri += this.path
    }

    return uri
  }

  getURL() {
    let uri = this.getURI()

    if (this.getQueryParameters()) {
      return uri + this.getQueryParameterString()
    }

    return uri
  }

  getQueryParameterString() {
    const queryParameters = this.getQueryParameters()

    if (queryParameters) {
      return (
        "?" +
        Object.keys(queryParameters)
          .filter(function (key) {
            return queryParameters[key] !== undefined
          })
          .map(function (key) {
            return key + "=" + queryParameters[key]
          })
          .join("&")
      )
    }
  }

  execute(method) {
    return new Promise((resolve, reject) => {
      method(this)
        .then(res => resolve(res))
        .catch(err => reject(err))
    })
  }
}

class Builder {
  _setter(key) {
    return function (value) {
      this[key] = value
      return this
    }
  }

  withBaseURL = this._setter("baseURL")
  withPath = this._setter("path")

  _assign(source, object) {
    if (object && Array.isArray(object)) {
      return object
    }

    if (object && typeof object === "string") {
      return object
    }

    if (object && Object.keys(object).length > 0) {
      return Object.assign(source || {}, object)
    }

    return source
  }

  _assigner(key) {
    return function () {
      for (let i = 0; i < arguments.length; i++) {
        this[key] = this._assign(this[key], arguments[i])
      }

      return this
    }
  }

  withQueryParameters = this._assigner("queryParameters")
  withBodyParameters = this._assigner("bodyParameters")
  withHeaders = this._assigner("headers")

  withAuth(accessToken) {
    if (accessToken) {
      this.withHeaders({ Authorization: "Bearer " + accessToken })
    }

    return this
  }

  build() {
    return new Request(this)
  }
}

module.exports.builder = function () {
  return new Builder()
}
