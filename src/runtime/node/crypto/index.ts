// https://nodejs.org/api/crypto.html
// https://github.com/unjs/uncrypto
import type nodeCrypto from "node:crypto";

const webCrypto = globalThis.crypto;

export const subtle: typeof nodeCrypto.subtle = webCrypto.subtle;

export const randomUUID: typeof nodeCrypto.randomUUID = () => {
  return webCrypto.randomUUID();
};

export const getRandomValues: typeof nodeCrypto.getRandomValues = (
  array: any
) => {
  return webCrypto.getRandomValues(array);
};

export default <typeof nodeCrypto>{
  randomUUID,
  getRandomValues,
  subtle,
};
