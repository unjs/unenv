import { resolvePathSync, type ResolveOptions } from "mlly";
import type { Preset, Environment, CreateEnvOptions } from "../lib/index.d.mts";
import { version } from "../package.json" with { type: "json" };
import {
  nodeCompatAliases,
  nodeCompatInjects,
  npmCompatAliases,
} from "./preset";

export function defineEnv(opts: CreateEnvOptions = {}): {
  env: Environment;
  presets: Preset[];
} {
  const presets: Preset[] = [];

  // Dynamically create unenv preset
  presets.push(unenvPreset(opts));

  // Additional presets
  if (opts.presets) {
    presets.push(...opts.presets);
  }

  // Additional overrides
  if (opts.overrides) {
    presets.push(opts.overrides);
  }

  // Merge all presets
  const env = mergePresets(...presets);

  // Optionally resolve paths
  if (opts.resolve) {
    resolveEnvPaths(env, presets, opts);
  }

  return { env, presets };
}

function unenvPreset(opts: CreateEnvOptions) {
  const preset = {
    meta: {
      name: "unenv",
      version: version,
      url: import.meta.url,
    },
    alias: {},
    inject: {},
    external: [],
    polyfill: [],
  } satisfies Preset;

  if (opts.nodeCompat !== false) {
    Object.assign(preset.inject, nodeCompatInjects);
    Object.assign(preset.alias, {
      ...Object.fromEntries(
        Object.entries(nodeCompatAliases).flatMap(([from, to]) => {
          const aliases = [
            [from, to], // <id> => unenv/node/id
            [`node:${from}`, to], // node:<id> => unenv/node/id
          ];
          return aliases;
        }),
      ),
    });
  }

  if (opts.npmCompat !== false) {
    Object.assign(preset.alias, npmCompatAliases);
  }

  return preset;
}

function resolveEnvPaths(
  env: Environment,
  presets: Preset[],
  opts: CreateEnvOptions = {},
) {
  if (!opts.resolve) {
    return;
  }

  const resolvePaths: (string | URL)[] = [
    ...(opts.resolve === true ? [] : opts.resolve.paths || []),
    ...presets.map((preset) => preset.meta?.url).filter((v) => v !== undefined),
    import.meta.url,
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
    if (!id) {
      return id;
    }
    let resolved = _tryResolve(id);
    if (!resolved && id.startsWith("unenv/")) {
      resolved = _tryResolve(id.replace("unenv/", "unenv-nightly/"));
    }
    return resolved || id;
  };

  // Resolve aliases
  for (const alias in env.alias) {
    // @ts-expect-error readonly
    env.alias[alias] = _resolve(env.alias[alias]);
  }
  // Resolve polyfills
  for (let i = 0; i < env.polyfill.length; i++) {
    // @ts-expect-error readonly
    env.polyfill[i] = _resolve(env.polyfill[i]);
  }
  // Resolve injects
  for (const global in env.inject) {
    const inject = env.inject[global];
    if (Array.isArray(inject)) {
      const [id, ...path] = inject;
      // @ts-expect-error readonly
      env.inject[global] = [_resolve(id), ...path];
    } else {
      // @ts-expect-error readonly
      env.inject[global] = _resolve(inject);
    }
  }

  return env;
}

function mergePresets(...presets: Preset[]): Environment {
  const env = {
    alias: {} as Record<string, string>,
    inject: {} as Record<string, string | string[] | false>,
    polyfill: [] as string[],
    external: [] as string[],
  } satisfies Environment;

  for (const preset of presets) {
    // Alias
    if (preset.alias) {
      // Sort aliases from specific to general (ie. fs/promises before fs)
      const aliases = Object.keys(preset.alias).sort(
        (a, b) =>
          b.split("/").length - a.split("/").length || b.length - a.length,
      );
      for (const from of aliases) {
        env.alias[from] = preset.alias[from];
      }
    }

    // Inject
    if (preset.inject) {
      for (const global in preset.inject) {
        const globalValue = preset.inject[global];
        if (Array.isArray(globalValue)) {
          const [id, ...path] = globalValue;
          env.inject[global] = [id, ...path];
        } else if (globalValue === false) {
          delete env.inject[global];
        } else {
          env.inject[global] = globalValue as string;
        }
      }
    }

    // Polyfill
    if (preset.polyfill) {
      env.polyfill.push(...(preset.polyfill.filter(Boolean) as string[]));
    }

    // External
    if (preset.external) {
      env.external.push(...preset.external);
    }
  }

  env.polyfill = [...new Set(env.polyfill)];
  env.external = [...new Set(env.external)];

  return env;
}

console.log(defineEnv());
