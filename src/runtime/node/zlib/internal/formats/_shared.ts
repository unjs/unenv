import type zlib from "node:zlib";
import { Transform, type TransformOptions } from "node:stream";
import { createNotImplementedError } from "../../../../_internal/utils";

// Compression

export abstract class ZlibCompress extends Transform {
  readonly __unenv__ = true;

  readonly bytesRead = 0;
  readonly bytesWritten = 0;

  abstract readonly _format:
    | undefined
    | "deflate"
    | "gzip"
    | "zlib"
    | "brotli"
    | "zip";

  constructor(opts?: TransformOptions) {
    super(opts);
    throw createNotImplementedError("zlib is not implemented yet!");
  }
  close(callback?: () => void) {
    if (typeof callback === "function") {
      callback();
    }
  }
  flush(kind?: number | undefined, callback?: (() => void) | undefined): void;
  flush(callback?: (() => void) | undefined): void;
  flush(kind?: unknown, callback?: unknown): void {
    if (typeof callback === "function") {
      callback();
    }
  }
}

// Decompression

export abstract class ZLibDecompress extends ZlibCompress {}

// Mock Compress/Decompress Function factory

export interface CompressFunction {
  (buf: zlib.InputType, options?: any, callback?: zlib.CompressCallback): void;
  (buf: Buffer, callback?: zlib.CompressCallback): void;
  __promisify__(buffer: zlib.InputType, options?: any): Promise<Buffer>;
}

export function notImplementedCompress(format: string): CompressFunction {
  const fn = function (
    _buf: zlib.InputType,
    arg2?: zlib.ZlibOptions | zlib.CompressCallback,
    arg3?: zlib.CompressCallback,
  ) {
    const cb = typeof arg2 === "function" ? arg2 : arg3;
    const err = new Error(`[unenv] zlib ${format} compression not supported.`);
    if (typeof cb === "function") {
      cb(err, Buffer.from(""));
    } else {
      throw err;
    }
  };
  return Object.assign(fn, {
    __promisify__: (buffer: zlib.InputType, options: any) => {
      return new Promise<Buffer>((resolve, reject) => {
        fn(buffer, options, (err, result) =>
          err ? reject(err) : resolve(result),
        );
      });
    },
  });
}
