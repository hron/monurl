const path = require('path')
const fs = require('fs')
const {runMonurlSync, writeMonurlConfig} = require('./runMonurl')

it('starts checks and logs progress', () => {
  const configPath = writeMonurlConfig({
    sites: [
      {
        url: 'https://example.com',
        type: 'containsText',
        options: {text: 'Example Domain'}
      },
      {
        url: "https://invalid.domain",
        type: "containsText",
        options: {text: "Please login:"}
      }
    ]
  })
  const result = runMonurlSync('..', ['--once', `--config=${configPath}`])

  expect(result.stderr).toEqual('')
  expect(result.stdout).toMatch('Starting monitoring')
  expect(result.stdout).toMatch('Check for https://example.com (match text on page) started')
  expect(result.stdout).toMatch('Check for https://invalid.domain (match text on page) started')
  expect(result.stdout).toMatch(/Check for https:\/\/example\.com \(match text on page\) finished. Result: OK; \d+ ms/)
  expect(result.stdout).toMatch(
    /Check for https:\/\/invalid\.domain \(match text on page\) finished. Result: DOWN; N\/A/
  )
})

it('supports --logfile option', () => {
  const configPath = writeMonurlConfig({sites: []})
  const logfilePath = path.join(path.dirname(configPath), 'monurl.log')

  const result = runMonurlSync('..', [
    `--logfile=${logfilePath}`,
    '--once',
    `--config=${configPath}`]
  )
  expect(result.stderr).toEqual('')

  expect(fs.readFileSync(logfilePath).toString()).toContain('Starting monitoring')
})

it('supports checksum check', () => {
  const configPath = writeMonurlConfig({
    sites: [
      {
        url: 'https://example.com',
        type: 'matchesChecksum',
        options: {checksum: '4a3ce8ee11e091dd7923f4d8c6e5b5e41ec7c047'}
      }
    ]
  })
  const result = runMonurlSync('..', ['--once', `--config=${configPath}`])

  expect(result.stderr).toEqual('')
  expect(result.stdout).toMatch('Starting monitoring')
  expect(result.stdout).toMatch('Check for https://example.com (checksum) started')
  expect(result.stdout).toMatch(/Check for https:\/\/example\.com \(checksum\) finished. Result: OK; \d+ ms/)
})

it('supports email reporter', () => {
  const configPath = writeMonurlConfig({
    sites: [
      {
        url: 'https://invalid.domain',
        type: 'matchesChecksum',
        options: {checksum: '4a3ce8ee11e091dd7923f4d8c6e5b5e41ec7c047'}
      }
    ],
    reporters: [
      {
        type: 'email',
        options: {emailAddresses: ['admin@example.com']}
      }
    ]
  })
  const result = runMonurlSync('..', ['--once', `--config=${configPath}`])

  expect(result.stderr).toEqual('')
  expect(result.stdout).toMatch('Notifying admin@example.com about a down state of https://invalid.domain')
})
