const CheckResult = require('../CheckResult')

describe('status = value', () => {
  it('allows only valid values', () => {
    const cr = new CheckResult('https://example.com', 'containsText')

    expect(() => {
      cr.status = 'invalid'
    }).toThrowError()

    expect(() => {
      cr.status = 'fail'
    }).not.toThrowError()
    expect(cr.status).toEqual('fail')
  })
})
