import type * as stream from 'stream'
import { Readable } from "./readable";
import { Writable } from "./writable";
import { mergeFns } from '../../_internal/utils'

// Docs: https://nodejs.org/api/stream.html#stream_duplex_and_transform_streams
// Implementation: https://github.com/nodejs/node/blob/master/lib/internal/streams/duplex.js

type DuplexClass = new () => stream.Duplex

export const Duplex: DuplexClass = class {
  allowHalfOpen: boolean = true
  private _destroy: (error?: Error) => void

  constructor (readable = new Readable(), writable = new Writable()) {
    Object.assign(this, readable)
    Object.assign(this, writable)
    this._destroy = mergeFns(readable._destroy, writable._destroy)
  }
} as any

Object.assign(Duplex.prototype, Readable.prototype)
Object.assign(Duplex.prototype, Writable.prototype)
