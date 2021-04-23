import * as readable from './readable'
import * as writable from './writable'

export * from './readable'
export * from './writable'

export default {
  ...readable,
  ...writable
}
