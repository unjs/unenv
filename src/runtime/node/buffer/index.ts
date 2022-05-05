// https://nodejs.org/api/buffer.html
import type buffer from 'node:buffer'

// @ts-ignore
export { Buffer, kMaxLength, INSPECT_MAX_BYTES, SlowBuffer } from './_buffer'
import { Buffer, kMaxLength, INSPECT_MAX_BYTES, SlowBuffer } from './_buffer'
import { notImplemented } from '../../_internal/utils'

export const Blob = globalThis.Blob
export const resolveObjectURL = notImplemented('buffer.resolveObjectURL')
export const transcode = notImplemented('buffer.transcode')

export const btoa = global.btoa
export const atob = globalThis.atob

export const kStringMaxLength = 0 // TODO
export const constants = { MAX_LENGTH: kMaxLength, MAX_STRING_LENGTH: kStringMaxLength }

// @ts-ignore
export default <typeof buffer> {
  Buffer,
  kMaxLength,
  INSPECT_MAX_BYTES,
  Blob,
  resolveObjectURL,
  SlowBuffer,
  transcode,
  btoa,
  atob,
  kStringMaxLength,
  constants
}
