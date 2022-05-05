import * as readable from './readable'
import * as writable from './writable'
import * as duplex from './duplex'
import * as transform from './transform'
import * as mock from './mock'

export * from './readable'
export * from './writable'
export * from './duplex'
export * from './transform'
export * from './mock'

export default {
  ...readable,
  ...writable,
  ...duplex,
  ...transform,
  ...mock
}
