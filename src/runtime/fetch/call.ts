import { IncomingMessage } from '../node/http/_request'
import { ServerResponse } from '../node/http/_response'

export type Handle = (req: IncomingMessage, res: ServerResponse) => Promise <any>

export type CallHandle = ReturnType<typeof createCall>

export interface CallContext {
  [key: string]: any
  url?: string
  method?: string
  headers?: { [key: string]: string | string[] }
  protocol?: string
  body?: any
}

const TEXT_CONTENT_TYPE_RE = /^(image\/svg|application\/json|text\/)/

export function createCall (handle: Handle) {
  return function callHandle (context: CallContext) {
    const req = new IncomingMessage()
    const res = new ServerResponse(req)

    req.url = context.url || '/'
    req.method = context.method || 'GET'
    req.headers = context.headers || {}
    req.headers.host = req.headers.host || context.host || undefined

    // @ts-ignore
    req.connection.encrypted = req.connection.encrypted || context.protocol === 'https'

    // @ts-ignore
    req.body = context.body || null

    return handle(req, res).then(() => {
      const contentType = res._headers['content-type']?.toString()
      const isText = !contentType || TEXT_CONTENT_TYPE_RE.test(contentType)
      const r = {
        body: (isText ? (res._data as any)?.toString() : res._data) ?? '',
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
