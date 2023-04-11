// https://nodejs.org/api/crypto.html
// https://github.com/unjs/uncrypto
import type nodeCrypto from "node:crypto";

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

// TODO: Add missing exports (typecheck is not working!)
export default <typeof nodeCrypto>{
  randomUUID,
  getRandomValues,
  subtle,
  webcrypto,
};
