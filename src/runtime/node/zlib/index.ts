import type zlib from "node:zlib";
import { constants } from "./constants";
import { codes } from "./codes";

export { constants } from "./constants";
export { codes } from "./codes";

export * from "./_brotli";
export * from "./_deflate";
export * from "./_gzip";
export * from "./_zip";

import * as _brotli from "./_brotli";
import * as _deflate from "./_deflate";
import * as _gzip from "./_gzip";
import * as _zip from "./_zip";

// Deprecated constants
const Z_BINARY: typeof zlib.Z_BINARY = 0;
const Z_TEXT: typeof zlib.Z_TEXT = 1;
const Z_ASCII: typeof zlib.Z_ASCII = 1;
const Z_UNKNOWN: typeof zlib.Z_UNKNOWN = 2;
const Z_DEFLATED: typeof zlib.Z_DEFLATED = 8;

export default <typeof zlib>{
  ...constants,
  ..._brotli,
  ..._deflate,
  ..._gzip,
  ..._zip,
  codes,
  constants,
  Z_BINARY,
  Z_TEXT,
  Z_ASCII,
  Z_UNKNOWN,
  Z_DEFLATED,
};
