const ContainsTextCheck = require('./checks/ContainsTextCheck')
const ChecksumCheck = require('./checks/ChecksumCheck')

const buildCheck = (type, url, options) => {
  switch (type) {
    case 'containsText':
      return new ContainsTextCheck(url, options)
    case 'matchesChecksum':
      return new ChecksumCheck(url, options)
    default:
      throw new Error(`Invalid check type: ${type}`)
  }
}

module.exports = {
  buildCheck
}
