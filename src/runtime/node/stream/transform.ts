import type * as stream from 'stream'
import { Duplex } from './duplex'

// Docs: https://nodejs.org/api/stream.html#stream_duplex_and_transform_streams
// Implementation: https://github.com/nodejs/node/blob/master/lib/internal/streams/transform.js

export class Transform extends Duplex implements stream.Transform {
  _transform(chunk: any, encoding: globalThis.BufferEncoding, callback: stream.TransformCallback): void {
  }

  _flush(callback: stream.TransformCallback): void {
  }  
}
