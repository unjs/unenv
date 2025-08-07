import type nodeCrypto from "node:crypto";

import {
  notImplemented,
  notImplementedClass,
} from "../../../_internal/utils.ts";
import { getRandomValues } from "./web.ts";

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
    getRandomValues(
      // Use subarray to get a view of the buffer
      Uint8Array.prototype.subarray.call(
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

export const rng = randomBytes;

export const prng = randomBytes;

// ---- Constants ----

export const fips: typeof nodeCrypto.fips = false;

// ---- Unimplemented utils ----

export const checkPrime =
  /*@__PURE__*/ notImplemented<typeof nodeCrypto.checkPrime>(
    "crypto.checkPrime",
  );

export const checkPrimeSync = /*@__PURE__*/ notImplemented<
  typeof nodeCrypto.checkPrimeSync
>("crypto.checkPrimeSync");

/** @deprecated https://nodejs.org/docs/latest/api/deprecations.html#dep0106-cryptocreatecipher-and-cryptocreatedecipher */
export const createCipher = undefined;

/** @deprecated https://nodejs.org/docs/latest/api/deprecations.html#dep0106-cryptocreatecipher-and-cryptocreatedecipher */
export const createDecipher = undefined;

export const pseudoRandomBytes = /*@__PURE__*/ notImplemented<
  typeof nodeCrypto.pseudoRandomBytes
>("crypto.pseudoRandomBytes");

export const createCipheriv = /*@__PURE__*/ notImplemented<
  typeof nodeCrypto.createCipheriv
>("crypto.createCipheriv");

export const createDecipheriv = /*@__PURE__*/ notImplemented<
  typeof nodeCrypto.createDecipheriv
>("crypto.createDecipheriv");

export const createDiffieHellman = /*@__PURE__*/ notImplemented<
  typeof nodeCrypto.createDiffieHellman
>("crypto.createDiffieHellman");

export const createDiffieHellmanGroup = /*@__PURE__*/ notImplemented<
  typeof nodeCrypto.createDiffieHellmanGroup
>("crypto.createDiffieHellmanGroup");

export const createECDH =
  /*@__PURE__*/ notImplemented<typeof nodeCrypto.createECDH>(
    "crypto.createECDH",
  );

export const createHash =
  /*@__PURE__*/ notImplemented<typeof nodeCrypto.createHash>(
    "crypto.createHash",
  );

export const createHmac =
  /*@__PURE__*/ notImplemented<typeof nodeCrypto.createHmac>(
    "crypto.createHmac",
  );

export const createPrivateKey = /*@__PURE__*/ notImplemented<
  typeof nodeCrypto.createPrivateKey
>("crypto.createPrivateKey");

export const createPublicKey = /*@__PURE__*/ notImplemented<
  typeof nodeCrypto.createPublicKey
>("crypto.createPublicKey");

export const createSecretKey = /*@__PURE__*/ notImplemented<
  typeof nodeCrypto.createSecretKey
>("crypto.createSecretKey");

export const createSign =
  /*@__PURE__*/ notImplemented<typeof nodeCrypto.createSign>(
    "crypto.createSign",
  );

export const createVerify = /*@__PURE__*/ notImplemented<
  typeof nodeCrypto.createVerify
>("crypto.createVerify");

export const diffieHellman = /*@__PURE__*/ notImplemented<
  typeof nodeCrypto.diffieHellman
>("crypto.diffieHellman");

export const generatePrime = /*@__PURE__*/ notImplemented<
  typeof nodeCrypto.generatePrime
>("crypto.generatePrime");

export const generatePrimeSync = /*@__PURE__*/ notImplemented<
  typeof nodeCrypto.generatePrimeSync
>("crypto.generatePrimeSync");

export const getCiphers =
  /*@__PURE__*/ notImplemented<typeof nodeCrypto.getCiphers>(
    "crypto.getCiphers",
  );

export const getCipherInfo = /*@__PURE__*/ notImplemented<
  typeof nodeCrypto.getCipherInfo
>("crypto.getCipherInfo");

export const getCurves =
  /*@__PURE__*/ notImplemented<typeof nodeCrypto.getCurves>("crypto.getCurves");

export const getDiffieHellman = /*@__PURE__*/ notImplemented<
  typeof nodeCrypto.getDiffieHellman
>("crypto.getDiffieHellman");

export const getHashes =
  /*@__PURE__*/ notImplemented<typeof nodeCrypto.getHashes>("crypto.getHashes");

export const hkdf =
  /*@__PURE__*/ notImplemented<typeof nodeCrypto.hkdf>("crypto.hkdf");

export const hkdfSync =
  /*@__PURE__*/ notImplemented<typeof nodeCrypto.hkdfSync>("crypto.hkdfSync");

export const pbkdf2 =
  /*@__PURE__*/ notImplemented<typeof nodeCrypto.pbkdf2>("crypto.pbkdf2");

export const pbkdf2Sync =
  /*@__PURE__*/ notImplemented<typeof nodeCrypto.pbkdf2Sync>(
    "crypto.pbkdf2Sync",
  );

export const generateKeyPair = /*@__PURE__*/ notImplemented<
  typeof nodeCrypto.generateKeyPair
>("crypto.generateKeyPair");

export const generateKeyPairSync = /*@__PURE__*/ notImplemented<
  typeof nodeCrypto.generateKeyPairSync
>("crypto.generateKeyPairSync");

export const generateKey =
  /*@__PURE__*/ notImplemented<typeof nodeCrypto.generateKey>(
    "crypto.generateKey",
  );

export const generateKeySync = /*@__PURE__*/ notImplemented<
  typeof nodeCrypto.generateKeySync
>("crypto.generateKeySync");

export const privateDecrypt = /*@__PURE__*/ notImplemented<
  typeof nodeCrypto.privateDecrypt
>("crypto.privateDecrypt");

export const privateEncrypt = /*@__PURE__*/ notImplemented<
  typeof nodeCrypto.privateEncrypt
>("crypto.privateEncrypt");

export const publicDecrypt = /*@__PURE__*/ notImplemented<
  typeof nodeCrypto.publicDecrypt
>("crypto.publicDecrypt");

export const publicEncrypt = /*@__PURE__*/ notImplemented<
  typeof nodeCrypto.publicEncrypt
>("crypto.publicEncrypt");

export const randomFill =
  /*@__PURE__*/ notImplemented<typeof nodeCrypto.randomFill>(
    "crypto.randomFill",
  );

export const randomFillSync = /*@__PURE__*/ notImplemented<
  typeof nodeCrypto.randomFillSync
>("crypto.randomFillSync");

export const randomInt =
  /*@__PURE__*/ notImplemented<typeof nodeCrypto.randomInt>("crypto.randomInt");

export const scrypt =
  /*@__PURE__*/ notImplemented<typeof nodeCrypto.scrypt>("crypto.scrypt");

export const scryptSync =
  /*@__PURE__*/ notImplemented<typeof nodeCrypto.scryptSync>(
    "crypto.scryptSync",
  );

export const sign =
  /*@__PURE__*/ notImplemented<typeof nodeCrypto.sign>("crypto.sign");

export const setEngine =
  /*@__PURE__*/ notImplemented<typeof nodeCrypto.setEngine>("crypto.setEngine");

export const timingSafeEqual = /*@__PURE__*/ notImplemented<
  typeof nodeCrypto.timingSafeEqual
>("crypto.timingSafeEqual");

export const getFips =
  /*@__PURE__*/ notImplemented<typeof nodeCrypto.getFips>("crypto.getFips");

export const setFips =
  /*@__PURE__*/ notImplemented<typeof nodeCrypto.setFips>("crypto.setFips");

export const verify =
  /*@__PURE__*/ notImplemented<typeof nodeCrypto.verify>("crypto.verify");

export const secureHeapUsed = /*@__PURE__*/ notImplemented<
  typeof nodeCrypto.secureHeapUsed
>("crypto.secureHeapUsed");

export const hash =
  /*@__PURE__*/ notImplemented<(typeof nodeCrypto)["hash"]>("crypto.hash");

// ---- Unimplemented Classes ----

/** @deprecated https://nodejs.org/docs/latest/api/deprecations.html#dep0106-cryptocreatecipher-and-cryptocreatedecipher */
export const Cipher = undefined;

/** @deprecated https://nodejs.org/docs/latest/api/deprecations.html#dep0106-cryptocreatecipher-and-cryptocreatedecipher */
export const Decipher = undefined;

export const Certificate = /*@__PURE__*/ notImplementedClass(
  "crypto.Certificate",
) as unknown as typeof nodeCrypto.Certificate;

export const Cipheriv = /*@__PURE__*/ notImplementedClass(
  "crypto.Cipheriv",
  // @ts-expect-error not typed yet
) as unknown as typeof nodeCrypto.Cipheriv;

export const Decipheriv = /*@__PURE__*/ notImplementedClass(
  "crypto.Decipheriv",
  // @ts-expect-error not typed yet
) as unknown as typeof nodeCrypto.Decipheriv;

export const DiffieHellman = /*@__PURE__*/ notImplementedClass(
  "crypto.DiffieHellman",
) as unknown as typeof nodeCrypto.DiffieHellman;

export const DiffieHellmanGroup = /*@__PURE__*/ notImplementedClass(
  "crypto.DiffieHellmanGroup",
) as unknown as typeof nodeCrypto.DiffieHellmanGroup;

export const ECDH = /*@__PURE__*/ notImplementedClass(
  "crypto.ECDH",
) as unknown as typeof nodeCrypto.ECDH;

export const Hash = /*@__PURE__*/ notImplementedClass(
  "crypto.Hash",
) as unknown as typeof nodeCrypto.Hash;

export const Hmac = /*@__PURE__*/ notImplementedClass(
  "crypto.Hmac",
) as unknown as typeof nodeCrypto.Hmac;

export const KeyObject = /*@__PURE__*/ notImplementedClass(
  "crypto.KeyObject",
) as unknown as typeof nodeCrypto.KeyObject;

export const Sign = /*@__PURE__*/ notImplementedClass(
  "crypto.Sign",
) as unknown as typeof nodeCrypto.Sign;

export const Verify = /*@__PURE__*/ notImplementedClass(
  "crypto.Verify",
) as unknown as typeof nodeCrypto.Verify;

export const X509Certificate = /*@__PURE__*/ notImplementedClass(
  "crypto.X509Certificate",
) as unknown as typeof nodeCrypto.X509Certificate;
