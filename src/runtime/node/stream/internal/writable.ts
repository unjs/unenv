import type * as stream from "node:stream";
import type { BufferEncoding, Callback } from "../../../_internal/types";

import { EventEmitter } from "../../events";

// Docs: https://nodejs.org/api/stream.html#stream_writable_streams
// Implementation: https://github.com/nodejs/node/blob/master/lib/internal/streams/writable.js
// eslint-disable-next-line unicorn/prefer-event-target
class _Writable extends EventEmitter implements stream.Writable {
  readonly __unenv__ = true;

  readonly writable: boolean = true;
  writableEnded: boolean = false;
  writableFinished: boolean = false;
  readonly writableHighWaterMark: number = 0;
  readonly writableLength: number = 0;
  readonly writableObjectMode: boolean = false;
  readonly writableCorked: number = 0;
  readonly closed: boolean = false;
  readonly errored: Error | null = null;
  readonly writableNeedDrain: boolean = false;

  destroyed: boolean = false;

  _data: unknown;
  _encoding: BufferEncoding = "utf-8";

  constructor(_opts?: stream.WritableOptions) {
    super();
  }

  pipe<T>(_destenition: T, _options?: { end?: boolean }): T {
    return {} as T;
  }

  _write(chunk: any, encoding: BufferEncoding, callback?: Callback): void {
    if (this.writableEnded) {
      if (callback) {
        callback();
      }
      return;
    }
    if (this._data === undefined) {
      this._data = chunk;
    } else {
      const a =
        typeof this._data === "string"
          ? Buffer.from(this._data, this._encoding || encoding || "utf8")
          : this._data;
      const b =
        typeof chunk === "string"
          ? Buffer.from(chunk, encoding || this._encoding || "utf8")
          : chunk;
      this._data = Buffer.concat([a, b]);
    }
    this._encoding = encoding;
    if (callback) {
      callback();
    }
  }

  _writev?(
    _chunks: Array<{ chunk: any; encoding: BufferEncoding }>,
    _callback: (error?: Error | null) => void,
  ): void {}

  _destroy(_error: any, _callback: Callback<any>): void {}

  _final(_callback: Callback) {}

  write(
    chunk: any,
    arg2?: BufferEncoding | Callback,
    arg3?: Callback,
  ): boolean {
    const encoding = typeof arg2 === "string" ? this._encoding : "utf-8";
    const cb =
      typeof arg2 === "function"
        ? arg2
        : typeof arg3 === "function"
          ? arg3
          : undefined;
    this._write(chunk, encoding, cb);
    return true;
  }

  setDefaultEncoding(_encoding: BufferEncoding): this {
    return this;
  }

  end(arg1: Callback | any, arg2?: Callback | BufferEncoding, arg3?: Callback) {
    const callback =
      typeof arg1 === "function"
        ? arg1
        : typeof arg2 === "function"
          ? arg2
          : typeof arg3 === "function"
            ? arg3
            : undefined;
    if (this.writableEnded) {
      if (callback) {
        callback();
      }
      return this;
    }
    const data = arg1 === callback ? undefined : arg1;
    if (data) {
      const encoding = arg2 === callback ? undefined : arg2;
      this.write(data, encoding, callback);
    }
    this.writableEnded = true;
    this.writableFinished = true;
    this.emit("close");
    this.emit("finish");
    return this;
  }

  cork(): void {}

  uncork(): void {}

  destroy(_error?: Error) {
    this.destroyed = true;
    delete this._data;
    this.removeAllListeners();
    return this;
  }

  compose<T extends NodeJS.ReadableStream>(
    stream: T | ((source: any) => void) | Iterable<T> | AsyncIterable<T>,
    options?: { signal: AbortSignal } | undefined,
  ): T {
    throw new Error("[h3] Method not implemented.");
  }
}

export const Writable: typeof stream.Writable =
  (globalThis as any).Writable || _Writable;
