import type * as stream from "node:stream";
import type { BufferEncoding, Callback } from "../../../_internal/types";
import { createNotImplementedError } from "../../../_internal/utils";
import { EventEmitter } from "../../events";

// Docs: https://nodejs.org/api/stream.html#stream_readable_streams
// Implementation: https://github.com/nodejs/node/blob/master/lib/internal/streams/readable.js

interface ArrayOptions {
  /** the maximum concurrent invocations of `fn` to call on the stream at once. **Default: 1**. */
  concurrency?: number;
  /** allows destroying the stream if the signal is aborted. */
  signal?: AbortSignal;
}

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

  compose<T extends NodeJS.ReadableStream>(
    stream: T | ((source: any) => void) | Iterable<T> | AsyncIterable<T>,
    options?: { signal: AbortSignal } | undefined,
  ): T {
    throw new Error("[unenv] Method not implemented.");
  }

  [Symbol.asyncDispose]() {
    this.destroy();
    return Promise.resolve();
  }

  // eslint-disable-next-line require-yield
  async *[Symbol.asyncIterator](): AsyncIterableIterator<any> {
    throw createNotImplementedError("Readable.asyncIterator");
  }

  iterator(
    options?: { destroyOnReturn?: boolean | undefined } | undefined,
  ): AsyncIterableIterator<any> {
    throw createNotImplementedError("Readable.iterator");
  }

  map(
    fn: (data: any, options?: Pick<ArrayOptions, "signal"> | undefined) => any,
    options?: ArrayOptions | undefined,
  ): stream.Readable {
    throw createNotImplementedError("Readable.map");
  }

  filter(
    fn: (
      data: any,
      options?: Pick<ArrayOptions, "signal"> | undefined,
    ) => boolean,
    options?: ArrayOptions | undefined,
  ): stream.Readable {
    throw createNotImplementedError("Readable.filter");
  }

  forEach(
    fn: (
      data: any,
      options?: Pick<ArrayOptions, "signal"> | undefined,
    ) => void | Promise<void>,
    options?: ArrayOptions | undefined,
  ): Promise<void> {
    throw createNotImplementedError("Readable.forEach");
  }

  reduce(
    fn: (
      accumulator: any,
      data: any,
      options?: Pick<ArrayOptions, "signal"> | undefined,
    ) => any,
    initialValue?: any,
    options?: ArrayOptions | undefined,
  ): Promise<any> {
    throw createNotImplementedError("Readable.reduce");
  }

  find(
    fn: (
      data: any,
      options?: Pick<ArrayOptions, "signal"> | undefined,
    ) => boolean,
    options?: ArrayOptions | undefined,
  ): Promise<any> {
    throw createNotImplementedError("Readable.find");
  }

  findIndex(
    fn: (
      data: any,
      options?: Pick<ArrayOptions, "signal"> | undefined,
    ) => boolean,
    options?: ArrayOptions | undefined,
  ): Promise<number> {
    throw createNotImplementedError("Readable.findIndex");
  }

  some(
    fn: (
      data: any,
      options?: Pick<ArrayOptions, "signal"> | undefined,
    ) => boolean,
    options?: ArrayOptions | undefined,
  ): Promise<boolean> {
    throw createNotImplementedError("Readable.some");
  }

  toArray(options?: Pick<ArrayOptions, "signal"> | undefined): Promise<any[]> {
    throw createNotImplementedError("Readable.toArray");
  }

  every(
    fn: (
      data: any,
      options?: Pick<ArrayOptions, "signal"> | undefined,
    ) => boolean | Promise<boolean>,
    options?: ArrayOptions | undefined,
  ): Promise<boolean> {
    throw createNotImplementedError("Readable.every");
  }

  flatMap(
    fn: (data: any, options?: Pick<ArrayOptions, "signal"> | undefined) => any,
    options?: ArrayOptions | undefined,
  ): stream.Readable {
    throw createNotImplementedError("Readable.flatMap");
  }

  drop(
    limit: number,
    options?: Pick<ArrayOptions, "signal"> | undefined,
  ): stream.Readable {
    throw createNotImplementedError("Readable.drop");
  }

  take(
    limit: number,
    options?: Pick<ArrayOptions, "signal"> | undefined,
  ): stream.Readable {
    throw createNotImplementedError("Readable.take");
  }

  asIndexedPairs(
    options?: Pick<ArrayOptions, "signal"> | undefined,
  ): stream.Readable {
    throw createNotImplementedError("Readable.asIndexedPairs");
  }
}

export const Readable: typeof stream.Readable =
  (globalThis as any).Readable || _Readable;
