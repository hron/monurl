class ChecksumChecker {
  constructor(url, options) {
    this._url = url
    this._checksum = options.checksum
  }
}

module.exports = ChecksumChecker
