export interface CreateEnvOptions {
  /**
   * Enable Node.js compatibility (nodeless) preset.
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
}

export interface Environment {
  alias: { [key: string]: string };
  inject: { [key: string]: string | string[] };
  polyfill: string[];
  external: string[];
}

export interface Preset {
  meta?: {
    /**
     * Preset name.
     */
    name?: string;

    /**
     * Preset version.
     */
    version?: string;

    /**
     * Path to preset directory usable for absolute path imports
     */
    path?: string;
  };

  alias?: Environment["alias"];
  // inject's value is nullable to support overrides/subtraction
  inject?: { [key: string]: string | string[] | false };
  polyfill?: Environment["polyfill"];
  external?: Environment["external"];
}
