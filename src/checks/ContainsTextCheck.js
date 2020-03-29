const axios = require('axios')

const CheckResult = require('../CheckResult')

class ContainsTextCheck {
  constructor(url, options) {
    this._url = url
    this._text = options.text
  }

  run() {
    return new Promise((resolve, _reject) => {
      let requestStartedAt = Date.now()

      axios.get(this._url).then((response) => {

        const result = CheckResult.buildSuccess(
          this._url,
          'containsText',
          Date.now() - requestStartedAt
        )
        if (!this._containsText(response.data)) result.status = 'fail'
        resolve(result)

      }).catch((_error) => {

        const result = CheckResult.buildTransportError(
          this._url,
          'containsText',
          Date.now() - requestStartedAt
        )
        resolve(result)

      })
    })
  }

  _containsText(page) {
    return page.includes(this._text)
  }
}

module.exports = ContainsTextCheck
