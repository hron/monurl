const {format} = require('util')
const pino = require('pino')

const humanizedCheckType = {
  'containsText': 'match text on page',
  'matchesChecksum': 'checksum'
}

const humanizedResultStatus = {
  'success': 'OK',
  'fail': 'FAIL',
  'down': 'DOWN'
}

class TextLogReporter {
  constructor(filePath) {
    this.logger = pino({prettyPrint: true}, filePath)
  }

  process(eventType, payload) {
    this.logger.info(this._message(eventType, payload))
  }

  _message(eventType, payload) {
    switch (eventType) {
      case 'checkStarted':
        return this._checkStartedMessage(payload)
      case 'schedulerStarted':
        return 'Starting monitoring'
      case 'checkFinished':
        return this._checkFinishedMessage(payload)
      default:
        return [eventType, JSON.stringify(payload)].join('; ')
    }
  }

  _checkStartedMessage(site) {
    return format('Check for %s (%s) started', site.url, humanizedCheckType[site.type])
  }

  _checkFinishedMessage(checkResult) {
    return format(
      'Check for %s (%s) finished. Result: %s; %s',
      checkResult.url,
      humanizedCheckType[checkResult.type] || checkResult.type,
      humanizedResultStatus[checkResult.status],
      checkResult.status !== 'down' ? `${checkResult.duration} ms` : 'N/A'
    )
  }
}

module.exports = TextLogReporter
