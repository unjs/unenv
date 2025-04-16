/**
 * Configure a target environment.
 */
export declare function defineEnv(opts?: CreateEnvOptions): {
  env: ResolvedEnvironment;
  presets: Preset[];
};

export interface CreateEnvOptions {
  /**
   * Node.js compatibility.
   *
   * - Add `alias` entries for Node.js builtins as `<id>` and `node:<id>`.
   * - Add `inject` entries for Node.js globals `global`, `Buffer`, and `process`.
   *
   * Default: `true`
   */
  nodeCompat?: boolean;

  /**
   * Add `alias` entries to replace npm packages like `node-fetch` with lighter shims.
   *
   * Default: `false`
   */
  npmShims?: boolean;

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

export interface EnvResolveOptions {
  /**
   * Paths to resolve imports from.
   *
   * Always unenv path is appended.
   */
  paths?: (string | URL)[];
}

/**
 * Environment defined by presets.
 */
export interface Environment {
  alias: Readonly<Record<string, string>>;
  // A `false` value is used to drop an inject entry from a parent Environment.
  inject: Readonly<Record<string, string | readonly string[] | false>>;
  polyfill: readonly string[];
  external: readonly string[];
}

/**
 * Environment returned by `defineEnv`.
 *
 * It differs from the preset's Environment as the `inject` map nevers contains a `false` value.
 */
export interface ResolvedEnvironment extends Environment {
  inject: Readonly<Record<string, string | readonly string[]>>;
}

export interface Preset extends Partial<Environment> {
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
}
