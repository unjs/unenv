// https://nodejs.org/api/stream.html
import type stream from "node:stream";
import mock from "../mock/proxy";
import { notImplemented } from "../_internal/utils";
import { Readable } from "./internal/stream/readable";
import { Writable } from "./internal/stream/writable";
import { Duplex } from "./internal/stream/duplex";
import { Transform } from "./internal/stream/transform";

import promises from "./stream/promises";

export { Readable } from "./internal/stream/readable";
export { Writable } from "./internal/stream/writable";
export { Duplex } from "./internal/stream/duplex";
export { Transform } from "./internal/stream/transform";

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
export const isDisturbed = /*@__PURE__*/ notImplemented("stream.isDisturbed");
export const isReadable = /*@__PURE__*/ notImplemented("stream.isReadable");
export const compose = /*@__PURE__*/ notImplemented("stream.compose");
export const isErrored = /*@__PURE__*/ notImplemented("stream.isErrored");
export const destroy = /*@__PURE__*/ notImplemented("stream.destroy");
export const _isUint8Array = /*@__PURE__*/ notImplemented(
  "stream._isUint8Array",
);
export const _uint8ArrayToBuffer = /*@__PURE__*/ notImplemented(
  "stream._uint8ArrayToBuffer",
);

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
