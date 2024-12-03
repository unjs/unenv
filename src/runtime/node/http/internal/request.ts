import type http from "node:http";
import { Socket } from "node:net";
// importing from "unenv/runtime/node/stream/index" required for Readable.
import { Readable } from "unenv/runtime/node/stream/index";
import { rawHeaders } from "../../../_internal/utils";

// Docs: https://nodejs.org/api/http.html#http_class_http_incomingmessage
// Implementation: https://github.com/nodejs/node/blob/master/lib/_http_incoming.js

export class IncomingMessage extends Readable implements http.IncomingMessage {
  public __unenv__ = {};

  public aborted: boolean = false;
  public httpVersion: string = "1.1";
  public httpVersionMajor: number = 1;
  public httpVersionMinor: number = 1;
  public complete: boolean = true;
  public connection: Socket;
  public socket: Socket;
  public headers: http.IncomingHttpHeaders = {};
  public trailers = {};
  public method: string = "GET";
  public url: string = "/";
  public statusCode: number = 200;
  public statusMessage: string = "";
  public closed: boolean = false;
  public errored: Error | null = null;

  readable: boolean = false;

  constructor(socket?: Socket) {
    super();
    this.socket = this.connection = socket || new Socket();
  }

  get rawHeaders() {
    return rawHeaders(this.headers);
  }

  get rawTrailers() {
    return [];
  }

  setTimeout(_msecs: number, _callback?: () => void) {
    return this;
  }

  get headersDistinct() {
    return _distinct(this.headers);
  }

  get trailersDistinct() {
    return _distinct(this.trailers);
  }

  _read() {}
}

function _distinct(obj: Record<string, any>) {
  const d: Record<string, string[]> = {};
  for (const [key, value] of Object.entries(obj)) {
    if (key) {
      d[key as string] = (Array.isArray(value) ? value : [value]).filter(
        Boolean,
      );
    }
  }
  return d;
}
