// https://nodejs.org/api/crypto.html
// https://github.com/unjs/uncrypto
import type nodeCrypto from "node:crypto";

const webcrypto = globalThis.crypto;

export const subtle: typeof nodeCrypto.subtle = webcrypto.subtle;

// limit of Crypto.getRandomValues()
// https://developer.mozilla.org/en-US/docs/Web/API/Crypto/getRandomValues
const MAX_BYTES: number = 65_536;

export const randomUUID: typeof nodeCrypto.randomUUID = () => {
  return webcrypto.randomUUID();
};

export const getRandomValues: typeof nodeCrypto.getRandomValues = (
  array: any
) => {
  return webcrypto.getRandomValues(array);
};

export const randomBytes /* :typeof nodeCrypto.randomBytes */ = (size: number, cb?: (err: Error | null, buf: Buffer) => void) => {
  const bytes = Buffer.alloc(size, 0, undefined) as Buffer;

  for (let generated = 0; generated < size; generated += MAX_BYTES) {
    // buffer.slice automatically checks if the end is past the end of
    // the buffer so we don't have to here
    getRandomValues(Uint8Array.prototype.slice.call(bytes, generated, generated + MAX_BYTES));
  }

  if (typeof cb === "function") {
    cb(null, bytes)
    return
  }
  return bytes;
};

// TODO: Add missing exports (typecheck is not working!)
export default <typeof nodeCrypto>{
  randomUUID,
  getRandomValues,
  randomBytes,
  subtle,
  webcrypto,
};
