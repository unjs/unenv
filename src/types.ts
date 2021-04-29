export interface Environment {
  alias: { [key: string]: string }
  moduleDirectories: { [key: string]: string }
  inject: { [key: string]: string | string[] }
  polyfill: string[]
  external: string[]
}

export interface Preset extends Partial<Environment> {}
