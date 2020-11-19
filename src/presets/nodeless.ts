import { r, NodeBuiltinModules, mockAll } from '../utils'
import type { Preset } from '../types'

export default {
  alias: {
    ...mockAll(NodeBuiltinModules),

    // Custom
    http: r('node/http'),
    process: r('polyfill/process'),
    _process: require.resolve('process/browser.js'),

    // Browserify
    buffer: require.resolve('buffer/index.js'),
    util: require.resolve('util/util.js'),
    events: require.resolve('events/events.js'),
    inherits: require.resolve('inherits/inherits_browser.js'),

    // npm
    etag: r('mock/noop'),
    'mime-db': r('npm/mime-db'),
    mime: r('npm/mime'),
    _mime: require.resolve('mime/lite.js')
  },

  inject: {
    process: r('polyfill/process'),
    Buffer: ['buffer', 'Buffer']
  },

  polyfill: [
    r('polyfill/process')
  ]
} as Preset
