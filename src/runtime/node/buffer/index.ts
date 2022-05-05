// @ts-ignore
export { Buffer, kMaxLength, INSPECT_MAX_BYTES, SlowBuffer } from './_buffer'
import { Buffer, kMaxLength, INSPECT_MAX_BYTES, SlowBuffer } from './_buffer'

function createNotImplemented (name: string) {
  return () => { throw new Error(`[unenv] buffer.${name} is not implemented yet!`) }
}

export const Blob = globalThis.Blob
export const resolveObjectURL = createNotImplemented('resolveObjectURL')
export const transcode = createNotImplemented('transcode')

export const btoa = global.btoa
export const atob = globalThis.atob

export const kStringMaxLength = 0 // TODO
export const constants = { MAX_LENGTH: kMaxLength, MAX_STRING_LENGTH: kStringMaxLength }

export default {
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
