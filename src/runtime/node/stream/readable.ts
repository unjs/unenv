import { EventEmitter } from "node:events";
import type * as stream from "node:stream";
import type { BufferEncoding, Callback } from "../../_internal/types";

// Docs: https://nodejs.org/api/stream.html#stream_readable_streams
// Implementation: https://github.com/nodejs/node/blob/master/lib/internal/streams/readable.js

// eslint-disable-next-line unicorn/prefer-event-target
export class Readable extends EventEmitter implements stream.Readable {
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
    options?: stream.ReadableOptions
  ) {
    return new Readable(options);
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
}
