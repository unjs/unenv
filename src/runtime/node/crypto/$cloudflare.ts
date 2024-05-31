import type nodeCrypto from "node:crypto";
import unenvCrypto from "./index";

// @ts-expect-error typings are not up to date, but this API exists, see: https://github.com/cloudflare/workerd/pull/2147
const workerdCrypto = process.getBuiltinModule("node:crypto");

// TODO: Ideally this list is not hardcoded but instead is generated when the preset is being generated in the `env()` call
//       This generation should use information from https://github.com/cloudflare/workerd/issues/2097
export const {
  DiffieHellman,
  DiffieHellmanGroup,
  Hash,
  Hmac,
  KeyObject,
  checkPrime,
  checkPrimeSync,
  createDiffieHellman,
  createDiffieHellmanGroup,
  createHash,
  createHmac,
  createPrivateKey,
  createPublicKey,
  createSecretKey,
  generateKey,
  generateKeyPair,
  generateKeyPairSync,
  generateKeySync,
  generatePrime,
  generatePrimeSync,
  getCiphers,
  getCurves,
  getDiffieHellman,
  getFips,
  getHashes,
  getRandomValues,
  hkdf,
  hkdfSync,
  pbkdf2,
  pbkdf2Sync,
  randomBytes,
  randomFill,
  randomFillSync,
  randomInt,
  randomUUID,
  secureHeapUsed,
  setEngine,
  setFips,
  subtle,
  timingSafeEqual,
} = workerdCrypto;

export const {
  Certificate,
  Cipher,
  // @ts-expect-error undocumented public API
  Cipheriv,
  Decipher,
  // @ts-expect-error undocumented public API
  Decipheriv,
  ECDH,
  Sign,
  Verify,
  X509Certificate,
  constants,
  createCipheriv,
  createDecipheriv,
  createECDH,
  createSign,
  createVerify,
  diffieHellman,
  getCipherInfo,
  hash,
  privateDecrypt,
  privateEncrypt,
  publicDecrypt,
  publicEncrypt,
  scrypt,
  scryptSync,
  sign,
  verify,
} = unenvCrypto;

export const webcrypto = {
  CryptoKey: unenvCrypto.webcrypto.CryptoKey,
  // for some reason spreading doesn't work for webcrypto
  //...workerdCrypto.webcrypto,
  getRandomValues: workerdCrypto.webcrypto.getRandomValues,
  randomUUID: workerdCrypto.webcrypto.randomUUID,
  subtle: workerdCrypto.webcrypto.subtle,
} satisfies typeof nodeCrypto.webcrypto;

// Node.js exposes fips only via the default export 🤷🏼‍♂️
// so extract it separately from the other exports
const { fips } = workerdCrypto;

// Node.js exposes createCipher, createDecipher, pseudoRandomBytes only via the default export 🤷🏼‍♂️
// so extract it separately from the other exports
const { createCipher, createDecipher, pseudoRandomBytes } = unenvCrypto;

export default {
  ...unenvCrypto,
  DiffieHellman,
  DiffieHellmanGroup,
  Hash,
  Hmac,
  KeyObject,
  checkPrime,
  checkPrimeSync,
  createDiffieHellman,
  createDiffieHellmanGroup,
  createHash,
  createHmac,
  createPrivateKey,
  createPublicKey,
  createSecretKey,
  generateKey,
  generateKeyPair,
  generateKeyPairSync,
  generateKeySync,
  generatePrime,
  generatePrimeSync,
  getCiphers,
  getCurves,
  getDiffieHellman,
  getFips,
  getHashes,
  getRandomValues,
  hkdf,
  hkdfSync,
  pbkdf2,
  pbkdf2Sync,
  randomBytes,
  randomFill,
  randomFillSync,
  randomInt,
  randomUUID,
  secureHeapUsed,
  setEngine,
  setFips,
  subtle,
  timingSafeEqual,
} satisfies typeof nodeCrypto;
