const buildReporter = require('./reporters/buildReporter')

class Config {
  constructor() {
    this.sites = []
    this.reporters = []
    this.periodicity = 1
  }

  merge(configObj) {
    if ('sites' in configObj) this.sites = configObj.sites
    if ('periodicity' in configObj) this.periodicity = configObj.periodicity

    if ('reporters' in configObj) {
      for (let r of configObj['reporters']) {
        this.reporters.push(buildReporter(r.type, r.options))
      }
    }
  }
}

module.exports = Config
