const os = require('os')
const fs = require('fs')
const path = require('path')
const {Writable} = require('stream')
const execa = require('execa')
const stripAnsi = require('strip-ansi')

const MONURL_PATH = path.resolve(__dirname, '..', '..', 'bin', 'monurl')

function spawnMonurl(dir, args, options, spawnAsync) {
  const isRelative = !path.isAbsolute(dir)

  if (isRelative) {
    dir = path.resolve(__dirname, dir);
  }

  const env = Object.assign({}, process.env);

  const spawnArgs = [MONURL_PATH, ...(args || [])];
  const spawnOptions = {
    cwd: dir,
    env,
    reject: false,
    timeout: options.timeout || 0,
  };

  return (spawnAsync ? execa : execa.sync)(
    process.execPath,
    spawnArgs,
    spawnOptions,
  );
}

function normalizeStdoutAndStderr(result, options) {
  if (options.stripAnsi) result.stdout = stripAnsi(result.stdout);
  if (options.stripAnsi) result.stderr = stripAnsi(result.stderr);

  return result;
}

function runMonurlSync(dir, args, options = {}) {
  return normalizeStdoutAndStderr(spawnMonurl(dir, args, options), options)
}

function runMonurl(dir, args, options = {}) {
  const monurlPromise = spawnMonurl(dir, args, {timeout: 30000, ...options}, true)

  let stderr = ''
  let stdout = ''
  const pending = new Set()

  const dispatch = () => {
    for (const fn of pending) {
      fn({stderr, stdout})
    }
  }

  monurlPromise.stdout.pipe(
    new Writable({
      write(chunk, _encoding, callback) {
        stdout += chunk.toString('utf8')
        dispatch()
        callback()
      },
    }),
  )

  monurlPromise.stderr.pipe(
    new Writable({
      write(chunk, _encoding, callback) {
        stderr += chunk.toString('utf8');
        dispatch();
        callback();
      },
    }),
  )

  return {
    async end() {
      monurlPromise.kill()

      const result = await monurlPromise

      result.stdout = stdout
      result.stderr = stderr

      return normalizeStdoutAndStderr(result, options)
    },

    getCurrentOutput() {
      return {stderr, stdout}
    },

    getInput() {
      return monurlPromise.stdin
    },

    async waitUntil(fn) {
      await new Promise(resolve => {
        const check = (state) => {
          if (fn(state)) {
            pending.delete(check)
            resolve()
          }
        }
        pending.add(check)
      })
    },
  }
}

function writeMonurlConfig(config) {
  const configPath = path.join(fs.mkdtempSync(`${os.tmpDir}${path.sep}`), 'monurl.json')
  fs.writeFileSync(configPath, JSON.stringify(config))
  return configPath
}


module.exports = {
  runMonurl,
  runMonurlSync,
  writeMonurlConfig
}
