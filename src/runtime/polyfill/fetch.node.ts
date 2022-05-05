// @ts-ignore
import * as nodeFetch from 'node-fetch/src/index.js'
import AbortController from 'abort-controller'
import _global from './globalThis'

_global.fetch = _global.fetch || nodeFetch.default || nodeFetch
_global.Request = _global.Request || nodeFetch.Request
_global.Response = _global.Response || nodeFetch.Response
_global.Headers = _global.Headers || nodeFetch.Headers

_global.FormData = _global.FormData || nodeFetch.FormData
_global.Blob = _global.Blob || nodeFetch.Blob
_global.AbortController = _global.AbortController || AbortController
