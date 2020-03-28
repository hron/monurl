const {buildCheck} = require('./checks')

class Scheduler {
  constructor(config) {
    this._config = config
  }

  runOnce() {
    this._report('schedulerStared')
    this._config.sites.forEach(s => {
      this._report('checkStarted', s)
      buildCheck(s.type, s.url, s.options)
        .run()
        .then(checkResult => this._report('checkFinished', checkResult))
    })
  }

  runForever() {
    this.runOnce()
    setTimeout(() => { this.runOnce()}, 1000)
  }


  _report(eventType, payload) {
    this._config.reporters.forEach(r => r.process(eventType, payload))
  }
}

module.exports = Scheduler
