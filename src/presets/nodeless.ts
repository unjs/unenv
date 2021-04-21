import { NodeBuiltinModules, resolveAll } from '../utils'
import type { Preset } from '../types'

export default {
  alias: {
    ...resolveAll(NodeBuiltinModules, 'unenv/mock/proxy'),

    // Custom
    http: 'unenv/node/http',
    process: 'unenv/polyfill/process',
    _process: 'process/browser.js',

    // Browserify
    buffer: 'buffer/index.js',
    util: 'util/util.js',
    events: 'events/events.js',
    inherits: 'inherits/inherits_browser.js',

    // npm
    etag: 'unenv/mock/noop',
    'mime-db': 'unenv/npm/mime-db',
    mime: 'unenv/npm/mime',
    _mime: 'mime/lite.js'
  },

  inject: {
    process: 'unenv/polyfill/process',
    Buffer: ['buffer', 'Buffer']
  },

  polyfill: [
    'unenv/polyfill/process'
  ]
} as Preset
