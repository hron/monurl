const ContainsTextCheck = require('./checks/ContainsTextCheck')
const ChecksumCheck = require('./checks/ChecksumCheck')

const buildCheck = (type, url, options) => {
  if (type === 'containsText') {
    return new ContainsTextCheck(url, options)
  } else if (type === 'matchesChecksum') {
    return new ChecksumCheck(url, options)
  } else {
    throw new Error(`Invalid check type: ${type}`)
  }
}

module.exports = {
  buildCheck
}
