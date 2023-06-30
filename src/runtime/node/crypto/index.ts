// https://nodejs.org/api/crypto.html
// https://github.com/unjs/uncrypto
import nodeCrypto from "node:crypto";
import { constants as cryptoConstants, KeyObject as keyObject } from "node:crypto"
import stream from "node:stream";

export const webcrypto = globalThis.crypto;

export const constants: typeof nodeCrypto.constants = cryptoConstants

export const KeyObject: typeof nodeCrypto.KeyObject = keyObject

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

export const checkPrime: (value: nodeCrypto.LargeNumberLike, options: nodeCrypto.CheckPrimeOptions
                          , callback: (err: Error | null, result: boolean) => void) => void = (
       value,
       options,
       callback) => {
    return nodeCrypto.checkPrime(value, options, callback)
}

export const checkPrimeSync: typeof nodeCrypto.checkPrimeSync = (
    candidate,
    options
) => {
  return nodeCrypto.checkPrimeSync(candidate, options)
}

export const createCipheriv: (algorithm: string, key: nodeCrypto.CipherKey, iv: nodeCrypto.BinaryLike | null,
                             options?: stream.TransformOptions) => nodeCrypto.Cipher = (
          algorithm,
          key,
          iv,
          options
) => {
  return nodeCrypto.createCipheriv(algorithm, key, iv, options)
}

export const createDecipheriv: (algorithm: string, key: nodeCrypto.CipherKey, iv: (nodeCrypto.BinaryLike | null),
                                options?: stream.TransformOptions) => nodeCrypto.Decipher = (
    algorithm: string,
    key: nodeCrypto.CipherKey,
    iv: nodeCrypto.BinaryLike | null,
    options?: stream.TransformOptions
): nodeCrypto.Decipher => {
  return nodeCrypto.createDecipheriv(algorithm, key, iv, options)
}

export const createDiffieHellman: (prime: string, primeEncoding: nodeCrypto.BinaryToTextEncoding,
                                   generator?: number | ArrayBuffer | NodeJS.ArrayBufferView) => nodeCrypto.DiffieHellman = (
                       prime,
                       primeEncoding,
                       generator) => {
  return nodeCrypto.createDiffieHellman(prime, primeEncoding, generator)
}

export const createECDH: typeof nodeCrypto.createECDH = (
    curveName
) => {
  return nodeCrypto.createECDH(curveName)
}

export const createHash: typeof nodeCrypto.createHash = (
    algorithm,
    options?
) => {
  return nodeCrypto.createHash(algorithm, options)
}

export const createHmac: typeof nodeCrypto.createHmac = (
    algorithm,
    options?
) => {
  return nodeCrypto.createHmac(algorithm, options)
}

export const createPrivateKey: typeof nodeCrypto.createPrivateKey = (
    key
) => {
  return nodeCrypto.createPrivateKey(key)
}

export const createPublicKey: typeof nodeCrypto.createPublicKey = (
    key
) => {
  return nodeCrypto.createPublicKey(key)
}

export const createSecretKey: (key: string, encoding: BufferEncoding) => nodeCrypto.KeyObject = (
    key,
    encoding
) => {
  return nodeCrypto.createSecretKey(key, encoding)
}

export const createSign: typeof nodeCrypto.createSign = (
    algorithm,
    options
) => {
  return nodeCrypto.createSign(algorithm, options)
}

export const createVerify: typeof nodeCrypto.createVerify = (
    algorithm,
    options
) => {
  return nodeCrypto.createVerify(algorithm, options)
}

export const diffieHellman: typeof nodeCrypto.diffieHellman = (
    options
) => {
  return nodeCrypto.diffieHellman(options)
}

// @ts-ignore
export const generateKeyPair: typeof nodeCrypto.generateKeyPair = (
    type,
    options,
    callback
) => {
  // @ts-ignore
  return nodeCrypto.generateKeyPair(type, options, callback)
}

export const generateKeyPairSync: typeof nodeCrypto.generateKeyPairSync = (
    type,
    options
) => {
  // @ts-ignore
  return nodeCrypto.generateKeyPairSync(type, options)
}

export const generateKeySync: typeof nodeCrypto.generateKeySync = (
    type,
    options
) => {
  return nodeCrypto.generateKeySync(type, options)
}

export const generatePrime: (size: number, options: nodeCrypto.GeneratePrimeOptions,
                             callback: (err: Error | null, prime: ArrayBuffer | bigint) => void) => void = (
    size,
    options,
    callback
) => {
  return nodeCrypto.generatePrime(size, options, callback)
}

export const generatePrimeSync: (size: number, options: nodeCrypto.GeneratePrimeOptions) => ArrayBuffer | bigint = (
    size,
    options
) => {
  return nodeCrypto.generatePrimeSync(size, options)
}

