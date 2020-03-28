const {runMonurlSync} = require('./runMonurl')

test('starts checks and logs progress', async () => {
  const result = runMonurlSync('..', ['--once'])
  // console.log(result.stderr)
  expect(result.stderr).toEqual('')
  expect(result.stdout).toMatch('Starting monitoring')
})
