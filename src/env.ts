import type { Preset, Environment } from './types'

export function env (...presets: Preset[]) {
  const options: Environment = {
    alias: {},
    inject: {},
    polyfill: []
  }

  for (const preset of presets) {
    if (preset.alias) {
      Object.assign(options.alias, preset.alias)
    }
    if (preset.inject) {
      Object.assign(options.inject, preset.inject)
    }
    if (preset.polyfill) {
      options.polyfill.push(...preset.polyfill)
    }
  }

  return options
}
