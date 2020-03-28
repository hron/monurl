const axios = require('axios')

class ContainsTextChecker {
  constructor(url, options) {
    this._url = url
    this._text = options.text
  }

  run() {
    // return axios.get(this._url)
    return Promise.resolve({
      site: {url: this._url, type: 'containsText'},
      success: true,
      transportSuccess: true,
      duration: 253
    })
  }
}

module.exports = ContainsTextChecker
