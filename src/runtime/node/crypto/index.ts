// https://nodejs.org/api/crypto.html
// https://github.com/unjs/uncrypto
import type nodeCrypto from "node:crypto"
import stream from "node:stream";
// @ts-ignore
import cryptoBrowserify from "crypto-browserify"
// @ts-ignore
import { webTimingSafeEqual } from "@advena/web-timing-safe-equal"

export const webcrypto = globalThis.crypto;

export const constants: typeof nodeCrypto.constants = cryptoBrowserify.constants

export const KeyObject: typeof nodeCrypto.KeyObject = cryptoBrowserify.KeyObject

export const subtle: typeof nodeCrypto.subtle = webcrypto.subtle;

// limit of Crypto.getRandomValues()
// https://developer.mozilla.org/en-US/docs/Web/API/Crypto/getRandomValues
const MAX_BYTES: number = 65_536;

export const randomUUID: typeof nodeCrypto.randomUUID = () => {
  return webcrypto.randomUUID();
};

export const getRandomValues: typeof nodeCrypto.getRandomValues = (
  array: any
) => {
  return webcrypto.getRandomValues(array);
};

export const randomBytes /* :typeof nodeCrypto.randomBytes */ = (
  size: number,
  cb?: (err: Error | null, buf: Buffer) => void
) => {
  const bytes = Buffer.alloc(size, 0, undefined) as Buffer;

  for (let generated = 0; generated < size; generated += MAX_BYTES) {
    // buffer.slice automatically checks if the end is past the end of
    // the buffer, so we don't have to here
    getRandomValues(
      Uint8Array.prototype.slice.call(bytes, generated, generated + MAX_BYTES)
    );
  }

  if (typeof cb === "function") {
    cb(null, bytes);
    return;
  }
  return bytes;
};

/*
export const checkPrime: (value: nodeCrypto.LargeNumberLike, options: nodeCrypto.CheckPrimeOptions
                          , callback: (err: Error | null, result: boolean) => void) => void = (
       value,
       options,
       callback) => {
    return cryptoBrowserify.checkPrime(value, options, callback)
}

export const checkPrimeSync: typeof nodeCrypto.checkPrimeSync = (
    candidate,
    options
) => {
  return cryptoBrowserify.checkPrimeSync(candidate, options)
} */

export const createCipheriv: (algorithm: string, key: nodeCrypto.CipherKey, iv: nodeCrypto.BinaryLike | null,
                             options?: stream.TransformOptions) => nodeCrypto.Cipher = (
          algorithm,
          key,
          iv,
          options
) => {
  return cryptoBrowserify.createCipheriv(algorithm, key, iv, options)
}

export const createDecipheriv: (algorithm: string, key: nodeCrypto.CipherKey, iv: (nodeCrypto.BinaryLike | null),
                                options?: stream.TransformOptions) => nodeCrypto.Decipher = (
    algorithm: string,
    key: nodeCrypto.CipherKey,
    iv: nodeCrypto.BinaryLike | null,
    options?: stream.TransformOptions
): nodeCrypto.Decipher => {
  return cryptoBrowserify.createDecipheriv(algorithm, key, iv, options)
}

export const createDiffieHellman: (prime: string, primeEncoding: nodeCrypto.BinaryToTextEncoding,
                                   generator?: number | ArrayBuffer | NodeJS.ArrayBufferView) => nodeCrypto.DiffieHellman = (
                       prime,
                       primeEncoding,
                       generator) => {
  return cryptoBrowserify.createDiffieHellman(prime, primeEncoding, generator)
}

export const createECDH: typeof nodeCrypto.createECDH = (
    curveName
) => {
  return cryptoBrowserify.createECDH(curveName)
}

export const createHash: typeof nodeCrypto.createHash = (
    algorithm,
    options?
) => {
  return cryptoBrowserify.createHash(algorithm, options)
}

export const createHmac: typeof nodeCrypto.createHmac = (
    algorithm,
    options?
) => {
  return cryptoBrowserify.createHmac(algorithm, options)
}

export const createPrivateKey: typeof nodeCrypto.createPrivateKey = (
    key
) => {
  return cryptoBrowserify.createPrivateKey(key)
}

