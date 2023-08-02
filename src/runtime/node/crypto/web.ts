// https://nodejs.org/api/crypto.html
// https://github.com/unjs/uncrypto
import type nodeCrypto from "node:crypto";

export const CryptoKey =
  globalThis.CryptoKey as unknown as typeof nodeCrypto.webcrypto.CryptoKey;

export const webcrypto: Crypto & typeof nodeCrypto.webcrypto = {
  CryptoKey,
  ...globalThis.crypto,
};

export const subtle: SubtleCrypto = webcrypto.subtle;

export const randomUUID: Crypto["randomUUID"] = () => {
  return webcrypto.randomUUID();
};

export const getRandomValues: Crypto["getRandomValues"] = (array: any) => {
  return webcrypto.getRandomValues(array);
};
