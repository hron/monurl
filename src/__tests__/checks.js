const ContainsTextCheck = require('../checks/ContainsTextCheck')
const { buildCheck } = require('../checks')

describe('buildCheck', () => {
  it('returns an object of corresponding type initialized with passed options', () => {
    const check = buildCheck('containsText', 'https://example.com', {text: 'Please login:'})
    expect(check).toBeInstanceOf(ContainsTextCheck)
  })

  it('raises an error if passed type is unknown', () => {
    expect(() => {
      buildCheck('invalidType', 'https://example.com', {text: 'Please login:'})
    }).toThrowError()
  })
})