export const getCipherInfo: typeof nodeCrypto.getCipherInfo = (
    nameOrNid,
    options
) => {
  return nodeCrypto.getCipherInfo(nameOrNid, options)
}

export const getCiphers = () => {
  return nodeCrypto.getCiphers()
}

export const getCurves = () => {
  return nodeCrypto.getCurves()
}

export const getDiffieHellman: typeof nodeCrypto.getDiffieHellman = (
    groupName
) => {
  return nodeCrypto.getDiffieHellman(groupName)
}

export const getFips: typeof nodeCrypto.getFips = () => {
  return nodeCrypto.getFips()
}

export const getHashes: typeof nodeCrypto.getHashes = () => {
  return nodeCrypto.getHashes()
}

export const hkdf: typeof nodeCrypto.hkdf = (
    digest,
    irm,
    salt,
    info,
    keylen,
    callback
) => {
  return nodeCrypto.hkdf(digest, irm, salt, info, keylen, callback)
}

export const hkdfSync: typeof nodeCrypto.hkdfSync = (
    digest,
    ikm,
    salt,
    info,
    keylen
) => {
  return nodeCrypto.hkdfSync(digest, ikm, salt, info, keylen)
}

export const pbkdf2: typeof nodeCrypto.pbkdf2 = (
    password,
    salt,
    iterations,
    keylen,
    digest,
    callback
) => {
  return nodeCrypto.pbkdf2(password, salt, iterations, keylen, digest, callback)
}

export const pbkdf2Sync: typeof nodeCrypto.pbkdf2Sync = (
    password,
    salt,
    iterations,
    keylen,
    digest) => {
  return nodeCrypto.pbkdf2Sync(password, salt, iterations, keylen, digest)
}

export const privateDecrypt: typeof nodeCrypto.privateDecrypt = (
    privateKey,
    buffer
) => {
  return nodeCrypto.privateDecrypt(privateKey, buffer)
}

export const privateEncrypt: typeof nodeCrypto.privateEncrypt = (
    privateKey,
    buffer
) => {
  return nodeCrypto.privateEncrypt(privateKey, buffer)
}

export const publicDecrypt: typeof nodeCrypto.publicDecrypt = (
    key,
    buffer
) => {
  return nodeCrypto.publicDecrypt(key, buffer)
}

export const publicEncrypt: typeof nodeCrypto.publicEncrypt = (
    key,
    buffer
) => {
  return nodeCrypto.publicEncrypt(key, buffer)
}

export const randomFillSync: typeof nodeCrypto.randomFillSync = (
    buffer,
    offset,
    size
) => {
  return nodeCrypto.randomFillSync(buffer, offset, size)
}

export const randomInt: (min: number, max: number, callback: (err: Error | null, value: number) => void) => void = (
    min,
    max,
    callback
) => {
  return nodeCrypto.randomInt(min, max, callback)
}

export const scryptSync: typeof nodeCrypto.scryptSync = (
    password,
    salt,
    keylen,
    options
) => {
  return nodeCrypto.scryptSync(password, salt, keylen, options)
}

export const secureHeapUsed: typeof nodeCrypto.secureHeapUsed = () => {
  return nodeCrypto.secureHeapUsed()
}

export const setEngine: typeof nodeCrypto.setEngine = (
    engine,
    flags
) => {
  return nodeCrypto.setEngine(engine, flags)
}

export const setFips: typeof nodeCrypto.setFips = (
    bool
) => {
  return nodeCrypto.setFips(bool)
}

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
  return nodeCrypto.sign(algorithm, data, key, callback)
}

export const timingSafeEqual: typeof nodeCrypto.timingSafeEqual = (
    a,
    b
) => {
  return nodeCrypto.timingSafeEqual(a, b)
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
  return nodeCrypto.verify(algorithm, data, key, signature, callback)
}


// TODO: Add missing exports (typecheck is not working!)
export default <typeof nodeCrypto>{
  constants,
  checkPrime,
  checkPrimeSync,
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
  generateKeyPair,
  generateKeyPairSync,
  generateKeySync,
  generatePrime,
  generatePrimeSync,
  getCipherInfo,
  getCiphers,
  getCurves,
  getDiffieHellman,
  getFips,
  getHashes,
  getRandomValues,
  hkdf,
  hkdfSync,
  KeyObject,
  pbkdf2,
  pbkdf2Sync,
  privateDecrypt,
  privateEncrypt,
  publicDecrypt,
  publicEncrypt,
  randomBytes,
  randomFillSync,
  randomInt,
  randomUUID,
  scryptSync,
  secureHeapUsed,
  setEngine,
  setFips,
  sign,
  subtle,
  timingSafeEqual,
  verify,
  webcrypto,
};
