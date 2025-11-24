import { builtinModules } from "node:module";
import { resolveAlias } from "pathe/utils";
import { createResolver } from "exsolve";
import { version } from "../package.json" with { type: "json" };
import { nodeCompatAliases, nodeCompatInjects, npmShims } from "./preset";

import type {
  Preset,
  Environment,
  CreateEnvOptions,
  ResolvedEnvironment,
} from "./types";

/**
 * Configure a target environment.
 */
export function defineEnv(opts: CreateEnvOptions = {}): {
  env: ResolvedEnvironment;
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

  // resolve paths for each individual preset with meta.url
  if (opts.resolve) {
    for (const preset of presets) {
      if (preset.meta?.url) {
        resolvePaths(preset, [preset.meta.url], opts);
      }
    }
  }

  // Merge all presets
  const env = mergePresets(...presets);

  // resolve paths for merged presets
  if (opts.resolve) {
    resolvePaths(
      env,
      presets.map((preset) => preset.meta?.url).filter((v) => v !== undefined),
      opts,
    );
  }

  return { env, presets };
}

function unenvPreset(opts: CreateEnvOptions) {
  const preset = {
    meta: {
      name: "unenv",
      version,
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
          const aliases = from.startsWith("node:")
            ? [[from, to]] // node:<id> => unenv/node/id
            : [
                [from, to], // <id> => unenv/node/id
                [`node:${from}`, to], // node:<id> => unenv/node/id
              ];
          return aliases;
        }),
      ),
    });
  }

  if (opts.npmShims) {
    Object.assign(preset.alias, npmShims);
  }

  return preset;
}

function resolvePaths(
  env: Environment | Preset,
  from: (string | URL)[],
  opts: CreateEnvOptions = {},
) {
  if (!opts.resolve) {
    return;
  }

  const { resolveModulePath } = createResolver({
    from: [
      ...(opts.resolve === true ? [] : opts.resolve.paths || []),
      ...from,
      import.meta.url,
      process.cwd() + "/",
    ],
  });

  const _resolve = (id: string) => {
    if (!id) {
      return id;
    }
    if (env.alias) {
      id = resolveAlias(id, env.alias);
    }
    if (id.startsWith("node:")) {
      return id;
    }
    if (builtinModules.includes(id)) {
      return `node:${id}`;
    }
    let resolved = resolveModulePath(id, { try: true });
    if (!resolved && id.startsWith("unenv/")) {
      resolved = resolveModulePath(id.replace("unenv/", "unenv-nightly/"), {
        try: true,
      });
    }
    return resolved || id;
  };

  // Resolve aliases
  for (const alias in env.alias) {
    env.alias[alias] = _resolve(env.alias[alias]);
  }
  // Resolve polyfills
  if (env.polyfill) {
    for (let i = 0; i < env.polyfill.length; i++) {
      env.polyfill[i] = _resolve(env.polyfill[i]);
    }
  }
  // Resolve injects
  for (const global in env.inject) {
    const inject = env.inject[global];
    if (Array.isArray(inject)) {
      const [id, ...path] = inject;
      env.inject[global] = [_resolve(id), ...path];
    } else {
      env.inject[global] = inject ? _resolve(inject) : false;
    }
  }

  return env;
}

function mergePresets(...presets: Preset[]): ResolvedEnvironment {
  const env = {
    alias: {} as Record<string, string>,
    inject: {} as Record<string, string | string[]>,
    polyfill: [] as string[],
    external: [] as string[],
  } satisfies ResolvedEnvironment;

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
      for (const [global, globalValue] of Object.entries(preset.inject)) {
        if (Array.isArray(globalValue)) {
          env.inject[global] = globalValue;
        } else if (globalValue === false) {
          delete env.inject[global];
        } else {
          env.inject[global] = globalValue as string;
        }
      }
    }

    // Polyfill
    if (preset.polyfill) {
      env.polyfill.push(...preset.polyfill.filter(Boolean));
    }

    // External
    if (preset.external) {
      env.external.push(...preset.external);
    }
  }

  env.polyfill = resolveArray(env.polyfill);
  env.external = resolveArray(env.external);

  return env;
}

/**
 * - Deduplicates items
 * - Removes negate items with ! prefix
 */
function resolveArray(arr: string[]) {
  const set = new Set<string>(arr);
  for (const item of arr) {
    if (item.startsWith("!")) {
      set.delete(item);
      set.delete(item.slice(1));
    }
  }
  return [...set];
}
