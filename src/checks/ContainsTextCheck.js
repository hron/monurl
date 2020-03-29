const BaseCheck = require('./BaseCheck')

class ContainsTextCheck extends BaseCheck {
  constructor(url, options) {
    super(url)
    this.type = 'containsText'
    this._text = options.text
  }

  _isFulfilled(response) {
    return response.data.includes(this._text)
  }
}

module.exports = ContainsTextCheck
