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
        const result = this._buildSuccessfulResult(requestStartedAt)
        result.success = this._containsText(response.data)
        resolve(result)
      }).catch((_error) => {
        resolve(this._buildTransportError(requestStartedAt))
      })
    })
  }

  _buildTransportError(startedAt) {
    const result = new CheckResult(this._url, 'containsText')
    result.success = false
    result.transportSuccess = false
    result.duration = Date.now() - startedAt
    return result
  }

  _buildSuccessfulResult(startedAt) {
    const result = new CheckResult(this._url, 'containsText')
    result.success = true
    result.transportSuccess = true
    result.duration = Date.now() - startedAt
    return result
  }

  _containsText(page) {
    return page.includes(this._text)
  }
}

module.exports = ContainsTextCheck
