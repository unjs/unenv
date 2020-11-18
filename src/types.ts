export interface Environment {
  alias: { [key: string]: string }
  inject: { [key: string]: string | string[] }
}

export interface Preset {
  alias?: { [key: string]: string }
  inject?: { [key: string]: string | string[] }
}
