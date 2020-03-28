const checks = require('../checks')
const Scheduler = require('../Scheduler')

jest.mock('../checks')

describe('#runOnce', () => {
  const config = jest.fn()
  config.sites = [
    {
      url: 'https://example.com',
      type: 'containsText',
      options: {text: 'Please login:'}
    }
  ]
  config.reporters = [{process: jest.fn()}]

  const checkResult = {}
  const check = {
    run: jest.fn(() => Promise.resolve(checkResult))
  }
  checks.buildCheck.mockImplementation((_type, _url, _options) => check)

  it('runs checks for each url from configuration', () => {
    const scheduler = new Scheduler(config)
    scheduler.runOnce()
    expect(check.run).toHaveBeenCalled()
  })
})
