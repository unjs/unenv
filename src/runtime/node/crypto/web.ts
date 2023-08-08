// https://nodejs.org/api/crypto.html
// https://github.com/unjs/uncrypto

export const subtle: SubtleCrypto = globalThis.crypto?.subtle;

export const randomUUID: Crypto["randomUUID"] = () => {
  return globalThis.crypto?.randomUUID();
};

export const getRandomValues: Crypto["getRandomValues"] = (array: any) => {
  return globalThis.crypto?.getRandomValues(array);
};
