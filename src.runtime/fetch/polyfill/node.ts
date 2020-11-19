import fetch, { Request, Response, Headers } from 'node-fetch'

global.fetch = global.fetch || fetch
global.Request = global.Request || Request
global.Response = global.Response || Response
global.Headers = global.Headers || Headers
