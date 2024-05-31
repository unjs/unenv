export interface Environment {
  alias: { [key: string]: string };
  inject: { [key: string]: string | string[] };
  polyfill: string[];
  external: string[];
}

export interface Preset {
  alias?: Environment["alias"];
  // inject's value is nullable to support overrides/subtraction
  inject?: { [key: string]: string | string[] | null };
  polyfill?: Environment["polyfill"];
  external?: Environment["external"];
}
