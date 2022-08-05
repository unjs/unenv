import type { Preset, Environment } from './types'

export function env (...presets: Preset[]): Environment {
  const _env: Environment = {
    alias: {},
    inject: {},
    polyfill: [],
    external: []
  }

  for (const preset of presets) {
    // Alias
    if (preset.alias) {
      // Sort aliases from specific to general (ie. fs/promises before fs)
      const aliases = Object.keys(preset.alias).sort((a, b) =>
        (b.split('/').length - a.split('/').length) || (b.length - a.length)
      )
      for (const from of aliases) {
        _env.alias[from] = preset.alias[from]
      }
    }

    // Inject
    if (preset.inject) {
      for (const global in preset.inject) {
        if (Array.isArray(preset.inject[global])) {
          const [id, ...path] = preset.inject[global]
          _env.inject[global] = [id, ...path]
        } else {
          _env.inject[global] = preset.inject[global]
        }
      }
    }

    // Polyfill
    if (preset.polyfill) {
      _env.polyfill.push(...preset.polyfill.filter(Boolean) as string[])
    }

    // External
    if (preset.external) {
      _env.external.push(...preset.external)
    }
  }

  return _env
}
