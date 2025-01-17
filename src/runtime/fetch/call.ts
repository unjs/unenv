import { IncomingMessage } from "../node/internal/http/request";
import { ServerResponse } from "../node/internal/http/response";

export type Handle = (
  req: IncomingMessage,
  res: ServerResponse,
) => Promise<any>;

export type CallHandle = ReturnType<typeof createCall>;

export interface CallContext {
  [key: string]: any;
  url?: string;
  method?: string;
  headers?: Headers | { [key: string]: string | string[] };
  protocol?: string;
  body?: any;
}

const nullBodyResponses = new Set([101, 204, 205, 304]);

export function createCall(handle: Handle) {
  return function callHandle(context: CallContext) {
    const req = new IncomingMessage();
    const res = new ServerResponse(req);

    req.url = context.url || "/";
    req.method = context.method || "GET";
    req.headers = {};
    if (context.headers) {
      const headerEntries =
        typeof context.headers.entries === "function"
          ? context.headers.entries()
          : Object.entries(context.headers);
      for (const [name, value] of headerEntries) {
        if (!value) {
          continue;
        }
        req.headers[name.toLowerCase()] = value;
      }
    }
    req.headers.host = req.headers.host || context.host || "localhost";

    // @ts-ignore
    req.connection.encrypted =
      // @ts-ignore
      req.connection.encrypted || context.protocol === "https";

    // @ts-ignore
    req.body = context.body || null;

    // @ts-ignore
    req.__unenv__ = context.context;

    return handle(req, res).then(() => {
      // https://developer.mozilla.org/en-US/docs/Web/API/Response/body
      // TODO: Ensure _data is either of BodyInit (or narrower) types
      // Blob | ArrayBuffer | TypedArray | DataView | FormData | ReadableStream | URLSearchParams | String
      let body = (res as any)._data as BodyInit | null;
      if (
        nullBodyResponses.has(res.statusCode) ||
        req.method.toUpperCase() === "HEAD"
      ) {
        body = null;
        delete res._headers["content-length"];
      }

      const r = {
        body,
        headers: res._headers,
        status: res.statusCode,
        statusText: res.statusMessage,
      };

      req.destroy();
      res.destroy();

      return r;
    });
  };
}
