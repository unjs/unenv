import type { Preset, Environment } from './types'

export function env (...presets: Preset[]) {
  const options: Environment = {
    alias: {},
    inject: {}
  }

  for (const preset of presets) {
    if (preset.alias) {
      Object.assign(options.alias, preset.alias)
    }
    if (preset.inject) {
      Object.assign(options.alias, preset.inject)
    }
  }

  return options
}
