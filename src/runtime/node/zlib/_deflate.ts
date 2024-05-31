import type zlib from "node:zlib";
import { createNotImplementedError } from "../../_internal/utils";
import { notImplemented } from "../../_internal/utils";
import {
  ZlibCompress,
  ZLibDecompress,
  notImplementedCompress,
} from "./_shared";

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

export const deflate: typeof zlib.deflate = notImplementedCompress("deflate");

export const createDeflate: typeof zlib.createDeflate = () => new Deflate();

export const deflateSync: typeof zlib.deflateSync =
  notImplemented("zlib.deflateSync");

// Deflate Decompress(Inflate)

export class Inflate extends ZLibDecompress {
  readonly _format = "deflate";

  reset() {
    throw createNotImplementedError("Inflate.reset");
  }
}

export const inflate: typeof zlib.inflate = notImplementedCompress("inflate");

export const createInflate: typeof zlib.createInflate = () => new Inflate();

export const inflateSync: typeof zlib.inflateSync =
  notImplemented("zlib.inflateSync");

// Deflate Raw Compression

export class DeflateRaw extends Deflate {}

export const deflateRaw: typeof zlib.deflateRaw =
  notImplementedCompress("deflateRaw");

export const createDeflateRaw: typeof zlib.createDeflateRaw = () =>
  new DeflateRaw();

export const deflateRawSync: typeof zlib.deflateRawSync = notImplemented(
  "zlib.deflateRawSync",
);

// Inflate Raw Decompress (Inflate Raw)

export class InflateRaw extends Inflate {}

export const inflateRaw: typeof zlib.inflateRaw =
  notImplementedCompress("inflateRaw");

export const createInflateRaw: typeof zlib.createInflateRaw = () =>
  new InflateRaw();

export const inflateRawSync: typeof zlib.inflateRawSync = notImplemented(
  "zlib.inflateRawSync",
);
