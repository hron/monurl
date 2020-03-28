const {runMonurlSync, writeMonurlConfig} = require('./runMonurl')

test('starts checks and logs progress', async () => {
  const configPath = writeMonurlConfig({
    sites: [
      {
        url: 'https://example.com',
        type: 'containsText',
        options: {text: 'Please login:'}
      }
    ]
  })
  const result = runMonurlSync('..', ['--once', `--config=${configPath}`])

  expect(result.stderr).toEqual('')
  expect(result.stdout).toMatch('Starting monitoring')
  expect(result.stdout).toMatch('Check for https://example.com (match text on page) started')
  expect(result.stdout).toMatch('Check for https://example.com (match text on page) finished. Result: OK; 253 ms')
})
