// https://nodejs.org/api/stream.html
import stream from 'node:stream'
import { Readable } from './readable'
import { Writable } from './writable'
import { Duplex } from './duplex'
import { Transform } from './transform'
import mock from '../../mock/proxy'
import { notImplemented } from '../../_internal/utils'

import promises from './promises/index'

export { Readable } from './readable'
export { Writable } from './writable'
export { Duplex } from './duplex'
export { Transform } from './transform'

export const Stream: stream.Stream = mock.__createMock__('Stream')
export const PassThrough: stream.PassThrough = mock.__createMock__('PassThrough')

export const pipeline: typeof stream.pipeline = notImplemented('stream.pipeline') as any
export const finished: typeof stream.finished = notImplemented('stream.finished') as any
export const addAbortSignal: typeof stream.addAbortSignal = notImplemented('stream.addAbortSignal')

// Internal
interface StreamInternal { isDisturbed: any, isReadable: any, compose: any, isErrored: any, destroy: any, _isUint8Array: any, _uint8ArrayToBuffer: any }
export const isDisturbed = notImplemented('stream.isDisturbed')
export const isReadable = notImplemented('stream.isReadable')
export const compose = notImplemented('stream.compose')
export const isErrored = notImplemented('stream.isErrored')
export const destroy = notImplemented('stream.destroy')
export const _isUint8Array = notImplemented('stream._isUint8Array')
export const _uint8ArrayToBuffer = notImplemented('stream._uint8ArrayToBuffer')

export default <typeof stream & StreamInternal> {
  Readable: Readable as unknown as typeof stream.Readable,
  Writable: Writable as unknown as typeof stream.Writable,
  Duplex: Duplex as unknown as typeof stream.Duplex,
  Transform: Transform as unknown as typeof stream.Transform,
  Stream: Stream as unknown as typeof stream.Stream,
  PassThrough: PassThrough as unknown as typeof stream.PassThrough,
  pipeline,
  finished,
  addAbortSignal,
  promises,
  isDisturbed,
  isReadable,
  compose,
  _uint8ArrayToBuffer,
  isErrored,
  destroy,
  _isUint8Array
}
