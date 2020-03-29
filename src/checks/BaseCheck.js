const axios = require('axios')
const CheckResult = require('../CheckResult')

class BaseCheck {
  constructor(url) {
    this.url = url
    this.type = 'base'
  }

  run() {
    return new Promise((resolve, _reject) => {
      let requestStartedAt = Date.now()

      axios.get(this.url).then((response) => {

        const result = CheckResult.buildSuccess(
          this.url,
          this.type,
          Date.now() - requestStartedAt
        )
        if (!this._isFulfilled(response)) result.status = 'fail'
        resolve(result)

      }).catch((_error) => {

        const result = CheckResult.buildTransportError(
          this.url,
          this.type,
          Date.now() - requestStartedAt
        )
        resolve(result)

      })
    })
  }

  _isFulfilled(response) {
    return true
  }
}

module.exports = BaseCheck
