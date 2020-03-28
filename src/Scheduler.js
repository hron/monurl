const {buildCheck} = require('./checks')

class Scheduler {
  constructor(config) {
    this._config = config
  }

  tick(forever = false) {
    this._config.sites.forEach(s => {
      this._report('checkStarted', s)
      buildCheck(s.type, s.url, s.options)
        .run()
        .then(checkResult => this._report('checkFinished', checkResult))
    })
    if (forever) setTimeout(() => { this.tick(true)}, this._config.periodicity * 1000)
  }

  runForever() {
    this._report('schedulerStarted')
    this.tick(true)
  }

  runOnce() {
    this._report('schedulerStarted')
    this.tick()
  }

  _report(eventType, payload) {
    this._config.reporters.forEach(r => r.process(eventType, payload))
  }
}

module.exports = Scheduler
