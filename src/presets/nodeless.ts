import { NodeBuiltinModules, mapArrToVal } from '../utils'
import type { Preset } from '../types'

const nodeless: Preset = {
  alias: {
    // Generic mock for built-ins
    ...mapArrToVal('unenv/runtime/mock/proxy-cjs', NodeBuiltinModules),

    // Built-ins implemented by unenv
    ...Object.fromEntries([
      'buffer',
      'events',
      'fs/promises',
      'fs',
      'http',
      'net',
      'path',
      'process',
      'stream/promises',
      'stream/consumers',
      'stream/web',
      'stream',
      'url',
      'util/types',
      'util'
    ].map(m => [m, `unenv/runtime/node/${m}/index`])),

    // npm
    etag: 'unenv/runtime/mock/noop',
    'mime-db': 'unenv/runtime/npm/mime-db',
    mime: 'unenv/runtime/npm/mime',
    'mime/lite': 'unenv/runtime/npm/mime',
    _mime: 'mime/lite.js',
    fsevents: 'unenv/runtime/npm/fsevents',
    'node-fetch': 'unenv/runtime/npm/node-fetch',
    'node-fetch-native/polyfill': 'unenv/runtime/mock/empty',
    'node-fetch-native': 'unenv/runtime/npm/node-fetch',
    'cross-fetch/polyfill': 'unenv/runtime/mock/empty',
    'cross-fetch': 'unenv/runtime/npm/cross-fetch',
    'isomorphic-fetch': 'unenv/runtime/mock/empty',
    inherits: 'unenv/runtime/npm/inherits'
  },

  inject: {
    process: 'unenv/runtime/polyfill/process',
    Buffer: ['buffer', 'Buffer']
  },

  polyfill: [
    'unenv/runtime/polyfill/process'
  ]
}

// Add node: aliases
for (const m of NodeBuiltinModules) {
  nodeless.alias![`node:${m}`] = nodeless.alias![m]
}

export default nodeless
