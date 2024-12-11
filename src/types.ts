export interface CreateEnvOptions {
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

export interface EnvResolveOptions {
  /**
   * Paths to resolve imports from.
   *
   * Always unenv path is appended.
   */
  paths?: (string | URL)[];
}

export interface Environment {
  alias: { [key: string]: string };
  inject: { [key: string]: string | string[] };
  polyfill: string[];
  external: string[];
}

export interface Preset {
  alias?: Environment["alias"];
  // inject's value is nullable to support overrides/subtraction
  inject?: { [key: string]: string | string[] | false };
  polyfill?: Environment["polyfill"];
  external?: Environment["external"];
}
