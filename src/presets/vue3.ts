import { mockAll } from '../utils'
import type { Preset } from '../types'

export default {
  alias: {
    ...mockAll([
      '@babel/parser',
      '@vue/compiler-core',
      '@vue/compiler-dom',
      '@vue/compiler-ssr'
    ])
  }
} as Preset
