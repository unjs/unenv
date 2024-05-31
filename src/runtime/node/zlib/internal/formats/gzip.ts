import type zlib from "node:zlib";
import { notImplemented } from "../../../../_internal/utils";
import {
  ZlibCompress,
  ZLibDecompress,
  notImplementedCompress,
} from "./_shared";

// Gzip Compression

export class Gzip extends ZlibCompress {
  readonly _format = "gzip";
}

export const gzip: typeof zlib.gzip = notImplementedCompress("gzip");

export const createGzip: typeof zlib.createGzip = () => new Gzip();

export const gzipSync: typeof zlib.gzipSync = notImplemented("zlib.gzipSync");

// Gzip Decompression

export class Gunzip extends ZLibDecompress {
  readonly _format = "gzip";
}

export const gunzip: typeof zlib.gunzip = notImplementedCompress("gunzip");

export const createGunzip: typeof zlib.createGunzip = () => new Gunzip();

export const gunzipSync: typeof zlib.gunzipSync =
  notImplemented("zlib.gunzipSync");
