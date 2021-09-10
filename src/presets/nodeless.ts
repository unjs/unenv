import { NodeBuiltinModules, mapArrToVal } from '../utils'
import type { Preset } from '../types'

export default {
  alias: {
    ...mapArrToVal('unenv/runtime/mock/proxy', NodeBuiltinModules),

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
    fsevents: 'unenv/runtime/npm/fsevents',
    _mime: 'mime/lite.js'
  },

  inject: {
    process: 'unenv/runtime/polyfill/process',
    Buffer: ['buffer', 'Buffer']
  },

  polyfill: [
    'unenv/runtime/polyfill/process'
  ]
} as Preset
