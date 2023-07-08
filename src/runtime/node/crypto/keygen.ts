import type nodeCrypto from "node:crypto";
import { isArrayBufferView } from "../util/types";

export const generateKeyPair: typeof nodeCrypto.generateKeyPair = (
    type,
    options,
    callback
) => {
    if (typeof options === 'function') {
        callback = options;
        options = undefined;
    }

    const job = createJob('kCryptoJobAsync', type, options);

    job.ondone = (error, result) => {
        if (error) {
            return FunctionPrototypeCall(callback, job, error);
        }
        // If no encoding was chosen, return key objects instead.
        let { 0: pubkey, 1: privkey } = result;
        pubkey = wrapKey(pubkey, PublicKeyObject);
        privkey = wrapKey(privkey, PrivateKeyObject);
        FunctionPrototypeCall(callback, job, null, pubkey, privkey);
    };

    job.run();
}
function createJob(mode:('kCryptoJobAsync' | 'kCryptoJobSync'), type:string, options) {
    const encoding = new SafeArrayIterator(parseKeyEncoding(type, options));

    switch (type) {
        case 'rsa':
        case 'rsa-pss':
        {
            const { modulusLength } = options;

            let { publicExponent } = options;
            if (publicExponent == null) {
                publicExponent = 0x1_00_01;
            }

            if (type === 'rsa') {
                return new RsaKeyPairGenJob(
                    mode,
                    kKeyVariantRSA_SSA_PKCS1_v1_5,  // Used also for RSA-OAEP
                    modulusLength,
                    publicExponent,
                    ...encoding);
            }

            const {
                hash, mgf1Hash, hashAlgorithm, mgf1HashAlgorithm, saltLength,
            } = options;

            if (hash !== undefined) {
                process.emitWarning(
                    '"options.hash" is deprecated, ' +
                    'use "options.hashAlgorithm" instead.',
                    'DeprecationWarning',
                    'DEP0154');
                if (hashAlgorithm && hash !== hashAlgorithm) {
                    throw new ERR_INVALID_ARG_VALUE('options.hash', hash);
                }
            }
            if (mgf1Hash !== undefined) {
                process.emitWarning(
                    '"options.mgf1Hash" is deprecated, ' +
                    'use "options.mgf1HashAlgorithm" instead.',
                    'DeprecationWarning',
                    'DEP0154');
                if (mgf1HashAlgorithm && mgf1Hash !== mgf1HashAlgorithm) {
                    throw new ERR_INVALID_ARG_VALUE('options.mgf1Hash', mgf1Hash);
                }
            }

            return new RsaKeyPairGenJob(
                mode,
                kKeyVariantRSA_PSS,
                modulusLength,
                publicExponent,
                hashAlgorithm || hash,
                mgf1HashAlgorithm || mgf1Hash,
                saltLength,
                ...encoding);
        }
        case 'dsa':
        {
            const { modulusLength } = options;

            let { divisorLength } = options;
            if (divisorLength == null) {
                divisorLength = -1;
            }

            return new DsaKeyPairGenJob(
                mode,
                modulusLength,
                divisorLength,
                ...encoding);
        }
        case 'ec':
        {
            const { namedCurve } = options;
            let { paramEncoding } = options;
            if (paramEncoding == null || paramEncoding === 'named')
                { paramEncoding = OPENSSL_EC_NAMED_CURVE; }
            else if (paramEncoding === 'explicit')
                { paramEncoding = OPENSSL_EC_EXPLICIT_CURVE; }
            else
                { throw new ERR_INVALID_ARG_VALUE('options.paramEncoding', paramEncoding); }

            return new EcKeyPairGenJob(
                mode,
                namedCurve,
                paramEncoding,
                ...encoding);
        }
        case 'ed25519':
        case 'ed448':
        case 'x25519':
        case 'x448':
        {
            let id;
            switch (type) {
                case 'ed25519':
                    id = EVP_PKEY_ED25519;
                    break;
                case 'ed448':
                    id = EVP_PKEY_ED448;
                    break;
                case 'x25519':
                    id = EVP_PKEY_X25519;
                    break;
                case 'x448':
                    id = EVP_PKEY_X448;
                    break;
            }
            return new NidKeyPairGenJob(mode, id, ...encoding);
        }
        case 'dh':
        {
            const { group, primeLength, prime, generator } = options;
            if (group != null) {
                if (prime != null)
                    { throw new ERR_INCOMPATIBLE_OPTION_PAIR('group', 'prime'); }
                if (primeLength != null)
                    { throw new ERR_INCOMPATIBLE_OPTION_PAIR('group', 'primeLength'); }
                if (generator != null)
                    { throw new ERR_INCOMPATIBLE_OPTION_PAIR('group', 'generator'); }

                return new DhKeyPairGenJob(mode, group, ...encoding);
            }

            if (prime != null) {
                if (primeLength != null)
                    { throw new ERR_INCOMPATIBLE_OPTION_PAIR('prime', 'primeLength'); }
            } else if (primeLength == null) {
                throw new ERR_MISSING_OPTION(
                    'At least one of the group, prime, or primeLength options');
            }

            return new DhKeyPairGenJob(
                mode,
                prime == null ? primeLength : prime,
                generator == null ? 2 : generator,
                ...encoding);
        }
        default:
        // Fall through
    }
    throw new ERR_INVALID_ARG_VALUE('type', type, 'must be a supported key type');
}

function isJwk(obj:any) {
    return obj != null && obj.kty !== undefined;
}

function wrapKey(key:any, ctor:any) {
    if (typeof key === 'string' ||
        isArrayBufferView(key) ||
        isJwk(key)) {
        return key;
    }
    // eslint-disable-next-line new-cap
    return new ctor(key);
}
