const fs = require('fs')

const Scheduler = require('./Scheduler.js')
const Config = require('./Config.js')
const TextLogReporter = require('./reporters/TextLogReporter')

const argv = require('yargs')
  .option('once', {
    alias: 'o',
    type: 'boolean',
    description: 'Run single check and exit'
  })
  .option('config', {
    alias: 'c',
    type: 'string',
    required: true,
    description: 'Path to configuration'
  })
  .argv

const run = () => {
  const config = new Config()
  config.reporters.push(new TextLogReporter())

  if (argv.config) config.merge(JSON.parse(fs.readFileSync(argv.config).toString()))

  const scheduler = new Scheduler(config)

  if (argv.once) {
    scheduler.runOnce()
  } else {
    scheduler.runForever()
  }
}

module.exports = {
  run
}
