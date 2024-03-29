// https://github.com/lquixada/cross-fetch

export const fetch = (...args: Parameters<(typeof globalThis)["fetch"]>) =>
  globalThis.fetch(...args);
export default fetch;

export const Headers = globalThis.Headers;
export const Request = globalThis.Request;
export const Response = globalThis.Response;
