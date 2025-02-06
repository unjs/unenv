const _envShim = Object.create(null);
const _processEnv = globalThis.process?.env;

const _getEnv = (useShim?: boolean) =>
  _processEnv ||
  (globalThis as any).__env__ ||
  (useShim ? _envShim : globalThis);

export const env: NodeJS.Process["env"] = new Proxy(_envShim, {
  get(_, prop) {
    const env = _getEnv();
    return env[prop as string] ?? _envShim[prop];
  },
  has(_, prop) {
    const env = _getEnv();
    return prop in env || prop in _envShim;
  },
  set(_, prop, value) {
    const env = _getEnv(true);
    env[prop as string] = value;
    return true;
  },
  deleteProperty(_, prop) {
    const env = _getEnv(true);
    delete env[prop as string];
    return true;
  },
  ownKeys() {
    const env = _getEnv();
    return Object.keys(env);
  },
});
