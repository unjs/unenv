import * as nodeFetch from 'node-fetch'
import _global from './global'

_global.fetch = _global.fetch || nodeFetch.default || nodeFetch
_global.Request = _global.Request || nodeFetch.Request
_global.Response = _global.Response || nodeFetch.Response
_global.Headers = _global.Headers || nodeFetch.Headers
