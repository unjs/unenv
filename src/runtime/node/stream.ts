// https://nodejs.org/api/stream.html
import type nodeStream from "node:stream";
import { notImplemented, notImplementedClass } from "../_internal/utils.ts";
import { Readable } from "./internal/stream/readable.ts";
import { Writable } from "./internal/stream/writable.ts";
import { Duplex } from "./internal/stream/duplex.ts";
import { Transform } from "./internal/stream/transform.ts";

import promises from "node:stream/promises";

export { promises };

export { Readable } from "./internal/stream/readable.ts";
export { Writable } from "./internal/stream/writable.ts";
export { Duplex } from "./internal/stream/duplex.ts";
export { Transform } from "./internal/stream/transform.ts";

export const Stream: nodeStream.Stream =
  /*@__PURE__*/ notImplementedClass("stream.Stream");

export const PassThrough: nodeStream.PassThrough =
  /*@__PURE__*/ notImplementedClass("PassThrough");

export const pipeline = /*@__PURE__*/ notImplemented<
  typeof nodeStream.pipeline
>("stream.pipeline") as any;

export const finished = /*@__PURE__*/ notImplemented<
  typeof nodeStream.finished
>("stream.finished") as any;

export const addAbortSignal = /*@__PURE__*/ notImplemented<
  typeof nodeStream.addAbortSignal
>("stream.addAbortSignal");

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

export const _isArrayBufferView = /*@__PURE__*/ notImplemented(
  "stream._isArrayBufferView",
);

export const duplexPair = /*@__PURE__*/ notImplemented("stream.duplexPair");

export const getDefaultHighWaterMark = /*@__PURE__*/ notImplemented(
  "stream.getDefaultHighWaterMark",
);

export const isDestroyed = /*@__PURE__*/ notImplemented("stream.isDestroyed");

export const isWritable = /*@__PURE__*/ notImplemented("stream.isWritable");

export const setDefaultHighWaterMark = /*@__PURE__*/ notImplemented(
  "stream.setDefaultHighWaterMark",
);

export default {
  Readable: Readable as unknown as typeof nodeStream.Readable,
  Writable: Writable as unknown as typeof nodeStream.Writable,
  Duplex: Duplex as unknown as typeof nodeStream.Duplex,
  Transform: Transform as unknown as typeof nodeStream.Transform,
  Stream: Stream as unknown as typeof nodeStream.Stream,
  PassThrough: PassThrough as unknown as typeof nodeStream.PassThrough,
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
  _isArrayBufferView,
  duplexPair,
  getDefaultHighWaterMark,
  isDestroyed,
  isWritable,
  setDefaultHighWaterMark,
} as /* TODO: use satisfies */ typeof nodeStream & {
  isDisturbed: any;
  isReadable: any;
  compose: any;
  isErrored: any;
  destroy: any;
  _isUint8Array: any;
  _uint8ArrayToBuffer: any;
  _isArrayBufferView: any;
  duplexPair: any;
  getDefaultHighWaterMark: any;
  isDestroyed: any;
  isWritable: any;
  setDefaultHighWaterMark: any;
};
