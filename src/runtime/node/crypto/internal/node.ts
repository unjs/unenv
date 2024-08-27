import type nodeCrypto from "node:crypto";

import { notImplemented, notImplementedClass } from "../../../_internal/utils";
import { getRandomValues } from "./web";

// limit of Crypto.getRandomValues()
// https://developer.mozilla.org/en-US/docs/Web/API/Crypto/getRandomValues
const MAX_RANDOM_VALUE_BYTES: number = 65_536;

// ---- implemented Utils ----

export const webcrypto = new Proxy(
  globalThis.crypto as typeof nodeCrypto.webcrypto,
  {
    get(_, key: keyof typeof globalThis.crypto | "CryptoKey") {
      if (key === "CryptoKey") {
        return globalThis.CryptoKey;
      }

      if (typeof globalThis.crypto[key] === "function") {
        // @ts-ignore
        return globalThis.crypto[key].bind(globalThis.crypto);
      }

      return globalThis.crypto[key];
    },
  },
);

export const randomBytes: typeof nodeCrypto.randomBytes = (
  size: number,
  cb?: (err: Error | null, buf: Buffer) => void,
) => {
  const bytes = Buffer.alloc(size, 0, undefined) as Buffer;

  for (
    let generated = 0;
    generated < size;
    generated += MAX_RANDOM_VALUE_BYTES
  ) {
    // buffer.slice automatically checks if the end is past the end of
    // the buffer so we don't have to here
    getRandomValues(
      Uint8Array.prototype.slice.call(
        bytes,
        generated,
        generated + MAX_RANDOM_VALUE_BYTES,
      ),
    );
  }

  if (typeof cb === "function") {
    cb(null, bytes);
    return undefined as any /* type override fix */;
  }

  return bytes;
};

// ---- Contants ----

export const fips: typeof nodeCrypto.fips = false;

export const constants = {} as typeof nodeCrypto.constants;

// ---- Unimplemented utils ----

export const checkPrime =
  notImplemented<typeof nodeCrypto.checkPrime>("crypto.checkPrime");

export const checkPrimeSync = notImplemented<typeof nodeCrypto.checkPrimeSync>(
  "crypto.checkPrimeSync",
);

/** @deprecated */
export const createCipher = notImplemented("crypto.createCipher");

/** @deprecated */
export const createDecipher = notImplemented("crypto.createDecipher");

export const pseudoRandomBytes = notImplemented<
  typeof nodeCrypto.pseudoRandomBytes
>("crypto.pseudoRandomBytes");

export const createCipheriv = notImplemented<typeof nodeCrypto.createCipheriv>(
  "crypto.createCipheriv",
);

export const createDecipheriv = notImplemented<
  typeof nodeCrypto.createDecipheriv
>("crypto.createDecipheriv");

export const createDiffieHellman = notImplemented<
  typeof nodeCrypto.createDiffieHellman
>("crypto.createDiffieHellman");

export const createDiffieHellmanGroup = notImplemented<
  typeof nodeCrypto.createDiffieHellmanGroup
>("crypto.createDiffieHellmanGroup");

export const createECDH =
  notImplemented<typeof nodeCrypto.createECDH>("crypto.createECDH");

export const createHash =
  notImplemented<typeof nodeCrypto.createHash>("crypto.createHash");

export const createHmac =
  notImplemented<typeof nodeCrypto.createHmac>("crypto.createHmac");

export const createPrivateKey = notImplemented<
  typeof nodeCrypto.createPrivateKey
>("crypto.createPrivateKey");

export const createPublicKey = notImplemented<
  typeof nodeCrypto.createPublicKey
>("crypto.createPublicKey");

export const createSecretKey = notImplemented<
  typeof nodeCrypto.createSecretKey
>("crypto.createSecretKey");

export const createSign =
  notImplemented<typeof nodeCrypto.createSign>("crypto.createSign");

export const createVerify = notImplemented<typeof nodeCrypto.createVerify>(
  "crypto.createVerify",
);

export const diffieHellman = notImplemented<typeof nodeCrypto.diffieHellman>(
  "crypto.diffieHellman",
);

export const generatePrime = notImplemented<typeof nodeCrypto.generatePrime>(
  "crypto.generatePrime",
);

export const generatePrimeSync = notImplemented<
  typeof nodeCrypto.generatePrimeSync
>("crypto.generatePrimeSync");

export const getCiphers =
  notImplemented<typeof nodeCrypto.getCiphers>("crypto.getCiphers");

export const getCipherInfo = notImplemented<typeof nodeCrypto.getCipherInfo>(
  "crypto.getCipherInfo",
);

export const getCurves =
  notImplemented<typeof nodeCrypto.getCurves>("crypto.getCurves");

export const getDiffieHellman = notImplemented<
  typeof nodeCrypto.getDiffieHellman
>("crypto.getDiffieHellman");

export const getHashes =
  notImplemented<typeof nodeCrypto.getHashes>("crypto.getHashes");

