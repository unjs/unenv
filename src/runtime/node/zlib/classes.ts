import { Transform } from "node:stream";

export class Brotli extends Transform {
  readonly bytesRead = 0;
  readonly bytesWritten = 0;
  close(callback?: () => void) {}
  flush(kind?: number | undefined, callback?: (() => void) | undefined): void;
  flush(callback?: (() => void) | undefined): void;
  flush(kind?: unknown, callback?: unknown): void {}
}

export class BrotliCompress extends Brotli {}
export class BrotliDecompress extends Brotli {}
export class Gzip extends Brotli {}
export class Gunzip extends Brotli {}

export class Deflate extends Brotli {
  params(level: number, strategy: number, callback: () => void) {}
  reset() {}
}
export class DeflateRaw extends Deflate {}

export class Inflate extends Brotli {
  reset() {}
}
export class InflateRaw extends Inflate {}
export class Unzip extends Brotli {}
