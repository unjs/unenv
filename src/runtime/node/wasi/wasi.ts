import type wasi from "node:wasi";

export class WASI implements wasi.WASI {
  getImportObject() {
    return {};
  }
  start(instance: object) {
    return 0;
  }
  initialize(instance: object): void {}
  wasiImport = {};
}
