// https://nodejs.org/api/crypto.html
// https://github.com/unjs/uncrypto
import type nodeCrypto from "node:crypto";

export const CryptoKey =
  globalThis.CryptoKey as unknown as typeof nodeCrypto.webcrypto.CryptoKey;

function ensureBound(thisArg: any, name: string | symbol) {
  const fn = thisArg[name];
  return typeof fn === "function" ? fn.bind(thisArg) : fn;
}

export const webcrypto: Crypto & typeof nodeCrypto.webcrypto = new Proxy<Crypto & typeof nodeCrypto.webcrypto>({} as any, {
  get(target, name) {
    return CryptoKey && (CryptoKey as any)[name] ? ensureBound(CryptoKey, name) : ensureBound(globalThis.crypto, name);
  },
});

export const subtle: SubtleCrypto = webcrypto.subtle;

export const randomUUID: Crypto["randomUUID"] = () => {
  return webcrypto.randomUUID();
};

export const getRandomValues: Crypto["getRandomValues"] = (array: any) => {
  return webcrypto.getRandomValues(array);
};
