import type nodeCrypto from "node:crypto";

import { notImplemented, notImplementedClass } from "../../_internal/utils";
import { getRandomValues } from "./web";

// limit of Crypto.getRandomValues()
// https://developer.mozilla.org/en-US/docs/Web/API/Crypto/getRandomValues
const MAX_RANDOM_VALUE_BYTES: number = 65_536;

// ---- implemented Utils ----

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

export const checkPrime: typeof nodeCrypto.checkPrime =
  notImplemented("crypto.checkPrime");

export const checkPrimeSync: typeof nodeCrypto.checkPrimeSync = notImplemented(
  "crypto.checkPrimeSync",
);

export const createCipher: typeof nodeCrypto.createCipher = notImplemented(
  "crypto.createCipher",
);

export const createDecipher: typeof nodeCrypto.createDecipher = notImplemented(
  "crypto.createDecipher",
);

export const pseudoRandomBytes: typeof nodeCrypto.pseudoRandomBytes =
  notImplemented("crypto.pseudoRandomBytes");

export const createCipheriv: typeof nodeCrypto.createCipheriv = notImplemented(
  "crypto.createCipheriv",
);

export const createDecipheriv: typeof nodeCrypto.createDecipheriv =
  notImplemented("crypto.createDecipheriv");

export const createDiffieHellman: typeof nodeCrypto.createDiffieHellman =
  notImplemented("crypto.createDiffieHellman");

export const createDiffieHellmanGroup: typeof nodeCrypto.createDiffieHellmanGroup =
  notImplemented("crypto.createDiffieHellmanGroup");

export const createECDH: typeof nodeCrypto.createECDH =
  notImplemented("crypto.createECDH");

export const createHash: typeof nodeCrypto.createHash =
  notImplemented("crypto.createHash");

export const createHmac: typeof nodeCrypto.createHmac =
  notImplemented("crypto.createHmac");

export const createPrivateKey: typeof nodeCrypto.createPrivateKey =
  notImplemented("crypto.createPrivateKey");

export const createPublicKey: typeof nodeCrypto.createPublicKey =
  notImplemented("crypto.createPublicKey");

export const createSecretKey: typeof nodeCrypto.createSecretKey =
  notImplemented("crypto.createSecretKey");

export const createSign: typeof nodeCrypto.createSign =
  notImplemented("crypto.createSign");

export const createVerify: typeof nodeCrypto.createVerify = notImplemented(
  "crypto.createVerify",
);

export const diffieHellman: typeof nodeCrypto.diffieHellman = notImplemented(
  "crypto.diffieHellman",
);

export const generatePrime: typeof nodeCrypto.generatePrime = notImplemented(
  "crypto.generatePrime",
);

export const generatePrimeSync: typeof nodeCrypto.generatePrimeSync =
  notImplemented("crypto.generatePrimeSync");

export const getCiphers: typeof nodeCrypto.getCiphers =
  notImplemented("crypto.getCiphers");

export const getCipherInfo: typeof nodeCrypto.getCipherInfo = notImplemented(
  "crypto.getCipherInfo",
);

export const getCurves: typeof nodeCrypto.getCurves =
  notImplemented("crypto.getCurves");

export const getDiffieHellman: typeof nodeCrypto.getDiffieHellman =
  notImplemented("crypto.getDiffieHellman");

export const getHashes: typeof nodeCrypto.getHashes =
  notImplemented("crypto.getHashes");

export const hkdf: typeof nodeCrypto.hkdf = notImplemented("crypto.hkdf");

export const hkdfSync: typeof nodeCrypto.hkdfSync =
  notImplemented("crypto.hkdfSync");

export const pbkdf2: typeof nodeCrypto.pbkdf2 = notImplemented("crypto.pbkdf2");

export const pbkdf2Sync: typeof nodeCrypto.pbkdf2Sync =
  notImplemented("crypto.pbkdf2Sync");

// @ts-expect-error promisify not supported
export const generateKeyPair: typeof nodeCrypto.generateKeyPair =
  notImplemented("crypto.generateKeyPair");

export const generateKeyPairSync: typeof nodeCrypto.generateKeyPairSync =
  notImplemented("crypto.generateKeyPairSync");

export const generateKey: typeof nodeCrypto.generateKey =
  notImplemented("crypto.generateKey");

export const generateKeySync: typeof nodeCrypto.generateKeySync =
  notImplemented("crypto.generateKeySync");

export const privateDecrypt: typeof nodeCrypto.privateDecrypt = notImplemented(
  "crypto.privateDecrypt",
);

export const privateEncrypt: typeof nodeCrypto.privateEncrypt = notImplemented(
  "crypto.privateEncrypt",
);

export const publicDecrypt: typeof nodeCrypto.publicDecrypt = notImplemented(
  "crypto.publicDecrypt",
);

export const publicEncrypt: typeof nodeCrypto.publicEncrypt = notImplemented(
  "crypto.publicEncrypt",
);

export const randomFill: typeof nodeCrypto.randomFill =
  notImplemented("crypto.randomFill");

export const randomFillSync: typeof nodeCrypto.randomFillSync = notImplemented(
  "crypto.randomFillSync",
);

export const randomInt: typeof nodeCrypto.randomInt =
  notImplemented("crypto.randomInt");

export const scrypt: typeof nodeCrypto.scrypt = notImplemented("crypto.scrypt");

export const scryptSync: typeof nodeCrypto.scryptSync =
  notImplemented("crypto.scryptSync");

export const sign: typeof nodeCrypto.sign = notImplemented("crypto.sign");

export const setEngine: typeof nodeCrypto.setEngine =
  notImplemented("crypto.setEngine");

export const timingSafeEqual: typeof nodeCrypto.timingSafeEqual =
  notImplemented("crypto.timingSafeEqual");

export const getFips: typeof nodeCrypto.getFips =
  notImplemented("crypto.getFips");

export const setFips: typeof nodeCrypto.setFips =
  notImplemented("crypto.setFips");

export const verify: typeof nodeCrypto.verify = notImplemented("crypto.verify");

export const secureHeapUsed: typeof nodeCrypto.secureHeapUsed = notImplemented(
  "crypto.secureHeapUsed",
);

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
