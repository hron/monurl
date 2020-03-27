import runMonurl from './runMonurl'

test('starts checks and logs progress', async () => {
  const monurlRun = runMonurl('..')
  await monurlRun.waitUntil(({stdout, _}) => stdout.includes('Starting monitoring'))
  const results = await monurlRun.end()

  expect(results.stdout).toMatch('Starting monitoring')
})
