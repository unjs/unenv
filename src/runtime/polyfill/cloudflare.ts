type GlobalThis = typeof globalThis;
interface GlobalThisPlusEnv extends GlobalThis {
  __env__: typeof process.env;
}

(globalThis as GlobalThisPlusEnv).__env__ = {};
