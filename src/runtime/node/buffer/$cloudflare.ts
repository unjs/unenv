// https://nodejs.org/api/buffer.html
import type nodeBuffer from "node:buffer";

export { atob, btoa, INSPECT_MAX_BYTES, resolveObjectURL } from "./index";

import { atob, btoa, INSPECT_MAX_BYTES, resolveObjectURL } from "./index";

// @ts-ignore typings are not up to date, but this API exists, see: https://github.com/cloudflare/workerd/pull/2147
const workerdBuffer = process.getBuiltinModule("node:buffer");

// TODO: Ideally this list is not hardcoded but instead is generated when the preset is being generated in the `env()` call
//       This generation should use information from https://github.com/cloudflare/workerd/issues/2097
export const {
  Blob,
  Buffer,
  File,
  SlowBuffer,
  constants,
  isAscii,
  isUtf8,
  kMaxLength,
  kStringMaxLength,
  transcode,
} = workerdBuffer;

export default {
  INSPECT_MAX_BYTES,
  Blob,
  Buffer,
  File,
  SlowBuffer,
  atob,
  btoa,
  constants,
  isAscii,
  isUtf8,
  kMaxLength,
  kStringMaxLength,
  resolveObjectURL,
  transcode,
} satisfies typeof nodeBuffer;
