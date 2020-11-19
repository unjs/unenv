import { CallContext, CallHandle } from './call'
export * from './call'

export type FetchOptions = globalThis.RequestInit & CallContext

export function createFetch (call: CallHandle) {
  return async function fetch (input: string | Request, init: FetchOptions): Promise<Response> {
    const url = input.toString()
    if (!url.startsWith('/')) {
      return fetch(url, init)
    }
    try {
      const r = await call({ url, ...init })
      return new Response(r.body, {
        status: r.status,
        statusText: r.statusText,
        headers: Object.fromEntries(Object.entries(r.headers).map(
          ([name, value]) => [name, Array.isArray(value) ? value.join(',') : (value || '')])
        )
      })
    } catch (error) {
      return new Response(error.toString(), {
        status: parseInt(error.statusCode || error.code) || 500,
        statusText: error.statusText
      })
    }
  }
}
