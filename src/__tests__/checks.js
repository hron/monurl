const ContainsTextChecker = require('../checks/ContainsTextChecker')
const { buildCheck } = require('../checks')

describe('buildChecker', () => {
  it('returns an object of corresponding type initialized with passed options', () => {
    const check = buildCheck('containsText', 'https://example.com', {text: 'Please login:'})
    expect(check).toBeInstanceOf(ContainsTextChecker)
  })

  it('raises an error if passed type is unknown', () => {
    expect(() => {
      buildCheck('invalidType', 'https://example.com', {text: 'Please login:'})
    }).toThrowError()
  })
})
