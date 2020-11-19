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
  }
} as Preset
