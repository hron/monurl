const Config = require('../Config')
const EmailReporter = require('../reporters/EmailReporter')

describe('constructor', () => {
  it('sets sites to an empty array', () => {
    const config = new Config()
    expect(config.sites).toEqual([])
  })

  it('sets reporters to an empty array', () => {
    const config = new Config()
    expect(config.reporters).toEqual([])
  })

  it('sets default value for periodicity', () => {
    const config = new Config()
    expect(config.periodicity).toEqual(1)
  })
})

describe('merge', () => {
  it('populates sites', () => {
    const config = new Config()
    config.merge({
      sites: [
        {url: 'https://example.com', type: 'containsText', options: {text: 'Test'}},
        {url: 'https://second.com', type: 'containsText', options: {text: 'Second'}}
      ]
    })

    expect(config.sites).toHaveLength(2)
    expect(config.sites[0].url).toEqual('https://example.com')
    expect(config.sites[0].type).toEqual('containsText')
    expect(config.sites[0].options.text).toEqual('Test')
  })

  it('sets periodicity', () => {
    const config = new Config()
    config.merge({periodicity: 3})

    expect(config.periodicity).toEqual(3)
  })

  it('adds reporters from the configuration', () => {
    const config = new Config()
    config.merge({
      reporters: [
        {type: 'email', options: {emailAddresses: ['admin@example.com']}},
      ]
    })

    expect(config.reporters).toHaveLength(1)
    expect(config.reporters[0]).toBeInstanceOf(EmailReporter)
  })
})
