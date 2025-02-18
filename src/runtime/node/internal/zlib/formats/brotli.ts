import type nodeZlib from "node:zlib";
import { notImplemented } from "../../../../_internal/utils.ts";
import {
  ZlibCompress,
  ZLibDecompress,
  notImplementedCompress,
} from "./_shared.ts";

// Brotli Compression

export class BrotliCompress extends ZlibCompress {
  readonly _format = "brotli";
}

export const brotliCompress: typeof nodeZlib.brotliCompress =
  notImplementedCompress("brotliCompress");

export const createBrotliCompress: typeof nodeZlib.createBrotliCompress = () =>
  new BrotliCompress();

export const brotliCompressSync: typeof nodeZlib.brotliCompressSync =
  /*@__PURE__*/ notImplemented("zlib.brotliCompressSync");

// Brotli Decompression

export class BrotliDecompress extends ZLibDecompress {
  readonly _format = "brotli";
}

export const brotliDecompress: typeof nodeZlib.brotliDecompress =
  notImplementedCompress("brotliDecompress");

export const createBrotliDecompress: typeof nodeZlib.createBrotliDecompress =
  () => new BrotliDecompress();

export const brotliDecompressSync: typeof nodeZlib.brotliDecompressSync =
  /*@__PURE__*/ notImplemented("zlib.brotliDecompressSync");
