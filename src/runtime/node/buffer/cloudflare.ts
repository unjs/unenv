// https://nodejs.org/api/buffer.html
import type nodeBuffer from "node:buffer";
import unenvBuffer from "./index";

// @ts-ignore typings are not up to date, but this API exists, see: https://github.com/cloudflare/workerd/pull/2147
const workerdBuffer = process.getBuiltinModule("node:buffer");

// TODO: Ideally this list is not hardcoded but instead is generated when the preset is being generated in the `env()` call
//       This generation should use information from https://github.com/cloudflare/workerd/issues/2097
export const { Buffer, SlowBuffer, constants, kMaxLength, kStringMaxLength } =
  workerdBuffer;

export const {
  Blob,
  File,
  INSPECT_MAX_BYTES,
  atob,
  btoa,
  isAscii,
  isUtf8,
  resolveObjectURL,
  transcode,
} = unenvBuffer;

export default {
  Buffer,
  SlowBuffer: SlowBuffer as any as typeof nodeBuffer.SlowBuffer,
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
} satisfies typeof nodeBuffer;
