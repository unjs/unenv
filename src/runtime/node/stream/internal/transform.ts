import type * as stream from "node:stream";
import { Duplex } from "./duplex";

// Docs: https://nodejs.org/api/stream.html#stream_duplex_and_transform_streams
// Implementation: https://github.com/nodejs/node/blob/master/lib/internal/streams/transform.js

export class _Transform extends Duplex implements stream.Transform {
  readonly __unenv__ = true;

  _transform(
    chunk: any,
    encoding: globalThis.BufferEncoding,
    callback: stream.TransformCallback,
  ): void {}

  _flush(callback: stream.TransformCallback): void {}
}

export const Transform: typeof stream.Transform =
  (globalThis as any).Transform || _Transform;
