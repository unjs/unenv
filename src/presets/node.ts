import { r } from '../utils'

import type { Preset } from '../types'

export default {
  alias: {
    'node-fetch': require.resolve('node-fetch/lib/index.js')
  },

  inject: {
    fetch: 'node-fetch',
    Request: ['node-fetch', 'Request'],
    Response: ['node-fetch', 'Response'],
    Headers: ['node-fetch', 'Headers']
  },

  polyfill: [
    r('polyfill/fetch.node')
  ]
} as Preset