export const createPublicKey: typeof nodeCrypto.createPublicKey = (
    key
) => {
  return cryptoBrowserify.createPublicKey(key)
}

export const createSecretKey: (key: string, encoding: BufferEncoding) => nodeCrypto.KeyObject = (
    key,
    encoding
) => {
  return cryptoBrowserify.createSecretKey(key, encoding)
}

export const createSign: typeof nodeCrypto.createSign = (
    algorithm,
    options
) => {
  return cryptoBrowserify.createSign(algorithm, options)
}

export const createVerify: typeof nodeCrypto.createVerify = (
    algorithm,
    options
) => {
  return cryptoBrowserify.createVerify(algorithm, options)
}

export const diffieHellman: typeof nodeCrypto.diffieHellman = (
    options
) => {
  return cryptoBrowserify.diffieHellman(options)
}


/*
// GENERATORS

// @ts-ignore
export const generateKeyPair: typeof nodeCrypto.generateKeyPair = (
    type,
    options,
    callback
) => {
  return cryptoBrowserify.generateKeyPair(type, options, callback)
}

export const generateKeyPairSync: typeof nodeCrypto.generateKeyPairSync = (
    type,
    options
) => {
  return cryptoBrowserify.generateKeyPairSync(type, options)
}

export const generateKey: typeof nodeCrypto.generateKey = (
    type,
    options,
    callback
) => {
  return cryptoBrowserify.generateKey(type, options, callback)
}

export const generateKeySync: typeof nodeCrypto.generateKeySync = (
    type,
    options
) => {
  return cryptoBrowserify.generateKeySync(type, options)
} */
/*
export const generatePrime: (size: number, options: nodeCrypto.GeneratePrimeOptions,
                             callback: (err: Error | null, prime: ArrayBuffer | bigint) => void) => void = (
    size,
    options,
    callback
) => {
  return cryptoBrowserify.generatePrime(size, options, callback)
}

export const generatePrimeSync: (size: number, options: nodeCrypto.GeneratePrimeOptions) => ArrayBuffer | bigint = (
    size,
    options
) => {
  return cryptoBrowserify.generatePrimeSync(size, options)
}

export const getCipherInfo: typeof nodeCrypto.getCipherInfo = (
    nameOrNid,
    options
) => {
  return cryptoBrowserify.getCipherInfo(nameOrNid, options)
} */

export const getCiphers = () => {
  return cryptoBrowserify.getCiphers()
}

/* export const getCurves = () => {
  return cryptoBrowserify.getCurves()
} */

export const getDiffieHellman: typeof nodeCrypto.getDiffieHellman = (
    groupName
) => {
  return cryptoBrowserify.getDiffieHellman(groupName)
}

/*
export const getFips: typeof nodeCrypto.getFips = () => {
  return cryptoBrowserify.getFips()
} */

export const getHashes: typeof nodeCrypto.getHashes = () => {
  return cryptoBrowserify.getHashes()
}

/*
export const hkdf: typeof nodeCrypto.hkdf = (
    digest,
    irm,
    salt,
    info,
    keylen,
    callback
) => {
  return cryptoBrowserify.hkdf(digest, irm, salt, info, keylen, callback)
}

export const hkdfSync: typeof nodeCrypto.hkdfSync = (
    digest,
    ikm,
    salt,
    info,
    keylen
) => {
  return cryptoBrowserify.hkdfSync(digest, ikm, salt, info, keylen)
} */

export const pbkdf2: typeof nodeCrypto.pbkdf2 = (
    password,
    salt,
    iterations,
    keylen,
    digest,
    callback
) => {
  return cryptoBrowserify.pbkdf2(password, salt, iterations, keylen, digest, callback)
}

export const pbkdf2Sync: typeof nodeCrypto.pbkdf2Sync = (
    password,
    salt,
    iterations,
    keylen,
    digest) => {
  return cryptoBrowserify.pbkdf2Sync(password, salt, iterations, keylen, digest)
}

export const privateDecrypt: typeof nodeCrypto.privateDecrypt = (
    privateKey,
    buffer
) => {
  return cryptoBrowserify.privateDecrypt(privateKey, buffer)
}

