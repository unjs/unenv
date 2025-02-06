// https://nodejs.org/api/stream.html
import type stream from "node:stream";
import mock from "../mock/proxy.ts";
import { notImplemented } from "../_internal/utils.ts";
import { Readable } from "./internal/stream/readable.ts";
import { Writable } from "./internal/stream/writable.ts";
import { Duplex } from "./internal/stream/duplex.ts";
import { Transform } from "./internal/stream/transform.ts";

import promises from "./stream/promises.ts";

export { Readable } from "./internal/stream/readable.ts";
export { Writable } from "./internal/stream/writable.ts";
export { Duplex } from "./internal/stream/duplex.ts";
export { Transform } from "./internal/stream/transform.ts";

export const Stream: stream.Stream = mock.__createMock__("Stream");
export const PassThrough: stream.PassThrough =
  mock.__createMock__("PassThrough");

export const pipeline = notImplemented<typeof stream.pipeline>(
  "stream.pipeline",
) as any;
export const finished = notImplemented<typeof stream.finished>(
  "stream.finished",
) as any;
export const addAbortSignal = notImplemented<typeof stream.addAbortSignal>(
  "stream.addAbortSignal",
);

// Internal
interface StreamInternal {
  isDisturbed: any;
  isReadable: any;
  compose: any;
  isErrored: any;
  destroy: any;
  _isUint8Array: any;
  _uint8ArrayToBuffer: any;
}
export const isDisturbed = notImplemented("stream.isDisturbed");
export const isReadable = notImplemented("stream.isReadable");
export const compose = notImplemented("stream.compose");
export const isErrored = notImplemented("stream.isErrored");
export const destroy = notImplemented("stream.destroy");
export const _isUint8Array = notImplemented("stream._isUint8Array");
export const _uint8ArrayToBuffer = notImplemented("stream._uint8ArrayToBuffer");

export default <typeof stream & StreamInternal>{
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
  _isUint8Array,
};
