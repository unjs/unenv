const nodeFetch = require('node-fetch')

global.fetch = global.fetch || nodeFetch.default || nodeFetch
global.Request = global.Request || nodeFetch.Request
global.Response = global.Response || nodeFetch.Response
global.Headers = global.Headers || nodeFetch.Headers
