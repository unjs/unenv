import type { Preset, Environment } from './types'
import { resolveRuntime, RUNTIME_DIR } from './utils'

export function env (...presets: Preset[]): Environment {
  const _env: Environment = {
    alias: {
      un: RUNTIME_DIR
    },
    inject: {},
    polyfill: [],
    external: []
  }

  for (const preset of presets) {
    // Alias
    if (preset.alias) {
      for (const from in preset.alias) {
        _env.alias[from] = resolveRuntime(preset.alias[from])
      }
    }

    // Inject
    if (preset.inject) {
      for (const global in preset.inject) {
        if (Array.isArray(preset.inject[global])) {
          const [id, ...path] = preset.inject[global]
          _env.inject[global] = [resolveRuntime(id), ...path]
        } else {
          _env.inject[global] = resolveRuntime(preset.inject[global] as string)
        }
      }
    }

    // Polyfill
    if (preset.polyfill) {
      _env.polyfill.push(
        ...(preset.polyfill.map(p => resolveRuntime(p)).filter(Boolean) as string[])
      )
    }

    // External
    if (preset.external) {
      _env.external.push(...preset.external)
    }
  }

  return _env
}
