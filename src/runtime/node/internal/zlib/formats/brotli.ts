import type zlib from "node:zlib";
import { notImplemented } from "../../../../_internal/utils";
import {
  ZlibCompress,
  ZLibDecompress,
  notImplementedCompress,
} from "./_shared";

// Brotli Compression

export class BrotliCompress extends ZlibCompress {
  readonly _format = "brotli";
}

export const brotliCompress: typeof zlib.brotliCompress =
  notImplementedCompress("brotliCompress");

export const createBrotliCompress: typeof zlib.createBrotliCompress = () =>
  new BrotliCompress();

export const brotliCompressSync: typeof zlib.brotliCompressSync =
  /*@__PURE__*/ notImplemented("zlib.brotliCompressSync");

// Brotli Decompression

export class BrotliDecompress extends ZLibDecompress {
  readonly _format = "brotli";
}

export const brotliDecompress: typeof zlib.brotliDecompress =
  notImplementedCompress("brotliDecompress");

export const createBrotliDecompress: typeof zlib.createBrotliDecompress = () =>
  new BrotliDecompress();

export const brotliDecompressSync: typeof zlib.brotliDecompressSync =
  /*@__PURE__*/ notImplemented("zlib.brotliDecompressSync");
