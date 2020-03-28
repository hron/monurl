jest.mock('pino')
const pino = require('pino')

const TextLogReporter = require('../../reporters/TextLogReporter')

describe('process(checkStarted, payload)', () => {
  let loggerMock
  let reporter

  beforeEach(() => {
    loggerMock = {info: jest.fn()}
    pino.mockImplementation(() => loggerMock)
    reporter = new TextLogReporter()
  })

  it('reports a check start', () => {
    reporter.process(
      'checkStarted', {url: 'https://example.com', type: 'containsText', options: {text: 'Test'}}
    )

    expect(loggerMock.info).toHaveBeenCalledWith('Check for https://example.com (match text on page) started')
  })

  it("reports unknown event type and payload as is", () => {
    reporter.process('unknownEvent', {a: 'b'})
    expect(loggerMock.info).toHaveBeenCalledWith('unknownEvent; {"a":"b"}')
  })

  it('reports a check start', () => {
    reporter.process(
      'checkStarted', {url: 'https://example.com', type: 'containsText', options: {text: 'Test'}}
    )

    expect(loggerMock.info).toHaveBeenCalledWith('Check for https://example.com (match text on page) started')
  })

  it('reports a successful check finish', () => {
    reporter.process(
      'checkFinished',
      {
        site: {url: 'https://example.com', type: 'containsText', options: {text: 'Test'}},
        success: true,
        transportSuccess: true,
        duration: 253
      }
    )

    expect(loggerMock.info).toHaveBeenCalledWith(
      'Check for https://example.com (match text on page) finished. Result: OK; 253 ms'
    )
  })

  it('reports a transport failure', () => {
    reporter.process(
      'checkFinished',
      {
        site: {url: 'https://example.com', type: 'containsText', options: {text: 'Test'}},
        success: false,
        transportSuccess: false,
        duration: undefined
      }
    )

    expect(loggerMock.info).toHaveBeenCalledWith(
      'Check for https://example.com (match text on page) finished. Result: DOWN; N/A'
    )
  })

  it('reports a failed check finish', () => {
    reporter.process(
      'checkFinished',
      {
        site: {url: 'https://example.com', type: 'containsText', options: {text: 'Test'}},
        success: false,
        transportSuccess: true,
        duration: 500
      }
    )

    expect(loggerMock.info).toHaveBeenCalledWith(
      'Check for https://example.com (match text on page) finished. Result: FAIL; 500 ms'
    )
  })
})
