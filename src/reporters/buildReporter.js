const EmailReporter = require('./EmailReporter')
const TextLogReporter = require('./TextLogReporter')

const buildReporter = (type, options) => {
  switch (type) {
    case 'email':
      return new EmailReporter(options.emailAddresses)
    case 'textLogger':
      return new TextLogReporter(options.filePath)
    default:
      throw new Error(`Invalid report type ${type}`)
  }
}

module.exports = buildReporter
