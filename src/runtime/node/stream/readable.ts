import type * as stream from "node:stream";
import type { BufferEncoding, Callback } from "../../_internal/types";

import { EventEmitter } from "../events";

// Docs: https://nodejs.org/api/stream.html#stream_readable_streams
// Implementation: https://github.com/nodejs/node/blob/master/lib/internal/streams/readable.js

// eslint-disable-next-line unicorn/prefer-event-target
export class _Readable extends EventEmitter implements stream.Readable {
  __unenv__: unknown = true;

  readonly readableEncoding: BufferEncoding | null = null;
  readonly readableEnded: boolean = true;
  readonly readableFlowing: boolean | null = false;
  readonly readableHighWaterMark: number = 0;
  readonly readableLength: number = 0;
  readonly readableObjectMode: boolean = false;
  readonly readableAborted: boolean = false;
  readonly readableDidRead: boolean = false;
  readonly closed: boolean = false;
  readonly errored: Error | null = null;

  readable: boolean = false;
  destroyed: boolean = false;

  static from(
    _iterable: Iterable<any> | AsyncIterable<any>,
    options?: stream.ReadableOptions,
  ) {
    return new _Readable(options);
  }

  constructor(_opts?: stream.ReadableOptions) {
    super();
  }

  _read(_size: number) {}

  read(_size?: number) {}

  setEncoding(_encoding: BufferEncoding) {
    return this;
  }

  pause() {
    return this;
  }

  resume() {
    return this;
  }

  isPaused() {
    return true;
  }

  unpipe(_destination?: any) {
    return this;
  }

  unshift(_chunk: any, _encoding?: BufferEncoding) {}

  wrap(_oldStream: any) {
    return this;
  }

  push(_chunk: any, _encoding?: BufferEncoding) {
    return false;
  }

  _destroy(_error?: any, _callback?: Callback<any>) {
    this.removeAllListeners();
  }

  destroy(error?: Error) {
    this.destroyed = true;
    this._destroy(error);
    return this;
  }

  pipe<T>(_destenition: T, _options?: { end?: boolean }): T {
    return {} as T;
  }

  async *[Symbol.asyncIterator](): AsyncIterableIterator<any> {}

  compose<T extends NodeJS.ReadableStream>(
    stream: T | ((source: any) => void) | Iterable<T> | AsyncIterable<T>,
    options?: { signal: AbortSignal } | undefined,
  ): T {
    throw new Error("[h3] Method not implemented.");
  }
}

export const Readable: typeof stream.Readable =
  (globalThis as any).Readable || _Readable;
