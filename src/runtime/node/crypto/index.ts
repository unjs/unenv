// https://nodejs.org/api/crypto.html
// https://github.com/unjs/uncrypto

import type crypto from "node:crypto";

const webCrypto = globalThis.crypto;

export const subtle: Crypto["subtle"] = webCrypto.subtle;

export const randomUUID: Crypto["randomUUID"] = () => {
  return webCrypto.randomUUID();
};

export const getRandomValues: Crypto["getRandomValues"] = (array: any) => {
  return webCrypto.getRandomValues(array);
};

export default <typeof crypto>{
  randomUUID,
  getRandomValues,
  subtle,
};
