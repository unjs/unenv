import type zlib from "node:zlib";
import { constants } from "./constants";
import { codes } from "./codes";
import {
  BrotliCompress,
  BrotliDecompress,
  Deflate,
  DeflateRaw,
  Gunzip,
  Gzip,
  Inflate,
  InflateRaw,
  Unzip,
} from "./classes";

export { constants } from "./constants";
export { codes } from "./codes";
export {
  BrotliCompress,
  BrotliDecompress,
  Deflate,
  DeflateRaw,
  Gunzip,
  Gzip,
  Inflate,
  InflateRaw,
  Unzip,
} from "./classes";

const promisifiedBuffer = Object.assign(() => {}, {
  __promisify__: () => Promise.resolve(Buffer.from("")),
});
const bufferNoop = () => Buffer.from("");

export const brotliCompress: typeof zlib.brotliCompress = promisifiedBuffer;

export const brotliCompressSync: typeof zlib.brotliCompressSync = bufferNoop;

export const brotliDecompress: typeof zlib.brotliDecompress = promisifiedBuffer;

export const brotliDecompressSync: typeof zlib.brotliDecompressSync =
  bufferNoop;

export const createBrotliCompress: typeof zlib.createBrotliCompress = () =>
  new BrotliCompress();

export const createBrotliDecompress: typeof zlib.createBrotliDecompress = () =>
  new BrotliCompress();

export const createDeflate: typeof zlib.createDeflate = () => new Deflate();

export const createDeflateRaw: typeof zlib.createDeflateRaw = () =>
  new Deflate();

export const createGunzip: typeof zlib.createGunzip = () =>
  new BrotliCompress();

export const createGzip: typeof zlib.createGzip = () => new BrotliCompress();

export const createInflate: typeof zlib.createInflate = () => new Inflate();

export const createInflateRaw: typeof zlib.createInflateRaw = () =>
  new Inflate();

export const createUnzip: typeof zlib.createUnzip = () => new BrotliCompress();

export const deflate: typeof zlib.deflate = promisifiedBuffer;

export const deflateRaw: typeof zlib.deflateRaw = promisifiedBuffer;

export const deflateRawSync: typeof zlib.deflateRawSync = bufferNoop;

export const deflateSync: typeof zlib.deflateSync = bufferNoop;

export const gunzip: typeof zlib.gunzip = promisifiedBuffer;

export const gunzipSync: typeof zlib.gunzipSync = bufferNoop;

export const gzip: typeof zlib.gzip = promisifiedBuffer;

export const gzipSync: typeof zlib.gzipSync = bufferNoop;

export const inflate: typeof zlib.inflate = promisifiedBuffer;

export const inflateRaw: typeof zlib.inflateRaw = promisifiedBuffer;

export const inflateRawSync: typeof zlib.inflateRawSync = bufferNoop;

export const inflateSync: typeof zlib.inflateSync = bufferNoop;

export const unzip: typeof zlib.unzip = promisifiedBuffer;

export const unzipSync: typeof zlib.unzipSync = bufferNoop;

const Z_BINARY: typeof zlib.Z_BINARY = 0;
const Z_TEXT: typeof zlib.Z_TEXT = 1;
const Z_ASCII: typeof zlib.Z_ASCII = 1;
const Z_UNKNOWN: typeof zlib.Z_UNKNOWN = 2;
const Z_DEFLATED: typeof zlib.Z_DEFLATED = 8;

export default <typeof zlib>{
  ...constants,
  BrotliCompress,
  BrotliDecompress,
  Deflate,
  DeflateRaw,
  Gunzip,
  Gzip,
  Inflate,
  InflateRaw,
  Unzip,
  brotliCompress,
  brotliCompressSync,
  brotliDecompress,
  brotliDecompressSync,
  codes,
  constants,
  createBrotliCompress,
  createBrotliDecompress,
  createDeflate,
  createDeflateRaw,
  createGunzip,
  createGzip,
  createInflate,
  createInflateRaw,
  createUnzip,
  deflate,
  deflateRaw,
  deflateRawSync,
  deflateSync,
  gunzip,
  gunzipSync,
  gzip,
  gzipSync,
  inflate,
  inflateRaw,
  inflateRawSync,
  inflateSync,
  unzip,
  unzipSync,
  Z_BINARY,
  Z_TEXT,
  Z_ASCII,
  Z_UNKNOWN,
  Z_DEFLATED,
};