export const privateEncrypt: typeof nodeCrypto.privateEncrypt = (
    privateKey,
    buffer
) => {
  return cryptoBrowserify.privateEncrypt(privateKey, buffer)
}

export const publicDecrypt: typeof nodeCrypto.publicDecrypt = (
    key,
    buffer
) => {
  return cryptoBrowserify.publicDecrypt(key, buffer)
}

export const publicEncrypt: typeof nodeCrypto.publicEncrypt = (
    key,
    buffer
) => {
  return cryptoBrowserify.publicEncrypt(key, buffer)
}

export const randomFillSync: typeof nodeCrypto.randomFillSync = (
    buffer,
    offset,
    size
) => {
  return cryptoBrowserify.randomFillSync(buffer, offset, size)
}

/*
export const randomInt: (min: number, max: number, callback: (err: Error | null, value: number) => void) => void = (
    min,
    max,
    callback
) => {
  return cryptoBrowserify.randomInt(min, max, callback)
} */

/*
export const scryptSync: typeof nodeCrypto.scryptSync = (
    password,
    salt,
    keylen,
    options
) => {
  return cryptoBrowserify.scryptSync(password, salt, keylen, options)
}

export const secureHeapUsed: typeof nodeCrypto.secureHeapUsed = () => {
  return cryptoBrowserify.secureHeapUsed()
}

export const setEngine: typeof nodeCrypto.setEngine = (
    engine,
    flags
) => {
  return cryptoBrowserify.setEngine(engine, flags)
}

export const setFips: typeof nodeCrypto.setFips = (
    bool
) => {
  return cryptoBrowserify.setFips(bool)
} */

export const sign: (
    algorithm: string | null | undefined,
    data: NodeJS.ArrayBufferView,
    key: nodeCrypto.KeyLike | nodeCrypto.SignKeyObjectInput | nodeCrypto.SignPrivateKeyInput,
    callback: (error: Error | null, data: Buffer) => void
) => void = (
    algorithm,
    data,
    key,
    callback) => {
  return cryptoBrowserify.Sign(algorithm, data, key, callback)
}

export const timingSafeEqual: typeof nodeCrypto.timingSafeEqual = (
    a,
    b
) => {
  return webTimingSafeEqual(a, b)
}

export const verify: (
    algorithm: string | null | undefined,
    data: NodeJS.ArrayBufferView,
    key: nodeCrypto.KeyLike | nodeCrypto.VerifyKeyObjectInput | nodeCrypto.VerifyPublicKeyInput | nodeCrypto.VerifyJsonWebKeyInput,
    signature: NodeJS.ArrayBufferView,
    callback: (error: Error | null, result: boolean) => void
) => void = (
    algorithm,
    data,
    key,
    signature,
    callback
) => {
  return cryptoBrowserify.Verify(algorithm, data, key, signature, callback)
}


// TODO: Add missing exports (typecheck is not working!)
export default <typeof nodeCrypto>{
  constants,
  // checkPrime,
  // checkPrimeSync,
  createCipheriv,
  createDecipheriv,
  createDiffieHellman,
  createECDH,
  createHash,
  createHmac,
  createPrivateKey,
  createPublicKey,
  createSecretKey,
  createSign,
  createVerify,
  diffieHellman,
  // generateKeyPair,
  // generateKeyPairSync,
  // generateKey,
  // generateKeySync,
  // generatePrime,
  // generatePrimeSync,
  // getCipherInfo,
  getCiphers,
  // getCurves,
  getDiffieHellman,
  // getFips,
  getHashes,
  getRandomValues,
  // hkdf,
  // hkdfSync,
  KeyObject,
  pbkdf2,
  pbkdf2Sync,
  privateDecrypt,
  privateEncrypt,
  publicDecrypt,
  publicEncrypt,
  randomBytes,
  randomFillSync,
  // randomInt,
  randomUUID,
  // scryptSync,
  // secureHeapUsed,
  // setEngine,
  // setFips,
  sign,
  subtle,
  timingSafeEqual,
  verify,
  webcrypto,
};
