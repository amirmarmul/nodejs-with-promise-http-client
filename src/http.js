const axios = require("axios")

const _getParametersFromRequest = function (request) {
  const options = {}

  if (request.getQueryParameters()) {
    options.query = request.getQueryParameters()
  }

  if (request.getBodyParameters()) {
    options.data = JSON.stringify(request.getBodyParameters())
  }

  if (request.getHeaders()) {
    options.headers = request.getHeaders()
  }

  return options
}

class Http {
  static get(request) {
    return Http._makeRequest(
      "GET",
      _getParametersFromRequest(request),
      request.getURL()
    )
  }

  static post(request) {
    return Http._makeRequest(
      "POST",
      _getParametersFromRequest(request),
      request.getURI()
    )
  }

  static delete(request) {
    return Http._makeRequest(
      "DELETE",
      _getParametersFromRequest(request),
      request.getURI()
    )
  }

  static _makeRequest(method, options, url) {
    const config = { method, url }

    if (options.query) {
      config.params = options.query
    }

    if (options.headers) {
      config.headers = options.headers
    }

    if (options.data) {
      config.data = options.data
    }

    return axios(config)
  }
}

module.exports = Http
