jest.mock('axios')
const axios = require('axios')

const ContainsTextCheck = require('../../checks/ContainsTextCheck')

describe("run()", () => {
  it('sets url, type and duration on the result CheckResult object', async () => {
    axios.get.mockImplementation((_url) => Promise.reject({}))
    const check = new ContainsTextCheck('https://example.com', {text: 'Test'})

    const result = await check.run()

    expect(result.url).toEqual('https://example.com')
    expect(result.type).toEqual('containsText')
    expect(result.duration).toBeGreaterThanOrEqual(0)
  })

  it('returns a successful CheckResult object when request made and text matches', async () => {
    axios.get.mockImplementation((_url) => Promise.resolve({data: 'Test'}))
    const check = new ContainsTextCheck('https://example.com', {text: 'Test'})

    const result = await check.run()

    expect(result.success).toBeTruthy()
    expect(result.transportSuccess).toBeTruthy()
  })

  it('returns failed CheckResult object when the website is down', async () => {
    axios.get.mockImplementation((_url) => Promise.reject({}))
    const check = new ContainsTextCheck('https://example.com', {text: 'Test'})

    const result = await check.run()

    expect(result.success).toBeFalsy()
    expect(result.transportSuccess).toBeFalsy()
  })

  it("returns a failed CheckResult object when text doesn't match", async () => {
    axios.get.mockImplementation((_url) => Promise.resolve({data: 'Body'}))
    const check = new ContainsTextCheck('https://example.com', {text: 'Test'})

    const result = await check.run()

    expect(result.success).toBeFalsy()
    expect(result.transportSuccess).toBeTruthy()
  })
})
