import type nodeZlib from "node:zlib";
import { createNotImplementedError } from "../../../../_internal/utils.ts";
import { notImplemented } from "../../../../_internal/utils.ts";
import {
  ZlibCompress,
  ZLibDecompress,
  notImplementedCompress,
} from "./_shared.ts";

// Deflate Compression

export class Deflate extends ZlibCompress {
  readonly _format = "deflate";

  params(level: number, strategy: number, callback: () => void) {
    throw createNotImplementedError("Deflate.params");
  }
  reset() {
    throw createNotImplementedError("Deflate.reset");
  }
}

export const deflate: typeof nodeZlib.deflate =
  notImplementedCompress("deflate");

export const createDeflate: typeof nodeZlib.createDeflate = () => new Deflate();

export const deflateSync: typeof nodeZlib.deflateSync =
  /*@__PURE__*/ notImplemented("zlib.deflateSync");

// Deflate Decompress(Inflate)

export class Inflate extends ZLibDecompress {
  readonly _format = "deflate";

  reset() {
    throw createNotImplementedError("Inflate.reset");
  }
}

export const inflate: typeof nodeZlib.inflate =
  notImplementedCompress("inflate");

export const createInflate: typeof nodeZlib.createInflate = () => new Inflate();

export const inflateSync: typeof nodeZlib.inflateSync =
  /*@__PURE__*/ notImplemented("zlib.inflateSync");

// Deflate Raw Compression

export class DeflateRaw extends Deflate {}

export const deflateRaw: typeof nodeZlib.deflateRaw =
  notImplementedCompress("deflateRaw");

export const createDeflateRaw: typeof nodeZlib.createDeflateRaw = () =>
  new DeflateRaw();

export const deflateRawSync: typeof nodeZlib.deflateRawSync =
  /*@__PURE__*/ notImplemented("zlib.deflateRawSync");

// Inflate Raw Decompress (Inflate Raw)

export class InflateRaw extends Inflate {}

export const inflateRaw: typeof nodeZlib.inflateRaw =
  notImplementedCompress("inflateRaw");

export const createInflateRaw: typeof nodeZlib.createInflateRaw = () =>
  new InflateRaw();

export const inflateRawSync: typeof nodeZlib.inflateRawSync =
  /*@__PURE__*/ notImplemented("zlib.inflateRawSync");
