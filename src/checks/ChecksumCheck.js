const BaseCheck = require('./BaseCheck')
const crypto = require('crypto')

class ChecksumCheck extends BaseCheck {
  constructor(url, options) {
    super(url)
    this.type = 'matchesChecksum'
    this.checksum = options.checksum
  }

  _isFulfilled(response) {
    return this._checksum(response.data) === this.checksum
  }

  _checksum(string) {
    return crypto
      .createHash('sha1')
      .update(string, 'utf8')
      .digest('hex')
  }
}

module.exports = ChecksumCheck
