// https://nodejs.org/api/util.html
import type util from 'node:util'
import { notImplemented } from '../../_internal/utils'
import * as legacyTypes from './_legacyTypes'
import * as logUtils from './_log'
import * as types from './types'
import { inherits } from './_inherits'
import { promisify } from './_promisify'

export * from './_legacyTypes'
export * from './_log'
export { inherits } from './_inherits'
export { promisify} from './_promisify'

// @ts-ignore
export const TextDecoder : typeof util.TextDecoder = globalThis.TextDecoder

// @ts-ignore
export const TextEncoder : typeof util.TextEncoder = globalThis.TextEncoder

export const deprecate : typeof util.deprecate = fn => fn

export const _errnoException = notImplemented('util._errnoException')
export const _exceptionWithHostPort = notImplemented('util._exceptionWithHostPort')
export const _extend = notImplemented('util._extend')
export const callbackify : typeof util.callbackify = notImplemented('util.callbackify')
export const getSystemErrorMap : typeof util.getSystemErrorMap = notImplemented('util.getSystemErrorMap')
export const getSystemErrorName : typeof util.getSystemErrorName = notImplemented('util.getSystemErrorName')
export const toUSVString : typeof util.toUSVString = notImplemented('util.toUSVString')
export const stripVTControlCharacters : typeof util.stripVTControlCharacters = notImplemented('util.stripVTControlCharacters')

export default <typeof util> {
  _errnoException,
  _exceptionWithHostPort,
  _extend,
  callbackify,
  deprecate,
  getSystemErrorMap,
  getSystemErrorName,
  inherits,
  promisify,
  stripVTControlCharacters,
  toUSVString,
  TextDecoder,
  TextEncoder,
  types,
  ...logUtils,
  ...legacyTypes
}
