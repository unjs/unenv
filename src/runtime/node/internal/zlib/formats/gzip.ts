import type nodeZlib from "node:zlib";
import { notImplemented } from "../../../../_internal/utils.ts";
import {
  ZlibCompress,
  ZLibDecompress,
  notImplementedCompress,
} from "./_shared.ts";

// Gzip Compression

export class Gzip extends ZlibCompress {
  readonly _format = "gzip";
}

export const gzip: typeof nodeZlib.gzip = notImplementedCompress("gzip");

export const createGzip: typeof nodeZlib.createGzip = () => new Gzip();

export const gzipSync: typeof nodeZlib.gzipSync =
  /*@__PURE__*/ notImplemented("zlib.gzipSync");

// Gzip Decompression

export class Gunzip extends ZLibDecompress {
  readonly _format = "gzip";
}

export const gunzip: typeof nodeZlib.gunzip = notImplementedCompress("gunzip");

export const createGunzip: typeof nodeZlib.createGunzip = () => new Gunzip();

export const gunzipSync: typeof nodeZlib.gunzipSync =
  /*@__PURE__*/ notImplemented("zlib.gunzipSync");
