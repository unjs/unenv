import { EventEmitter } from 'events'
import type * as stream from 'stream'
import { Readable, Writable } from '.'
import type { BufferEncoding, Callback } from '../../_internal/types'

// Docs: https://nodejs.org/api/stream.html#stream_duplex_and_transform_streams
// Implementation: https://github.com/nodejs/node/blob/master/lib/internal/streams/duplex.js

class IO extends Readable implements Writable {
  readonly writable: boolean = true
  writableEnded: boolean =false
  writableFinished: boolean = false
  readonly writableHighWaterMark: number = 0
  readonly writableLength: number = 0
  readonly writableObjectMode: boolean = false
  readonly writableCorked: number = 0
  _data: any;
  _encoding: any;

  _write(chunk: any, encoding: any, callback?: Callback<Error | null | undefined>): void {}
  _final(_callback: Callback<Error | null | undefined>): void {}
  write(chunk: any, arg2?: any, arg3?: Callback<Error | null | undefined>): boolean {
    return true
  }
  setDefaultEncoding(_encoding: any): this {
    return this
  }
  end(arg1: any, arg2?: any, arg3?: Callback<Error | null | undefined>): void {}
  cork(): void {}
  uncork(): void {}
}

Object.getOwnPropertyNames(Writable.prototype).forEach(name => {
  if (name !== 'constructor') {
    // @ts-ignore
    IO.prototype[name] = Writable.prototype[name]
  }
})

export class Duplex extends IO implements stream.Duplex {
  allowHalfOpen: boolean = true
}
