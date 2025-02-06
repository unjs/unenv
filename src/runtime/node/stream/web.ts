import type * as streamWeb from "node:stream/web";
import { notImplemented } from "../../_internal/utils.ts";

export const ReadableStream =
  globalThis.ReadableStream || notImplemented("stream.web.ReadableStream");
export const ReadableStreamDefaultReader =
  globalThis.ReadableStreamDefaultReader ||
  notImplemented("stream.web.ReadableStreamDefaultReader");
// @ts-ignore
export const ReadableStreamBYOBReader =
  globalThis.ReadableStreamBYOBReader ||
  notImplemented("stream.web.ReadableStreamBYOBReader");
// @ts-ignore
export const ReadableStreamBYOBRequest =
  globalThis.ReadableStreamBYOBRequest ||
  notImplemented("stream.web.ReadableStreamBYOBRequest");
// @ts-ignore
export const ReadableByteStreamController =
  globalThis.ReadableByteStreamController ||
  notImplemented("stream.web.ReadableByteStreamController");
export const ReadableStreamDefaultController =
  globalThis.ReadableStreamDefaultController ||
  notImplemented("stream.web.ReadableStreamDefaultController");
export const TransformStream =
  globalThis.TransformStream || notImplemented("stream.web.TransformStream");
export const TransformStreamDefaultController =
  globalThis.TransformStreamDefaultController ||
  notImplemented("stream.web.TransformStreamDefaultController");
export const WritableStream =
  globalThis.WritableStream || notImplemented("stream.web.WritableStream");
export const WritableStreamDefaultWriter =
  globalThis.WritableStreamDefaultWriter ||
  notImplemented("stream.web.WritableStreamDefaultWriter");
export const WritableStreamDefaultController =
  globalThis.WritableStreamDefaultController ||
  notImplemented("stream.web.WritableStreamDefaultController");
export const ByteLengthQueuingStrategy =
  globalThis.ByteLengthQueuingStrategy ||
  notImplemented("stream.web.ByteLengthQueuingStrategy");
export const CountQueuingStrategy =
  globalThis.CountQueuingStrategy ||
  notImplemented("stream.web.CountQueuingStrategy");
export const TextEncoderStream =
  globalThis.TextEncoderStream ||
  notImplemented("stream.web.TextEncoderStream");
export const TextDecoderStream =
  globalThis.TextDecoderStream ||
  notImplemented("stream.web.TextDecoderStream");
export const DecompressionStream =
  globalThis.DecompressionStream ||
  notImplemented("stream.web.DecompressionStream");
export const CompressionStream =
  globalThis.DecompressionStream ||
  notImplemented("stream.web.CompressionStream");

// @ts-ignore
export default <typeof streamWeb>{
  ReadableStream,
  ReadableStreamDefaultReader,
  ReadableStreamBYOBReader,
  ReadableStreamBYOBRequest,
  ReadableByteStreamController,
  ReadableStreamDefaultController,
  TransformStream,
  TransformStreamDefaultController,
  WritableStream,
  WritableStreamDefaultWriter,
  WritableStreamDefaultController,
  ByteLengthQueuingStrategy,
  CountQueuingStrategy,
  TextEncoderStream,
  TextDecoderStream,
  DecompressionStream,
  CompressionStream,
};
