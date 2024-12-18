import { resolvePathSync, type ResolveOptions } from "mlly";
import type { Preset, Environment, CreateEnvOptions } from "./types";
import nodeCompatPreset from "./presets/nodeless";

/**
 * Configure a target environment.
 *
 * @example
 * ```ts
 * const { env } = defineEnv({
 *  nodeCompat: true,
 *  presets: [myPreset],
 *  overrides: {}
 * });
 */
export function defineEnv(opts: CreateEnvOptions = {}): {
  env: Environment;
  presets: Preset[];
} {
  const presets: Preset[] = [];

  if (opts.nodeCompat) {
    presets.push(nodeCompatPreset);
  }

  if (opts.presets) {
    presets.push(...opts.presets);
  }

  if (opts.overrides) {
    presets.push(opts.overrides);
  }

  const resolvedEnv = env(...presets);

  if (opts.resolve) {
    const resolvePaths: (string | URL)[] = [
      ...(opts.resolve === true ? [] : opts.resolve.paths || []),
      ...(presets
        .map((preset) => preset.meta?.url)
        .filter(Boolean) as string[]),
      __filename, // unenv
    ];
    const resolveOpts: ResolveOptions = {
      url: resolvePaths,
    };

    const _tryResolve = (id: string) => {
      try {
        return resolvePathSync(id, resolveOpts);
      } catch {}
    };

    const _resolve = (id: string) => {
      let resolved = _tryResolve(id);
      if (!resolved && id.startsWith("unenv/")) {
        resolved = _tryResolve(id.replace("unenv/", "unenv-nightly/"));
      }
      return resolved || id;
    };

    // Resolve aliases
    for (const alias in resolvedEnv.alias) {
      resolvedEnv.alias[alias] = _resolve(resolvedEnv.alias[alias]);
    }
    // Resolve polyfills
    for (let i = 0; i < resolvedEnv.polyfill.length; i++) {
      resolvedEnv.polyfill[i] = _resolve(resolvedEnv.polyfill[i]);
    }
    // Resolve injects
    for (const global in resolvedEnv.inject) {
      const inject = resolvedEnv.inject[global];
      if (Array.isArray(inject)) {
        const [id, ...path] = inject;
        resolvedEnv.inject[global] = [_resolve(id), ...path];
      } else {
        resolvedEnv.inject[global] = _resolve(inject);
      }
    }
  }

  return { env: resolvedEnv, presets };
}

/**
 * Merge presets into a final environment.
 * Later presets take precedence over earlier ones.
 */
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
        } else if (globalValue === false) {
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
