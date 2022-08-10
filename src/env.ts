import { normalizeAliases } from 'pathe/utils'
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
      Object.assign(_env.alias, normalizeAliases(preset.alias))
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
