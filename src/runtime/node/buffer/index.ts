// https://nodejs.org/api/buffer.html
import type buffer from "node:buffer";
import { notImplemented } from "../../_internal/utils";
import { Buffer, kMaxLength, INSPECT_MAX_BYTES, SlowBuffer } from "./_buffer";

// @ts-ignore
export { Buffer, kMaxLength, INSPECT_MAX_BYTES, SlowBuffer } from "./_buffer";

export const Blob = globalThis.Blob;
export const resolveObjectURL = notImplemented("buffer.resolveObjectURL");
export const transcode = notImplemented("buffer.transcode");

export const btoa = global.btoa;
export const atob = globalThis.atob;

export const kStringMaxLength = 0; // TODO
export const constants = { MAX_LENGTH: kMaxLength, MAX_STRING_LENGTH: kStringMaxLength };

export default <typeof buffer> {
  Buffer: Buffer as any as typeof buffer.Buffer,
  SlowBuffer: SlowBuffer as any as typeof buffer.SlowBuffer,
  kMaxLength,
  INSPECT_MAX_BYTES,
  Blob,
  resolveObjectURL,
  transcode,
  btoa,
  atob,
  kStringMaxLength,
  constants
};
