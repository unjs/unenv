import type zlib from "node:zlib";

import { constants } from "./internal/constants";
import { codes } from "./internal/codes";

import * as _brotli from "./internal/formats/brotli";
import * as _deflate from "./internal/formats/deflate";
import * as _gzip from "./internal/formats/gzip";
import * as _zip from "./internal/formats/zip";

export { constants } from "./internal/constants";
export { codes } from "./internal/codes";

export * from "./internal/formats/brotli";
export * from "./internal/formats/deflate";
export * from "./internal/formats/gzip";
export * from "./internal/formats/zip";

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
  Z_BINARY,
  Z_TEXT,
  Z_ASCII,
  Z_UNKNOWN,
  Z_DEFLATED,
} satisfies typeof zlib;
