// https://nodejs.org/api/buffer.html
import type nodeBuffer from "node:buffer";

export {
  Blob,
  File,
  INSPECT_MAX_BYTES,
  atob,
  btoa,
  isAscii,
  isUtf8,
  resolveObjectURL,
  transcode,
} from "./index";

import {
  Blob,
  File,
  INSPECT_MAX_BYTES,
  atob,
  btoa,
  isAscii,
  isUtf8,
  resolveObjectURL,
  transcode,
} from "./index";

// @ts-ignore typings are not up to date, but this API exists, see: https://github.com/cloudflare/workerd/pull/2147
const workerdBuffer = process.getBuiltinModule("node:buffer");

// TODO: Ideally this list is not hardcoded but instead is generated when the preset is being generated in the `env()` call
//       This generation should use information from https://github.com/cloudflare/workerd/issues/2097
export const { Buffer, SlowBuffer, constants, kMaxLength, kStringMaxLength } =
  workerdBuffer;

export default {
  /**
   * manually unroll unenv-polyfilled-symbols to make it tree-shakeable
   */
  Blob,
  File,
  INSPECT_MAX_BYTES,
  atob,
  btoa,
  isAscii,
  isUtf8,
  resolveObjectURL,
  transcode,

  /**
   * manually unroll workerd-polyfilled-symbols to make it tree-shakeable
   */
  Buffer,
  SlowBuffer,
  constants,
  kMaxLength,
  kStringMaxLength,
} satisfies typeof nodeBuffer;
