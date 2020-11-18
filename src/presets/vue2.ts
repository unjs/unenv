import { mockAll } from '../utils'
import type { Preset } from '../types'

export default {
  alias: {
    ...mockAll([
      'encoding',
      'he',
      'resolve',
      'source-map',
      'lodash.template',
      'serialize-javascript'
    ])
  }
} as Preset
