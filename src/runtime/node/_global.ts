// Injectable version of `globalThis.global`.
// This is an odd one because `global` or `globalThis` (unlike `Buffer` or `process`)
// is not exposed as an export in any of the node:* modules.
export default globalThis;
