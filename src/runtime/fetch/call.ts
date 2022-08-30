import { IncomingMessage } from '../node/http/_request'
import { ServerResponse } from '../node/http/_response'

export type Handle = (req: IncomingMessage, res: ServerResponse) => Promise <any>

export type CallHandle = ReturnType<typeof createCall>

export interface CallContext {
  [key: string]: any
  url?: string
  method?: string
  headers?: Headers | { [key: string]: string | string[] }
  protocol?: string
  body?: any
}

export function createCall (handle: Handle) {
  return function callHandle (context: CallContext) {
    const req = new IncomingMessage()
    const res = new ServerResponse(req)

    req.url = context.url || '/'
    req.method = context.method || 'GET'
    req.headers = {};
    if (context.headers) {
      const headerEntries = typeof context.headers.entries === 'function'
        ? context.headers.entries()
        : Object.entries(context.headers)
      for (const [name, value] of headerEntries) {
        if (!value) { continue }
        req.headers[name.toLowerCase()] = value
      }
    }
    req.headers.host = req.headers.host || context.host || 'localhost'

    // @ts-ignore
    req.connection.encrypted = req.connection.encrypted || context.protocol === 'https'

    // @ts-ignore
    req.body = context.body || null

    return handle(req, res).then(() => {
      // TODO: Ensure _data is either of BodyInit (or narrower) types
      // Blob | ArrayBUffer | TypedArray | DataView | FormData | ReadableStream | URLSearchParams | String
      const r = {
        body: res._data as BodyInit || '',
        headers: res._headers,
        status: res.statusCode,
        statusText: res.statusMessage
      }

      req.destroy()
      res.destroy()

      return r
    })
  }
}
