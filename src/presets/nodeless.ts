import { NodeBuiltinModules, resolveAll } from '../utils'
import type { Preset } from '../types'

export default {
  alias: {
    ...resolveAll(NodeBuiltinModules, 'un/mock/proxy'),

    // Custom
    http: 'un/node/http',
    process: 'un/polyfill/process',
    _process: 'process/browser.js',

    // Browserify
    buffer: 'buffer/index.js',
    util: 'util/util.js',
    events: 'events/events.js',
    inherits: 'inherits/inherits_browser.js',

    // npm
    etag: 'un/mock/noop',
    'mime-db': 'un/npm/mime-db',
    mime: 'un/npm/mime',
    _mime: 'mime/lite.js'
  },

  inject: {
    process: 'un/polyfill/process',
    Buffer: ['buffer', 'Buffer']
  },

  polyfill: [
    'un/polyfill/process'
  ]
} as Preset
