import * as readable from './readable'
import * as writable from './writable'
import * as duplex from './duplex'
import * as transform from './transform'

export * from './readable'
export * from './writable'
export * from './duplex'
export * from './transform'

export default {
  ...readable,
  ...writable,
  ...duplex,
  ...transform
}
