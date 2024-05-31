import { Transform } from "node:stream";
import { createNotImplementedError } from "src/runtime/_internal/utils";

export class Brotli extends Transform {
  readonly bytesRead = 0;
  readonly bytesWritten = 0;
  close(callback?: () => void) {
    throw createNotImplementedError("Brotli.close");
  }
  flush(kind?: number | undefined, callback?: (() => void) | undefined): void;
  flush(callback?: (() => void) | undefined): void;
  flush(kind?: unknown, callback?: unknown): void {
    throw createNotImplementedError("Brotli.flush");
  }
}

export class BrotliCompress extends Brotli {}
export class BrotliDecompress extends Brotli {}
export class Gzip extends Brotli {}
export class Gunzip extends Brotli {}

export class Deflate extends Brotli {
  params(level: number, strategy: number, callback: () => void) {
    throw createNotImplementedError("Deflate.params");
  }
  reset() {
    throw createNotImplementedError("Deflate.reset");
  }
}
export class DeflateRaw extends Deflate {}

export class Inflate extends Brotli {
  reset() {
    throw createNotImplementedError("Inflate.reset");
  }
}
export class InflateRaw extends Inflate {}
export class Unzip extends Brotli {}
