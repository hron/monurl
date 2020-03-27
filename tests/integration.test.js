import {spawn} from 'child_process'
import * as path from 'path'

const monurlBinary = path.resolve(__dirname, '..', 'bin', 'monurl')

test('starts checks and logs progress', () => {
  spawn(monurlBinary)
})