export const hkdf = notImplemented<typeof nodeCrypto.hkdf>("crypto.hkdf");

export const hkdfSync =
  notImplemented<typeof nodeCrypto.hkdfSync>("crypto.hkdfSync");

export const pbkdf2 = notImplemented<typeof nodeCrypto.pbkdf2>("crypto.pbkdf2");

export const pbkdf2Sync =
  notImplemented<typeof nodeCrypto.pbkdf2Sync>("crypto.pbkdf2Sync");

export const generateKeyPair = notImplemented<
  typeof nodeCrypto.generateKeyPair
>("crypto.generateKeyPair");

export const generateKeyPairSync = notImplemented<
  typeof nodeCrypto.generateKeyPairSync
>("crypto.generateKeyPairSync");

export const generateKey =
  notImplemented<typeof nodeCrypto.generateKey>("crypto.generateKey");

export const generateKeySync = notImplemented<
  typeof nodeCrypto.generateKeySync
>("crypto.generateKeySync");

export const privateDecrypt = notImplemented<typeof nodeCrypto.privateDecrypt>(
  "crypto.privateDecrypt",
);

export const privateEncrypt = notImplemented<typeof nodeCrypto.privateEncrypt>(
  "crypto.privateEncrypt",
);

export const publicDecrypt = notImplemented<typeof nodeCrypto.publicDecrypt>(
  "crypto.publicDecrypt",
);

export const publicEncrypt = notImplemented<typeof nodeCrypto.publicEncrypt>(
  "crypto.publicEncrypt",
);

export const randomFill =
  notImplemented<typeof nodeCrypto.randomFill>("crypto.randomFill");

export const randomFillSync = notImplemented<typeof nodeCrypto.randomFillSync>(
  "crypto.randomFillSync",
);

export const randomInt =
  notImplemented<typeof nodeCrypto.randomInt>("crypto.randomInt");

export const scrypt = notImplemented<typeof nodeCrypto.scrypt>("crypto.scrypt");

export const scryptSync =
  notImplemented<typeof nodeCrypto.scryptSync>("crypto.scryptSync");

export const sign = notImplemented<typeof nodeCrypto.sign>("crypto.sign");

export const setEngine =
  notImplemented<typeof nodeCrypto.setEngine>("crypto.setEngine");

export const timingSafeEqual = notImplemented<
  typeof nodeCrypto.timingSafeEqual
>("crypto.timingSafeEqual");

export const getFips =
  notImplemented<typeof nodeCrypto.getFips>("crypto.getFips");

export const setFips =
  notImplemented<typeof nodeCrypto.setFips>("crypto.setFips");

export const verify = notImplemented<typeof nodeCrypto.verify>("crypto.verify");

export const secureHeapUsed = notImplemented<typeof nodeCrypto.secureHeapUsed>(
  "crypto.secureHeapUsed",
);

export const hash = notImplemented<(typeof nodeCrypto)["hash"]>("crypto.hash");

// ---- Unimplemented Classes ----

export const Certificate = notImplementedClass(
  "crypto.Certificate",
) as unknown as typeof nodeCrypto.Certificate;

export const Cipher = notImplementedClass(
  "crypto.Cipher",
) as unknown as typeof nodeCrypto.Cipher;

export const Cipheriv = notImplementedClass(
  "crypto.Cipheriv",
  // @ts-expect-error not typed yet
) as unknown as typeof nodeCrypto.Cipheriv;

export const Decipher = notImplementedClass(
  "crypto.Decipher",
) as unknown as typeof nodeCrypto.Decipher;

export const Decipheriv = notImplementedClass(
  "crypto.Decipheriv",
  // @ts-expect-error not typed yet
) as unknown as typeof nodeCrypto.Decipheriv;

export const DiffieHellman = notImplementedClass(
  "crypto.DiffieHellman",
) as unknown as typeof nodeCrypto.DiffieHellman;

export const DiffieHellmanGroup = notImplementedClass(
  "crypto.DiffieHellmanGroup",
) as unknown as typeof nodeCrypto.DiffieHellmanGroup;

export const ECDH = notImplementedClass(
  "crypto.ECDH",
) as unknown as typeof nodeCrypto.ECDH;

export const Hash = notImplementedClass(
  "crypto.Hash",
) as unknown as typeof nodeCrypto.Hash;

export const Hmac = notImplementedClass(
  "crypto.Hmac",
) as unknown as typeof nodeCrypto.Hmac;

export const KeyObject = notImplementedClass(
  "crypto.KeyObject",
) as unknown as typeof nodeCrypto.KeyObject;

export const Sign = notImplementedClass(
  "crypto.Sign",
) as unknown as typeof nodeCrypto.Sign;

export const Verify = notImplementedClass(
  "crypto.Verify",
) as unknown as typeof nodeCrypto.Verify;

export const X509Certificate = notImplementedClass(
  "crypto.X509Certificate",
) as unknown as typeof nodeCrypto.X509Certificate;
