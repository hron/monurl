const ContainsTextChecker = require('./checks/ContainsTextChecker')
const ChecksumChecker = require('./checks/ChecksumChecker')

const buildCheck = (type, url, options) => {
  if (type === 'containsText') {
    return new ContainsTextChecker(url, options)
  } else if (type === 'matchesChecksum') {
    return new ChecksumChecker(url, options)
  } else {
    throw new Error(`Invalid checker type: ${type}`)
  }
}

module.exports = {
  buildCheck
}
