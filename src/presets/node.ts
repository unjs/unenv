import { NodeBuiltinModules } from '../utils'
import type { Preset } from '../types'

export default {
  alias: {
    'node-fetch': 'unenv/runtime/npm/node-fetch',
    'cross-fetch': 'unenv/runtime/npm/cross-fetch',
    'cross-fetch/polyfill': 'unenv/runtime/mock/empty',
    'isomorphic-fetch': 'unenv/runtime/mock/empty'
  },

  polyfill: [
    'unenv/runtime/polyfill/fetch.node'
  ],

  external: [
    ...NodeBuiltinModules
  ]
} as Preset
