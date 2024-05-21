// publish "global" on globalThis
if (!('global' in globalThis)) {
  globalThis.global = globalThis;
}
