export interface Environment {
  alias: { [key: string]: string }
  inject: { [key: string]: string | string[] }
  polyfill: string[]
}

export interface Preset {
  alias?: { [key: string]: string }
  inject?: { [key: string]: string | string[] }
  polyfill?: string[]
}
