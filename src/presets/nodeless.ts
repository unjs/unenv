import { NodeBuiltinModules, mapArrToVal } from '../utils'
import type { Preset } from '../types'

const nodeless: Preset = {
  alias: {
    ...mapArrToVal('unenv/runtime/mock/proxy-cjs', NodeBuiltinModules),

    // Custom
    http: 'unenv/runtime/node/http/index',
    net: 'unenv/runtime/node/net/index',
    stream: 'unenv/runtime/node/stream/index',
    url: 'unenv/runtime/node/url/index',
    process: 'unenv/runtime/polyfill/process',
    _process: 'process/browser.js',

    // Browserify
    buffer: 'buffer/index.js',
    util: 'util/util.js',
    events: 'events/events.js',
    inherits: 'inherits/inherits_browser.js',

    // npm
    etag: 'unenv/runtime/mock/noop',
    'mime-db': 'unenv/runtime/npm/mime-db',
    mime: 'unenv/runtime/npm/mime',
    _mime: 'mime/lite.js',
    fsevents: 'unenv/runtime/npm/fsevents',
    'node-fetch': 'unenv/runtime/npm/node-fetch',
    'cross-fetch': 'unenv/runtime/npm/cross-fetch',
    'cross-fetch/polyfill': 'unenv/runtime/mock/empty',
    'isomorphic-fetch': 'unenv/runtime/mock/empty'
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
