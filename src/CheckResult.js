class CheckResult {
  static buildSuccess(url, type, duration) {
    const result = new CheckResult(url, type)
    result.success = true
    result.transportSuccess = true
    result.duration = duration
    return result
  }

  static buildTransportError(url, type, duration) {
    const result = new CheckResult(url, type)
    result.success = false
    result.transportSuccess = false
    result.duration = duration
    return result
  }

  constructor(url, type) {
    this.url = url
    this.type = type
  }
}

module.exports = CheckResult
