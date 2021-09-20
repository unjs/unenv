import type * as stream from 'stream'
import { Readable } from "./readable";
import { Writable } from "./writable";

// Docs: https://nodejs.org/api/stream.html#stream_duplex_and_transform_streams
// Implementation: https://github.com/nodejs/node/blob/master/lib/internal/streams/duplex.js

type DuplexC = new () => stream.Duplex

export const Duplex: DuplexC = class {
  allowHalfOpen: boolean = true
  constructor (readable = new Readable(), writable = new Writable()) {
    Object.assign(this, readable)
    Object.assign(this, writable)
    // @ts-ignore
    this._destroy = mergeFns(readable._destroy, writable._destroy)
  }
} as any

Object.assign(Duplex.prototype, Readable.prototype)
Object.assign(Duplex.prototype, Writable.prototype)
