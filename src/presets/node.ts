import { NodeBuiltinModules } from '../utils'
import type { Preset } from '../types'

export default {
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
