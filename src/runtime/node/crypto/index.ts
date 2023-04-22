// https://nodejs.org/api/crypto.html
// https://github.com/unjs/uncrypto
import type nodeCrypto from "node:crypto";
import { Buffer } from "../buffer";

// limit of Crypto.getRandomValues()
// https://developer.mozilla.org/en-US/docs/Web/API/Crypto/getRandomValues
const MAX_BYTES: number = 65_536;

const webcrypto = globalThis.crypto;

export const subtle: typeof nodeCrypto.subtle = webcrypto.subtle;

export const randomUUID: typeof nodeCrypto.randomUUID = () => {
  return webcrypto.randomUUID();
};

export const getRandomValues: typeof nodeCrypto.getRandomValues = (
  array: any
) => {
  return webcrypto.getRandomValues(array);
};

type randomBytesCallback = (err: null, buffer: Uint8Array) => void;
export const randomBytes: typeof nodeCrypto.randomBytes = (
  size: number,
  cb: randomBytesCallback
) => {
  const bytes = Buffer.allocUnsafe(size);

  for (let generated = 0; generated < size; generated += MAX_BYTES) {
    // buffer.slice automatically checks if the end is past the end of
    // the buffer so we don't have to here
    getRandomValues(bytes.slice(generated, generated + MAX_BYTES));
  }

  if (typeof cb === "function") {
    return process.nextTick(function () {
      cb(null, bytes);
    });
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
