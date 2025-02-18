import type nodeZlib from "node:zlib";
import { notImplemented } from "../../../../_internal/utils.ts";
import { ZlibCompress } from "./_shared.ts";

// Zip Decompression

export class Unzip extends ZlibCompress {
  readonly _format = "zip";
}

export const createUnzip: typeof nodeZlib.createUnzip = () => new Unzip();

export const unzip: typeof nodeZlib.unzip =
  /*@__PURE__*/ notImplemented("zlib.unzip");

export const unzipSync: typeof nodeZlib.unzipSync =
  /*@__PURE__*/ notImplemented("zlib.unzipSync");
