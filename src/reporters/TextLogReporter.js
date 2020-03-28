const pino = require('pino')

const humanizedMessages = {
  'schedulerStared': 'Starting monitoring'
}

class TextLogReporter {
  constructor() {
    this.logger = pino({prettyPrint: true})
  }

  process(eventType, payload) {
    this.logger.info(this.message(eventType), payload)
  }

  message(eventType) {
    return humanizedMessages[eventType] || eventType
  }
}

module.exports = TextLogReporter
