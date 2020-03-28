const axios = require('axios')

class ContainsTextChecker {
  constructor(url, options) {
    this._url = url
    this._text = options.text
  }

  run() {
    return new Promise((resolve, reject) => {
      let requestStartedAt = Date.now()
      axios.get(this._url).then((response) => {
        resolve({
          site: {url: this._url, type: 'containsText'},
          success: true,
          transportSuccess: true,
          duration: Date.now() - requestStartedAt
        })
      }).catch((_error) => {
        reject({
          site: {url: this._url, type: 'containsText'},
          success: false,
          transportSuccess: false,
          duration: Date.now() - requestStartedAt
        })
      })
    })
  }
}

module.exports = ContainsTextChecker
