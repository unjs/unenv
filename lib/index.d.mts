declare const NodeBuiltinModules: string[];
declare function mapArrToVal(val: any, arr: any[]): any;

interface CreateEnvOptions {
  /**
   * Enable Node.js compatibility (nodeless) preset.
   *
   * Default: `false`
   */
  nodeCompat?: boolean;
  /**
   * Additional presets.
   */
  presets?: Preset[];
  /**
   * Additional overrides.
   */
  overrides?: Partial<Environment>;
  /**
   * Resolve paths in the environment to absolute paths.
   *
   * Default: `false`
   */
  resolve?: boolean | EnvResolveOptions;
}

interface EnvResolveOptions {
  /**
   * Paths to resolve imports from.
   *
   * Always unenv path is appended.
   */
  paths?: (string | URL)[];
}

interface Environment {
  alias: {
    [key: string]: string;
  };
  inject: {
    [key: string]: string | string[];
  };
  polyfill: string[];
  external: string[];
}

interface Preset {
  meta?: {
    /**
     * Preset name.
     */
    readonly name?: string;
    /**
     * Preset version.
     */
    readonly version?: string;
    /**
     * Path or URL to preset entry (used for resolving absolute paths).
     */
    readonly url?: string | URL;
  };
  alias?: Environment["alias"];
  inject?: {
    [key: string]: string | string[] | false;
  };
  polyfill?: Environment["polyfill"];
  external?: Environment["external"];
}

declare const _default: Preset;

declare const nodeless: Preset & {
  alias: Map<string, string>;
};

declare const cloudflarePreset: Preset;

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
declare function defineEnv(opts?: CreateEnvOptions): {
  env: Environment;
  presets: Preset[];
};

/**
 * Merge presets into a final environment.
 * Later presets take precedence over earlier ones.
 */
declare function env(...presets: Preset[]): Environment;

export {
  type CreateEnvOptions,
  type EnvResolveOptions,
  type Environment,
  NodeBuiltinModules,
  type Preset,
  cloudflarePreset as cloudflare,
  defineEnv,
  env,
  mapArrToVal,
  _default as node,
  nodeless,
};
