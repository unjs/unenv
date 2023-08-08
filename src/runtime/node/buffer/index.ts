// https://nodejs.org/api/buffer.html
import type buffer from "node:buffer";
import { notImplemented } from "../../_internal/utils";
import {
  Buffer as _Buffer,
  kMaxLength,
  INSPECT_MAX_BYTES,
  SlowBuffer,
} from "./_buffer";
import { File } from "./_file";

export { kMaxLength, INSPECT_MAX_BYTES, SlowBuffer } from "./_buffer";

export const Buffer = globalThis.Buffer || _Buffer;

export { File } from "./_file";

// @ts-expect-eerror https://github.com/unjs/unenv/issues/64
export const Blob = globalThis.Blob as unknown as typeof buffer.Blob;
export const resolveObjectURL = notImplemented("buffer.resolveObjectURL");
export const transcode = notImplemented("buffer.transcode");
export const isUtf8 = notImplemented("buffer.isUtf8");
export const isAscii = notImplemented("buffer.isAscii");

export const btoa = global.btoa;
export const atob = globalThis.atob;

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
