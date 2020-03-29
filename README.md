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

## How to add a new reporter
