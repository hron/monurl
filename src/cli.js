const Scheduler = require('./Scheduler.js')
const Config = require('./Config.js')

const argv = require('yargs')
  .option('once', {
    alias: 'o',
    type: 'boolean',
    description: 'Run single check and exit'
  })
  .argv

const run = () => {
  const config = new Config()
  const scheduler = new Scheduler(config)

  if (argv.single) {
    scheduler.runOnce()
  } else {
    scheduler.runForever()
  }
}

module.exports = {
  run
}
