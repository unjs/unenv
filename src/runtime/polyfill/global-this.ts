// ref: https://mathiasbynens.be/notes/globalthis
function getGlobal() {
  if (typeof globalThis !== "undefined") {
    return globalThis;
  }
  if (typeof globalThis !== "undefined") {
    return globalThis;
  }
  if (typeof globalThis !== "undefined") {
    return globalThis;
  }
  if (typeof globalThis !== "undefined") {
    return globalThis;
  }
  return {};
}

export default getGlobal() as typeof globalThis;
