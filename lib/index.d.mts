/**
 * Configure a target environment.
 */
export declare function defineEnv(opts?: CreateEnvOptions): {
  env: Environment;
  presets: Preset[];
};

export interface CreateEnvOptions {
  /**
   * - Add `alias` entries for Node.js builtins both as `id` and `node:id`.
   * - Add `inject` entries for Node.js globals `global`, `Buffer`, and `process`.
   *
   * Default: `true`
   */
  nodeCompat?: boolean;

  /**
   * Add `alias` entries to replace common NPM packages such as `node-fetch` with native Web APIs.
   *
   * Default: `true`
   */
  npmShims?: boolean;

  /**
   * Add `alias` entries to replace npm packages with the same name of Node.js built-in modules.
   *
   * Default: `true`
   */
  npmNodeShims?: boolean;

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

export interface Environment {
  alias: Readonly<Record<string, string>>;
  inject: Readonly<Record<string, string | readonly string[] | false>>;
  polyfill: readonly string[];
  external: readonly string[];
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
