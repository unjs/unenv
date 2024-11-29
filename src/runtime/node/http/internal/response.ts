import type nodeHttp from "node:http";
import type nodeStream from "node:stream";
import type { Socket } from "node:net";
import { Callback } from "../../../_internal/types";

// Docs: https://nodejs.org/api/http.html#http_class_http_serverresponse
// Implementation: https://github.com/nodejs/node/blob/master/lib/_http_outgoing.js

export const ServerResponseFactory = (
  Writeable: typeof nodeStream.Writable,
): typeof nodeHttp.ServerResponse<nodeHttp.IncomingMessage> =>
  class extends Writeable implements nodeHttp.ServerResponse {
    readonly __unenv__ = true;

    statusCode: number = 200;
    statusMessage: string = "";
    upgrading: boolean = false;
    chunkedEncoding: boolean = false;
    shouldKeepAlive: boolean = false;
    useChunkedEncodingByDefault: boolean = false;
    sendDate: boolean = false;
    finished: boolean = false;
    headersSent: boolean = false;
    strictContentLength = false;
    connection: Socket | null = null;
    socket: Socket | null = null;

    req: nodeHttp.IncomingMessage;

    _headers: Record<string, number | string | string[] | undefined> = {};

    constructor(req: nodeHttp.IncomingMessage) {
      super();
      this.req = req;
    }

    assignSocket(socket: Socket): void {
      // @ts-ignore
      socket._httpMessage = this;
      // socket.on('close', onServerResponseClose)
      this.socket = socket;
      this.connection = socket;
      this.emit("socket", socket);
      this._flush();
    }

    _flush() {
      this.flushHeaders();
    }

    detachSocket(_socket: Socket): void {}

    writeContinue(_callback?: Callback): void {}

    writeHead(
      statusCode: number,
      arg1?:
        | string
        | nodeHttp.OutgoingHttpHeaders
        | nodeHttp.OutgoingHttpHeader[],
      arg2?: nodeHttp.OutgoingHttpHeaders | nodeHttp.OutgoingHttpHeader[],
    ) {
      if (statusCode) {
        this.statusCode = statusCode;
      }
      if (typeof arg1 === "string") {
        this.statusMessage = arg1;
        arg1 = undefined;
      }
      const headers = arg2 || arg1;
      if (headers) {
        if (Array.isArray(headers)) {
          // TODO: OutgoingHttpHeader[]
        } else {
          for (const key in headers) {
            // @ts-ignore
            this.setHeader(key, headers[key]);
          }
        }
      }
      this.headersSent = true;
      return this;
    }

    writeProcessing(): void {}

    setTimeout(_msecs: number, _callback?: Callback): this {
      return this;
    }

    appendHeader(name: string, value: string | string[]) {
      name = name.toLowerCase();
      const current = this._headers[name];
      const all = [
        ...(Array.isArray(current) ? current : [current]),
        ...(Array.isArray(value) ? value : [value]),
      ].filter(Boolean) as string[];
      this._headers[name] = all.length > 1 ? all : all[0];
      return this;
    }

    setHeader(name: string, value: number | string | readonly string[]): this {
      this._headers[name.toLowerCase()] = Array.isArray(value)
        ? ([...value] as string[])
        : (value as number | string);
      return this;
    }

    setHeaders(
      headers: Headers | Map<string, number | string | readonly string[]>,
    ): this {
      for (const [key, value] of headers.entries()) {
        this.setHeader(key, value);
      }
      return this;
    }

    getHeader(name: string): number | string | string[] | undefined {
      return this._headers[name.toLowerCase()];
    }

    getHeaders(): nodeHttp.OutgoingHttpHeaders {
      return this._headers;
    }

    getHeaderNames(): string[] {
      return Object.keys(this._headers);
    }

    hasHeader(name: string): boolean {
      return name.toLowerCase() in this._headers;
    }

    removeHeader(name: string): void {
      delete this._headers[name.toLowerCase()];
    }

    addTrailers(
      _headers: nodeHttp.OutgoingHttpHeaders | ReadonlyArray<[string, string]>,
    ): void {}

    flushHeaders(): void {}

    writeEarlyHints(
      _headers: nodeHttp.OutgoingHttpHeaders,
      cb: () => void,
    ): void {
      if (typeof cb === "function") {
        cb();
      }
    }
  };
