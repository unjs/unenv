// https://nodejs.org/api/stream.html
import type stream from 'node:stream'
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

// @ts-ignore
export default <typeof stream> {
  ...readable,
  ...writable,
  ...duplex,
  ...transform,
  ...mock
}
