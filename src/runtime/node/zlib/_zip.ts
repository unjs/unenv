import type zlib from "node:zlib";
import { notImplemented } from "../../_internal/utils";
import { ZlibCompress } from "./_shared";

// Zip Decompression

export class Unzip extends ZlibCompress {
  readonly _format = "zip";
}

export const createUnzip: typeof zlib.createUnzip = () => new Unzip();

export const unzip: typeof zlib.unzip = notImplemented("zlib.unzip");

export const unzipSync: typeof zlib.unzipSync =
  notImplemented("zlib.unzipSync");
