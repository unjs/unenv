export interface Environment {
  alias: { [key: string]: string };
  inject: { [key: string]: string | string[] };
  polyfill: string[];
  external: string[];
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Preset extends Partial<Environment> {}
