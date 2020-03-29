# Monurl - MONitor URLs with pleasure

The tool is intended for monitor a list of urls by making HTTP(S) requests to them and run checks. Currently you can check for text on page, but any other checks can be easily added.

## Command Line Interface

```shell script
$ bin/monurl --help
Options:
  --help             Show help                                         [boolean]
  --version          Show version number                               [boolean]
  --once, -o         Run single check and exit                         [boolean]
  --config, -c       Path to configuration                   [string] [required]
  --periodicity, -p  Number of seconds between checks      [number] [default: 1]
  --logfile, -l      Path to a logfile                                  [string]
``` 

## How to add a new check type

1. Add a class which extends `BaseCheck` and defines `_isFulfilled` into `src/checks`:

```javascript
class HeaderPresenceCheck extends BaseCheck {
  constructor(url, options) {
    super(url)
    this.type = 'header'
    this.header = options.header
  }

  _isFulfilled(response) {
    return this.header in response.headers
  }
}
```

2. Register the check in `buildCheck` factory (`src/checks.js`):

```javascript
const buildCheck = (type, url, options) => {
  switch (type) {
    case 'containsText':
      return new ContainsTextCheck(url, options)
    case 'matchesChecksum':
      return new ChecksumCheck(url, options)
    case 'header':
      return new HeaderCheck(url, options)
    default:
      throw new Error(`Invalid check type: ${type}`)
  }
}
```

## How to add a new reporter

1. Add a class which implements `process(eventType, payload)` into `src/reporters`:

```javascript
class AwesomeReporter {
  constructor(firstName) {
    this.firstName = firstName
  }

  process(eventType, payload) {
    if (eventType === 'checkFinished' && payload.status === 'success') {
      console.log(`AWESOME! ${payload.url} is UP`)
    }
  }
}
```

2. Register the reporters in `buildReporter` factory (`src/buildReporter.js`):

```javascript
const buildReporter = (type, options) => {
  switch (type) {
    case 'email':
      return new EmailReporter(options.emailAddresses)
    case 'textLogger':
      return new TextLogReporter(options.filePath)
    case 'awesome':
      return new AwesomeReporter(options.firstName)
    default:
      throw new Error(`Invalid report type ${type}`)
  }
}
```

3. You can use the reporter in your config file now:

```json
{
  "sites": [
    {
      "url": "https://example.com",
      "type": "containsText",
      "options": {"text": "Please login:"}
    }
  ],
  "reporters": [
    {
      "type": "awesome",
      "options": {"firstName": "John"}
    } 
  ]
}

```
