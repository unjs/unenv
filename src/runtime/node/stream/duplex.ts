import type * as stream from "node:stream";
import { mergeFns } from "../../_internal/utils";
import { Readable } from "./readable";
import { Writable } from "./writable";

// Docs: https://nodejs.org/api/stream.html#stream_duplex_and_transform_streams
// Implementation: https://github.com/nodejs/node/blob/master/lib/internal/streams/duplex.js

type DuplexClass = new () => stream.Duplex;

const __Duplex: DuplexClass = class {
  allowHalfOpen: boolean = true;
  private _destroy: (error?: Error) => void;

  constructor(readable = new Readable(), writable = new Writable()) {
    Object.assign(this, readable);
    Object.assign(this, writable);
    this._destroy = mergeFns(readable._destroy, writable._destroy);
  }
} as any;

function getDuplex() {
  Object.assign(__Duplex.prototype, Readable.prototype);
  Object.assign(__Duplex.prototype, Writable.prototype);
  return __Duplex;
}

export const _Duplex = /* #__PURE__ */ getDuplex();

export const Duplex: typeof stream.Duplex =
  (globalThis as any).Duplex || _Duplex;
