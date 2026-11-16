// https://www.npmjs.com/package/safer-buffer
// `Buffer.from()` and `Buffer.alloc()` are available everywhere,
// so `node:buffer` covers the whole safer-buffer API.
import buffer from "node:buffer";

export * from "node:buffer";

export default buffer;
