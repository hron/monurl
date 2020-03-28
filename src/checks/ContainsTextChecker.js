class ContainsTextChecker {
  constructor(url, options) {
    this._url = url
    this._text = options.text
  }
}

module.exports = ContainsTextChecker
