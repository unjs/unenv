import type { Preset, Environment } from "./types";

export function env(...presets: Preset[]): Environment {
  const _env: Environment = {
    alias: {},
    inject: {},
    polyfill: [],
    external: [],
  };

  for (const preset of presets) {
    // Alias
    if (preset.alias) {
      // Sort aliases from specific to general (ie. fs/promises before fs)
      const aliases = Object.keys(preset.alias).sort(
        (a, b) =>
          b.split("/").length - a.split("/").length || b.length - a.length,
      );
      for (const from of aliases) {
        _env.alias[from] = preset.alias[from];
      }
    }

    // Inject
    if (preset.inject) {
      for (const global in preset.inject) {
        const globalValue = preset.inject[global];
        if (Array.isArray(globalValue)) {
          const [id, ...path] = globalValue;
          _env.inject[global] = [id, ...path];
        } else if (globalValue === null) {
          delete _env.inject[global];
        } else {
          _env.inject[global] = globalValue;
        }
      }
    }

    // Polyfill
    if (preset.polyfill) {
      _env.polyfill.push(...(preset.polyfill.filter(Boolean) as string[]));
    }

    // External
    if (preset.external) {
      _env.external.push(...preset.external);
    }
  }

  return _env;
}
