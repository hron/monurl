const {runMonurlSync} = require('./runMonurl')

test('starts checks and logs progress', async () => {
  const result = runMonurlSync('..', ['--once'])

  expect(result.stderr).toEqual('')
  expect(result.stdout).toMatch('Starting monitoring')
})
