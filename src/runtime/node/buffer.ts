// https://nodejs.org/api/buffer.html
import type buffer from "node:buffer";
import { notImplemented } from "../_internal/utils";
import {
  Buffer as _Buffer,
  kMaxLength,
  INSPECT_MAX_BYTES,
  SlowBuffer,
} from "./internal/buffer/buffer";
import { File } from "./internal/buffer/file";

export {
  kMaxLength,
  INSPECT_MAX_BYTES,
  SlowBuffer,
} from "./internal/buffer/buffer";

export const Buffer = globalThis.Buffer || _Buffer;

export { File } from "./internal/buffer/file";

// @ts-expect-eerror https://github.com/unjs/unenv/issues/64
export const Blob = globalThis.Blob as unknown as typeof buffer.Blob;
export const resolveObjectURL = /*@__PURE__*/ notImplemented(
  "buffer.resolveObjectURL",
);
export const transcode = /*@__PURE__*/ notImplemented("buffer.transcode");
export const isUtf8 = /*@__PURE__*/ notImplemented("buffer.isUtf8");
export const isAscii = /*@__PURE__*/ notImplemented("buffer.isAscii");

export const btoa = globalThis.btoa.bind(globalThis);
export const atob = globalThis.atob.bind(globalThis);

export const kStringMaxLength = 0; // TODO
export const constants = {
  MAX_LENGTH: kMaxLength,
  MAX_STRING_LENGTH: kStringMaxLength,
};

export default <typeof buffer>{
  Buffer,
  SlowBuffer: SlowBuffer as any as typeof buffer.SlowBuffer,
  kMaxLength,
  INSPECT_MAX_BYTES,
  Blob,
  resolveObjectURL,
  transcode,
  btoa,
  atob,
  kStringMaxLength,
  constants,
  isUtf8,
  isAscii,
  File,
};
