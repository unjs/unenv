import { NodeBuiltinModules } from '../utils'
import type { Preset } from '../types'

export default {
  alias: {
    'node-fetch': 'node-fetch/lib/index.js'
  },

  inject: {
    fetch: 'node-fetch',
    Request: ['node-fetch', 'Request'],
    Response: ['node-fetch', 'Response'],
    Headers: ['node-fetch', 'Headers']
  },

  polyfill: [
    'unenv/runtime/polyfill/fetch.node'
  ],

  external: [
    ...NodeBuiltinModules
  ]
} as Preset
