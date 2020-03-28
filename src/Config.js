class Config {
  constructor() {
    this._sites = []
    this._reporters = []
    this._periodicity = 1
  }

  merge(configObj) {
    if ('sites' in configObj) this._sites = configObj.sites
    if ('periodicity' in configObj) this._periodicity = configObj.periodicity
  }

  get sites() {
    return this._sites
  }

  get reporters() {
    return this._reporters
  }

  set reporters(value) {
    this._reporters = value
  }

  get periodicity() {
    return this._periodicity
  }

  set periodicity(value) {
    this._periodicity = value
  }
}

module.exports = Config
