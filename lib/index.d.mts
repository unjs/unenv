/**
 * Configure a target environment.
 */
export declare function defineEnv(opts?: CreateEnvOptions): {
  env: Environment;
  presets: Preset[];
};

export interface CreateEnvOptions {
  /**
   * Node.js compatibility aliases.
   *
   * Default: `true`
   */
  nodeCompat?: boolean;

  /**
   * NPM compatibility aliases.
   *
   * Default: `true`
   */
  npmCompat?: boolean;

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
