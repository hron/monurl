const allowedStatuses = ['success', 'fail', 'down']

class CheckResult {
  static buildSuccess(url, type, duration) {
    const result = new CheckResult(url, type)
    result._status = 'success'
    result.duration = duration
    return result
  }

  static buildTransportError(url, type, duration) {
    const result = new CheckResult(url, type)
    result._status = 'down'
    result.duration = duration
    return result
  }

  constructor(url, type) {
    this.url = url
    this.type = type
  }

  set status(value) {
    if (!allowedStatuses.includes(value)) throw new Error(`Invalid status: ${value}`)

    this._status = value
  }

  get status() {
    return this._status
  }
}

module.exports = CheckResult
