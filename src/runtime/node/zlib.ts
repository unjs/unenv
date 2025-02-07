import type zlib from "node:zlib";

import { constants } from "./internal/zlib/constants.ts";
import { codes } from "./internal/zlib/codes.ts";

import * as _brotli from "./internal/zlib/formats/brotli.ts";
import * as _deflate from "./internal/zlib/formats/deflate.ts";
import * as _gzip from "./internal/zlib/formats/gzip.ts";
import * as _zip from "./internal/zlib/formats/zip.ts";
import { notImplemented } from "../_internal/utils.ts";

export { constants } from "./internal/zlib/constants.ts";
export { codes } from "./internal/zlib/codes.ts";

export * from "./internal/zlib/formats/brotli.ts";
export * from "./internal/zlib/formats/deflate.ts";
export * from "./internal/zlib/formats/gzip.ts";
export * from "./internal/zlib/formats/zip.ts";

export const crc32 =
  /*@__PURE__*/ notImplemented<typeof zlib.crc32>("zlib.crc32");

// Deprecated constants
const Z_BINARY: typeof zlib.Z_BINARY = 0;
const Z_TEXT: typeof zlib.Z_TEXT = 1;
const Z_ASCII: typeof zlib.Z_ASCII = 1;
const Z_UNKNOWN: typeof zlib.Z_UNKNOWN = 2;
const Z_DEFLATED: typeof zlib.Z_DEFLATED = 8;

export default {
  ...constants,
  ..._brotli,
  ..._deflate,
  ..._gzip,
  ..._zip,
  // @ts-expect-error @types/node is missing this one - this is a bug in typings
  codes,
  constants,
  crc32,
  Z_BINARY,
  Z_TEXT,
  Z_ASCII,
  Z_UNKNOWN,
  Z_DEFLATED,
} satisfies typeof zlib;
