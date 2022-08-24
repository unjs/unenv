import { CallContext, CallHandle } from './call'
export * from './call'

export type FetchOptions = globalThis.RequestInit & CallContext

export function createFetch (call: CallHandle, _fetch = global.fetch) {
  return async function ufetch (input: string | Request, init: FetchOptions): Promise<Response> {
    const url = input.toString()
    if (!url.startsWith('/')) {
      return _fetch(url, init)
    }
    try {
      const r = await call({ url, ...init })
      // TODO: Ensure body is either of BodyInit types
      // Blob | ArrayBUffer | TypedArray | DataView | FormData | ReadableStream | URLSearchParams | String
      return new Response(r.body as any, {
        status: r.status,
        statusText: r.statusText,
        headers: Object.fromEntries(Object.entries(r.headers).map(
          ([name, value]) => [name, Array.isArray(value) ? value.join(',') : (value || '')])
        )
      })
    } catch (error: any) {
      return new Response(error.toString(), {
        status: parseInt(error.statusCode || error.code) || 500,
        statusText: error.statusText
      })
    }
  }
}
