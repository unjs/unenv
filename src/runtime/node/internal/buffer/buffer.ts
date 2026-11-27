// Copyright 2018-2023 the Deno authors. All rights reserved. MIT license.
// Copyright Joyent and Node contributors. All rights reserved. MIT license.
// Copyright Feross Aboukhadijeh, and other contributors. All rights reserved. MIT license.
// downloaded from https://deno.land/std@0.177.0/node/internal/buffer.mjs?source and bundled with bun
// @ts-nocheck
const __defProp = Object.defineProperty;
const __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, {
      get: all[name],
      enumerable: true,
      configurable: true,
      set: (newValue) => (all[name] = () => newValue),
    });
};

// std@0.177.0/node/internal/error_codes.ts
const codes = {};

// std@0.177.0/node/internal_binding/_node.ts
let Encodings;
((Encodings2) => {
  Encodings2[(Encodings2["ASCII"] = 0)] = "ASCII";
  Encodings2[(Encodings2["UTF8"] = 1)] = "UTF8";
  Encodings2[(Encodings2["BASE64"] = 2)] = "BASE64";
  Encodings2[(Encodings2["UCS2"] = 3)] = "UCS2";
  Encodings2[(Encodings2["BINARY"] = 4)] = "BINARY";
  Encodings2[(Encodings2["HEX"] = 5)] = "HEX";
  Encodings2[(Encodings2["BUFFER"] = 6)] = "BUFFER";
  Encodings2[(Encodings2["BASE64URL"] = 7)] = "BASE64URL";
  Encodings2[(Encodings2["LATIN1"] = 4)] = "LATIN1";
})((Encodings ||= {}));

// std@0.177.0/node/internal_binding/string_decoder.ts
const encodings = [];
encodings[0 /* ASCII */] = "ascii";
encodings[2 /* BASE64 */] = "base64";
encodings[7 /* BASE64URL */] = "base64url";
encodings[6 /* BUFFER */] = "buffer";
encodings[5 /* HEX */] = "hex";
encodings[4 /* LATIN1 */] = "latin1";
encodings[3 /* UCS2 */] = "utf16le";
encodings[1 /* UTF8 */] = "utf8";

// std@0.177.0/bytes/index_of_needle.ts
function indexOfNeedle(source, needle, start = 0) {
  if (start >= source.length) {
    return -1;
  }
  if (start < 0) {
    start = Math.max(0, source.length + start);
  }
  const s = needle[0];
  for (let i = start; i < source.length; i++) {
    if (source[i] !== s) continue;
    const pin = i;
    let matched = 1;
    let j = i;
    while (matched < needle.length) {
      j++;
      if (source[j] !== needle[j - pin]) {
        break;
      }
      matched++;
    }
    if (matched === needle.length) {
      return pin;
    }
  }
  return -1;
}

// std@0.177.0/node/internal_binding/buffer.ts
function numberToBytes(n) {
  if (n === 0) return new Uint8Array([0]);
  const bytes = [];
  bytes.unshift(n & 255);
  while (n >= 256) {
    n = n >>> 8;
    bytes.unshift(n & 255);
  }
  return new Uint8Array(bytes);
}
function findLastIndex(targetBuffer, buffer, offset) {
  offset = offset > targetBuffer.length ? targetBuffer.length : offset;
  const searchableBuffer = targetBuffer.slice(0, offset + buffer.length);
  const searchableBufferLastIndex = searchableBuffer.length - 1;
  const bufferLastIndex = buffer.length - 1;
  let lastMatchIndex = -1;
  let matches = 0;
  let index = -1;
  for (let x = 0; x <= searchableBufferLastIndex; x++) {
    if (
      searchableBuffer[searchableBufferLastIndex - x] ===
      buffer[bufferLastIndex - matches]
    ) {
      if (lastMatchIndex === -1) {
        lastMatchIndex = x;
      }
      matches++;
    } else {
      matches = 0;
      if (lastMatchIndex !== -1) {
        x = lastMatchIndex + 1;
        lastMatchIndex = -1;
      }
      continue;
    }
    if (matches === buffer.length) {
      index = x;
      break;
    }
  }
  if (index === -1) return index;
  return searchableBufferLastIndex - index;
}
function indexOfBuffer(
  targetBuffer,
  buffer,
  byteOffset,
  encoding,
  forwardDirection,
) {
  if (!Encodings[encoding] === undefined) {
    throw new Error(`Unknown encoding code ${encoding}`);
  }
  if (!forwardDirection) {
    if (byteOffset < 0) {
      byteOffset = targetBuffer.length + byteOffset;
    }
    if (buffer.length === 0) {
      return byteOffset <= targetBuffer.length
        ? byteOffset
        : targetBuffer.length;
    }
    return findLastIndex(targetBuffer, buffer, byteOffset);
  }
  if (buffer.length === 0) {
    return byteOffset <= targetBuffer.length ? byteOffset : targetBuffer.length;
  }
  return indexOfNeedle(targetBuffer, buffer, byteOffset);
}
function indexOfNumber(targetBuffer, number, byteOffset, forwardDirection) {
  const bytes = numberToBytes(number);
  if (bytes.length > 1) {
    throw new Error("Multi byte number search is not supported");
  }
  return indexOfBuffer(
    targetBuffer,
    numberToBytes(number),
    byteOffset,
    1 /* UTF8 */,
    forwardDirection,
  );
}

// std@0.177.0/encoding/base64.ts
const base64abc = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "+",
  "/",
];
function encode(data) {
  const uint8 =
    typeof data === "string"
      ? new TextEncoder().encode(data)
      : data instanceof Uint8Array
        ? data
        : new Uint8Array(data);
  let result = "",
    i;
  const l = uint8.length;
  for (i = 2; i < l; i += 3) {
    result += base64abc[uint8[i - 2] >> 2];
    result += base64abc[((uint8[i - 2] & 3) << 4) | (uint8[i - 1] >> 4)];
    result += base64abc[((uint8[i - 1] & 15) << 2) | (uint8[i] >> 6)];
    result += base64abc[uint8[i] & 63];
  }
  if (i === l + 1) {
    result += base64abc[uint8[i - 2] >> 2];
    result += base64abc[(uint8[i - 2] & 3) << 4];
    result += "==";
  }
  if (i === l) {
    result += base64abc[uint8[i - 2] >> 2];
    result += base64abc[((uint8[i - 2] & 3) << 4) | (uint8[i - 1] >> 4)];
    result += base64abc[(uint8[i - 1] & 15) << 2];
    result += "=";
  }
  return result;
}
function decode(b64) {
  const binString = atob(b64);
  const size = binString.length;
  const bytes = new Uint8Array(size);
  for (let i = 0; i < size; i++) {
    bytes[i] = binString.charCodeAt(i);
  }
  return bytes;
}

// std@0.177.0/encoding/base64url.ts
function addPaddingToBase64url(base64url) {
  if (base64url.length % 4 === 2) return base64url + "==";
  if (base64url.length % 4 === 3) return base64url + "=";
  if (base64url.length % 4 === 1) {
    throw new TypeError("Illegal base64url string!");
  }
  return base64url;
}
function convertBase64urlToBase64(b64url) {
  if (!/^[-_A-Z0-9]*?={0,2}$/i.test(b64url)) {
    throw new TypeError("Failed to decode base64url: invalid character");
  }
  return addPaddingToBase64url(b64url).replace(/\-/g, "+").replace(/_/g, "/");
}
function convertBase64ToBase64url(b64) {
  return b64.replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}
function encode2(data) {
  return convertBase64ToBase64url(encode(data));
}
function decode2(b64url) {
  return decode(convertBase64urlToBase64(b64url));
}

// std@0.177.0/node/internal_binding/_utils.ts
function asciiToBytes(str) {
  const byteArray = [];
  for (let i = 0; i < str.length; ++i) {
    byteArray.push(str.charCodeAt(i) & 255);
  }
  return new Uint8Array(byteArray);
}
function base64ToBytes(str) {
  str = base64clean(str);
  str = str.replaceAll("-", "+").replaceAll("_", "/");
  return decode(str);
}
const INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g;
function base64clean(str) {
  str = str.split("=")[0];
  str = str.trim().replace(INVALID_BASE64_RE, "");
  if (str.length < 2) return "";
  while (str.length % 4 !== 0) {
    str = str + "=";
  }
  return str;
}
function base64UrlToBytes(str) {
  str = base64clean(str);
  str = str.replaceAll("+", "-").replaceAll("/", "_");
  return decode2(str);
}
function hexToBytes(str) {
  const byteArray = new Uint8Array(Math.floor((str || "").length / 2));
  let i;
  for (i = 0; i < byteArray.length; i++) {
    const a = Number.parseInt(str[i * 2], 16);
    const b = Number.parseInt(str[i * 2 + 1], 16);
    if (Number.isNaN(a) && Number.isNaN(b)) {
      break;
    }
    byteArray[i] = (a << 4) | b;
  }
  return new Uint8Array(
    i === byteArray.length ? byteArray : byteArray.slice(0, i),
  );
}
function utf16leToBytes(str, units) {
  let c, hi, lo;
  const byteArray = [];
  for (let i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) {
      break;
    }
    c = str.charCodeAt(i);
    hi = c >> 8;
    lo = c % 256;
    byteArray.push(lo);
    byteArray.push(hi);
  }
  return new Uint8Array(byteArray);
}
function bytesToAscii(bytes) {
  let ret = "";
  for (const byte of bytes) {
    ret += String.fromCharCode(byte & 127);
  }
  return ret;
}
function bytesToUtf16le(bytes) {
  let res = "";
  for (let i = 0; i < bytes.length - 1; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
  }
  return res;
}

// std@0.177.0/node/internal_binding/types.ts
const exports_types = {};
__export(exports_types, {
  isWeakSet: () => isWeakSet,
  isWeakMap: () => isWeakMap,
  isSymbolObject: () => isSymbolObject,
  isStringObject: () => isStringObject,
  isSharedArrayBuffer: () => isSharedArrayBuffer,
  isSetIterator: () => isSetIterator,
  isSet: () => isSet,
  isRegExp: () => isRegExp,
  isProxy: () => isProxy,
  isPromise: () => isPromise,
  isNumberObject: () => isNumberObject,
  isNativeError: () => isNativeError,
  isModuleNamespaceObject: () => isModuleNamespaceObject,
  isMapIterator: () => isMapIterator,
  isMap: () => isMap,
  isGeneratorObject: () => isGeneratorObject,
  isGeneratorFunction: () => isGeneratorFunction,
  isDate: () => isDate,
  isDataView: () => isDataView,
  isBoxedPrimitive: () => isBoxedPrimitive,
  isBooleanObject: () => isBooleanObject,
  isBigIntObject: () => isBigIntObject,
  isAsyncFunction: () => isAsyncFunction,
  isArrayBuffer: () => isArrayBuffer,
  isArgumentsObject: () => isArgumentsObject,
  isAnyArrayBuffer: () => isAnyArrayBuffer,
  default: () => types_default,
});

// std@0.177.0/node/_core.ts
let DenoCore;
const { Deno } = globalThis;
if (Deno?.[Deno.internal]?.core) {
  DenoCore = Deno[Deno.internal].core;
} else if (Deno?.core) {
  DenoCore = Deno.core;
} else {
  DenoCore = {};
}
const core = {
  runMicrotasks:
    DenoCore.runMicrotasks ??
    function () {
      throw new Error(
        "Deno.core.runMicrotasks() is not supported in this environment",
      );
    },
  setHasTickScheduled:
    DenoCore.setHasTickScheduled ??
    function () {
      throw new Error(
        "Deno.core.setHasTickScheduled() is not supported in this environment",
      );
    },
  hasTickScheduled:
    DenoCore.hasTickScheduled ??
    function () {
      throw new Error(
        "Deno.core.hasTickScheduled() is not supported in this environment",
      );
    },
  setNextTickCallback: DenoCore.setNextTickCallback ?? undefined,
  setMacrotaskCallback:
    DenoCore.setMacrotaskCallback ??
    function () {
      throw new Error(
        "Deno.core.setNextTickCallback() is not supported in this environment",
      );
    },
  evalContext:
    DenoCore.evalContext ??
    function (_code, _filename) {
      throw new Error(
        "Deno.core.evalContext is not supported in this environment",
      );
    },
  encode:
    DenoCore.encode ??
    function (chunk) {
      return new TextEncoder().encode(chunk);
    },
  eventLoopHasMoreWork:
    DenoCore.eventLoopHasMoreWork ??
    function () {
      return false;
    },
  isProxy:
    DenoCore.isProxy ??
    function () {
      return false;
    },
  getPromiseDetails:
    DenoCore.getPromiseDetails ??
    function (_promise) {
      throw new Error(
        "Deno.core.getPromiseDetails is not supported in this environment",
      );
    },
  setPromiseHooks:
    DenoCore.setPromiseHooks ??
    function () {
      throw new Error(
        "Deno.core.setPromiseHooks is not supported in this environment",
      );
    },
  ops: DenoCore.ops ?? {
    op_napi_open(_filename) {
      throw new Error("Node API is not supported in this environment");
    },
  },
};

// std@0.177.0/node/internal_binding/types.ts
const _toString = Object.prototype.toString;
const _bigIntValueOf = BigInt.prototype.valueOf;
const _booleanValueOf = Boolean.prototype.valueOf;
const _dateValueOf = Date.prototype.valueOf;
const _numberValueOf = Number.prototype.valueOf;
const _stringValueOf = String.prototype.valueOf;
const _symbolValueOf = Symbol.prototype.valueOf;
const _weakMapHas = WeakMap.prototype.has;
const _weakSetHas = WeakSet.prototype.has;
const _getArrayBufferByteLength = Object.getOwnPropertyDescriptor(
  ArrayBuffer.prototype,
  "byteLength",
).get;
const _getSharedArrayBufferByteLength = globalThis.SharedArrayBuffer
  ? Object.getOwnPropertyDescriptor(SharedArrayBuffer.prototype, "byteLength")
      .get
  : undefined;
const _getTypedArrayToStringTag = Object.getOwnPropertyDescriptor(
  Object.getPrototypeOf(Uint8Array).prototype,
  Symbol.toStringTag,
).get;
const _getSetSize = Object.getOwnPropertyDescriptor(Set.prototype, "size").get;
const _getMapSize = Object.getOwnPropertyDescriptor(Map.prototype, "size").get;
function isObjectLike(value) {
  return value !== null && typeof value === "object";
}
function isAnyArrayBuffer(value) {
  return isArrayBuffer(value) || isSharedArrayBuffer(value);
}
function isArgumentsObject(value) {
  return (
    isObjectLike(value) &&
    value[Symbol.toStringTag] === undefined &&
    _toString.call(value) === "[object Arguments]"
  );
}
function isArrayBuffer(value) {
  try {
    _getArrayBufferByteLength.call(value);
    return true;
  } catch {
    return false;
  }
}
function isAsyncFunction(value) {
  return (
    typeof value === "function" && value[Symbol.toStringTag] === "AsyncFunction"
  );
}
function isBooleanObject(value) {
  if (!isObjectLike(value)) {
    return false;
  }
  try {
    _booleanValueOf.call(value);
    return true;
  } catch {
    return false;
  }
}
function isBoxedPrimitive(value) {
  return (
    isBooleanObject(value) ||
    isStringObject(value) ||
    isNumberObject(value) ||
    isSymbolObject(value) ||
    isBigIntObject(value)
  );
}
function isDataView(value) {
  return (
    ArrayBuffer.isView(value) &&
    _getTypedArrayToStringTag.call(value) === undefined
  );
}
function isDate(value) {
  try {
    _dateValueOf.call(value);
    return true;
  } catch {
    return false;
  }
}
function isGeneratorFunction(value) {
  return (
    typeof value === "function" &&
    value[Symbol.toStringTag] === "GeneratorFunction"
  );
}
function isGeneratorObject(value) {
  return isObjectLike(value) && value[Symbol.toStringTag] === "Generator";
}
function isMap(value) {
  try {
    _getMapSize.call(value);
    return true;
  } catch {
    return false;
  }
}
function isMapIterator(value) {
  return isObjectLike(value) && value[Symbol.toStringTag] === "Map Iterator";
}
function isModuleNamespaceObject(value) {
  return isObjectLike(value) && value[Symbol.toStringTag] === "Module";
}
function isNativeError(value) {
  return (
    isObjectLike(value) &&
    value[Symbol.toStringTag] === undefined &&
    _toString.call(value) === "[object Error]"
  );
}
function isNumberObject(value) {
  if (!isObjectLike(value)) {
    return false;
  }
  try {
    _numberValueOf.call(value);
    return true;
  } catch {
    return false;
  }
}
function isBigIntObject(value) {
  if (!isObjectLike(value)) {
    return false;
  }
  try {
    _bigIntValueOf.call(value);
    return true;
  } catch {
    return false;
  }
}
function isPromise(value) {
  return isObjectLike(value) && value[Symbol.toStringTag] === "Promise";
}
function isProxy(value) {
  return core.isProxy(value);
}
function isRegExp(value) {
  return (
    isObjectLike(value) &&
    value[Symbol.toStringTag] === undefined &&
    _toString.call(value) === "[object RegExp]"
  );
}
function isSet(value) {
  try {
    _getSetSize.call(value);
    return true;
  } catch {
    return false;
  }
}
function isSetIterator(value) {
  return isObjectLike(value) && value[Symbol.toStringTag] === "Set Iterator";
}
function isSharedArrayBuffer(value) {
  if (_getSharedArrayBufferByteLength === undefined) {
    return false;
  }
  try {
    _getSharedArrayBufferByteLength.call(value);
    return true;
  } catch {
    return false;
  }
}
function isStringObject(value) {
  if (!isObjectLike(value)) {
    return false;
  }
  try {
    _stringValueOf.call(value);
    return true;
  } catch {
    return false;
  }
}
function isSymbolObject(value) {
  if (!isObjectLike(value)) {
    return false;
  }
  try {
    _symbolValueOf.call(value);
    return true;
  } catch {
    return false;
  }
}
function isWeakMap(value) {
  try {
    _weakMapHas.call(value, null);
    return true;
  } catch {
    return false;
  }
}
function isWeakSet(value) {
  try {
    _weakSetHas.call(value, null);
    return true;
  } catch {
    return false;
  }
}
var types_default = {
  isAsyncFunction,
  isGeneratorFunction,
  isAnyArrayBuffer,
  isArrayBuffer,
  isArgumentsObject,
  isBoxedPrimitive,
  isDataView,
  isMap,
  isMapIterator,
  isModuleNamespaceObject,
  isNativeError,
  isPromise,
  isSet,
  isSetIterator,
  isWeakMap,
  isWeakSet,
  isRegExp,
  isDate,
  isStringObject,
  isNumberObject,
  isBooleanObject,
  isBigIntObject,
};

// std@0.177.0/node/internal/crypto/constants.ts
const kHandle = Symbol("kHandle");
const kKeyObject = Symbol("kKeyObject");

// std@0.177.0/node/internal/crypto/_keys.ts
const kKeyType = Symbol("kKeyType");

// std@0.177.0/node/internal/util/types.ts
const _getTypedArrayToStringTag2 = Object.getOwnPropertyDescriptor(
  Object.getPrototypeOf(Uint8Array).prototype,
  Symbol.toStringTag,
).get;
function isArrayBufferView(value) {
  return ArrayBuffer.isView(value);
}
function isTypedArray(value) {
  return _getTypedArrayToStringTag2.call(value) !== undefined;
}
function isUint8Array(value) {
  return _getTypedArrayToStringTag2.call(value) === "Uint8Array";
}
const {
  isDate: isDate2,
  isArgumentsObject: isArgumentsObject2,
  isBigIntObject: isBigIntObject2,
  isBooleanObject: isBooleanObject2,
  isNumberObject: isNumberObject2,
  isStringObject: isStringObject2,
  isSymbolObject: isSymbolObject2,
  isNativeError: isNativeError2,
  isRegExp: isRegExp2,
  isAsyncFunction: isAsyncFunction2,
  isGeneratorFunction: isGeneratorFunction2,
  isGeneratorObject: isGeneratorObject2,
  isPromise: isPromise2,
  isMap: isMap2,
  isSet: isSet2,
  isMapIterator: isMapIterator2,
  isSetIterator: isSetIterator2,
  isWeakMap: isWeakMap2,
  isWeakSet: isWeakSet2,
  isArrayBuffer: isArrayBuffer2,
  isDataView: isDataView2,
  isSharedArrayBuffer: isSharedArrayBuffer2,
  isProxy: isProxy2,
  isModuleNamespaceObject: isModuleNamespaceObject2,
  isAnyArrayBuffer: isAnyArrayBuffer2,
  isBoxedPrimitive: isBoxedPrimitive2,
} = exports_types;

// std@0.177.0/node/internal/hide_stack_frames.ts
function hideStackFrames(fn) {
  const hidden = "__node_internal_" + fn.name;
  Object.defineProperty(fn, "name", { value: hidden });
  return fn;
}

// std@0.177.0/node/internal/normalize_encoding.mjs
function normalizeEncoding(enc) {
  if (enc == null || enc === "utf8" || enc === "utf-8") return "utf8";
  return slowCases(enc);
}
function slowCases(enc) {
  switch (enc.length) {
    case 4:
      if (enc === "UTF8") return "utf8";
      if (enc === "ucs2" || enc === "UCS2") return "utf16le";
      enc = `${enc}`.toLowerCase();
      if (enc === "utf8") return "utf8";
      if (enc === "ucs2") return "utf16le";
      break;
    case 3:
      if (enc === "hex" || enc === "HEX" || `${enc}`.toLowerCase() === "hex") {
        return "hex";
      }
      break;
    case 5:
      if (enc === "ascii") return "ascii";
      if (enc === "ucs-2") return "utf16le";
      if (enc === "UTF-8") return "utf8";
      if (enc === "ASCII") return "ascii";
      if (enc === "UCS-2") return "utf16le";
      enc = `${enc}`.toLowerCase();
      if (enc === "utf-8") return "utf8";
      if (enc === "ascii") return "ascii";
      if (enc === "ucs-2") return "utf16le";
      break;
    case 6:
      if (enc === "base64") return "base64";
      if (enc === "latin1" || enc === "binary") return "latin1";
      if (enc === "BASE64") return "base64";
      if (enc === "LATIN1" || enc === "BINARY") return "latin1";
      enc = `${enc}`.toLowerCase();
      if (enc === "base64") return "base64";
      if (enc === "latin1" || enc === "binary") return "latin1";
      break;
    case 7:
      if (
        enc === "utf16le" ||
        enc === "UTF16LE" ||
        `${enc}`.toLowerCase() === "utf16le"
      ) {
        return "utf16le";
      }
      break;
    case 8:
      if (
        enc === "utf-16le" ||
        enc === "UTF-16LE" ||
        `${enc}`.toLowerCase() === "utf-16le"
      ) {
        return "utf16le";
      }
      break;
    case 9:
      if (
        enc === "base64url" ||
        enc === "BASE64URL" ||
        `${enc}`.toLowerCase() === "base64url"
      ) {
        return "base64url";
      }
      break;
    default:
      if (enc === "") return "utf8";
  }
}

// std@0.177.0/node/internal/validators.mjs
function isInt32(value) {
  return value === (value | 0);
}
function isUint32(value) {
  return value === value >>> 0;
}
const validateBuffer = hideStackFrames((buffer, name = "buffer") => {
  if (!isArrayBufferView(buffer)) {
    throw new codes.ERR_INVALID_ARG_TYPE(
      name,
      ["Buffer", "TypedArray", "DataView"],
      buffer,
    );
  }
});
const validateInteger = hideStackFrames(
  (
    value,
    name,
    min = Number.MIN_SAFE_INTEGER,
    max = Number.MAX_SAFE_INTEGER,
  ) => {
    if (typeof value !== "number") {
      throw new codes.ERR_INVALID_ARG_TYPE(name, "number", value);
    }
    if (!Number.isInteger(value)) {
      throw new codes.ERR_OUT_OF_RANGE(name, "an integer", value);
    }
    if (value < min || value > max) {
      throw new codes.ERR_OUT_OF_RANGE(name, `>= ${min} && <= ${max}`, value);
    }
  },
);
const validateObject = hideStackFrames((value, name, options) => {
  const useDefaultOptions = options == null;
  const allowArray = useDefaultOptions ? false : options.allowArray;
  const allowFunction = useDefaultOptions ? false : options.allowFunction;
  const nullable = useDefaultOptions ? false : options.nullable;
  if (
    (!nullable && value === null) ||
    (!allowArray && Array.isArray(value)) ||
    (typeof value !== "object" &&
      (!allowFunction || typeof value !== "function"))
  ) {
    throw new codes.ERR_INVALID_ARG_TYPE(name, "Object", value);
  }
});
const validateInt32 = hideStackFrames(
  (value, name, min = -2_147_483_648, max = 2_147_483_647) => {
    if (!isInt32(value)) {
      if (typeof value !== "number") {
        throw new codes.ERR_INVALID_ARG_TYPE(name, "number", value);
      }
      if (!Number.isInteger(value)) {
        throw new codes.ERR_OUT_OF_RANGE(name, "an integer", value);
      }
      throw new codes.ERR_OUT_OF_RANGE(name, `>= ${min} && <= ${max}`, value);
    }
    if (value < min || value > max) {
      throw new codes.ERR_OUT_OF_RANGE(name, `>= ${min} && <= ${max}`, value);
    }
  },
);
const validateUint32 = hideStackFrames((value, name, positive) => {
  if (!isUint32(value)) {
    if (typeof value !== "number") {
      throw new codes.ERR_INVALID_ARG_TYPE(name, "number", value);
    }
    if (!Number.isInteger(value)) {
      throw new codes.ERR_OUT_OF_RANGE(name, "an integer", value);
    }
    const min = positive ? 1 : 0;
    throw new codes.ERR_OUT_OF_RANGE(name, `>= ${min} && < 4294967296`, value);
  }
  if (positive && value === 0) {
    throw new codes.ERR_OUT_OF_RANGE(name, ">= 1 && < 4294967296", value);
  }
});
function validateString(value, name) {
  if (typeof value !== "string") {
    throw new codes.ERR_INVALID_ARG_TYPE(name, "string", value);
  }
}
const validateOneOf = hideStackFrames((value, name, oneOf) => {
  if (!Array.prototype.includes.call(oneOf, value)) {
    const allowed = Array.prototype.join.call(
      Array.prototype.map.call(oneOf, (v) =>
        typeof v === "string" ? `'${v}'` : String(v),
      ),
      ", ",
    );
    const reason = "must be one of: " + allowed;
    throw new codes.ERR_INVALID_ARG_VALUE(name, value, reason);
  }
});
const validateAbortSignal = hideStackFrames((signal, name) => {
  if (
    signal !== undefined &&
    (signal === null || typeof signal !== "object" || !("aborted" in signal))
  ) {
    throw new codes.ERR_INVALID_ARG_TYPE(name, "AbortSignal", signal);
  }
});
const validateFunction = hideStackFrames((value, name) => {
  if (typeof value !== "function") {
    throw new codes.ERR_INVALID_ARG_TYPE(name, "Function", value);
  }
});
const validateArray = hideStackFrames((value, name, minLength = 0) => {
  if (!Array.isArray(value)) {
    throw new codes.ERR_INVALID_ARG_TYPE(name, "Array", value);
  }
  if (value.length < minLength) {
    const reason = `must be longer than ${minLength}`;
    throw new codes.ERR_INVALID_ARG_VALUE(name, value, reason);
  }
});

// std@0.177.0/node/internal/primordials.mjs
const ArrayIsArray = Array.isArray;
const ObjectPrototypeHasOwnProperty = Object.hasOwn;
const RegExpPrototypeExec = RegExp.prototype.exec;
const StringFromCharCode = String.fromCharCode;

// std@0.177.0/_util/asserts.ts
class DenoStdInternalError extends Error {
  constructor(message) {
    super(message);
    this.name = "DenoStdInternalError";
  }
}
function assert(expr, msg = "") {
  if (!expr) {
    throw new DenoStdInternalError(msg);
  }
}
function unreachable() {
  throw new DenoStdInternalError("unreachable");
}

// std@0.177.0/_util/os.ts
const osType = (() => {
  const { Deno: Deno2 } = globalThis;
  if (typeof Deno2?.build?.os === "string") {
    return Deno2.build.os;
  }
  const { navigator } = globalThis;
  if (navigator?.appVersion?.includes?.("Win")) {
    return "windows";
  }
  return "linux";
})();

// std@0.177.0/node/internal_binding/uv.ts
const codeToErrorWindows = [
  [-4093, ["E2BIG", "argument list too long"]],
  [-4092, ["EACCES", "permission denied"]],
  [-4091, ["EADDRINUSE", "address already in use"]],
  [-4090, ["EADDRNOTAVAIL", "address not available"]],
  [-4089, ["EAFNOSUPPORT", "address family not supported"]],
  [-4088, ["EAGAIN", "resource temporarily unavailable"]],
  [-3000, ["EAI_ADDRFAMILY", "address family not supported"]],
  [-3001, ["EAI_AGAIN", "temporary failure"]],
  [-3002, ["EAI_BADFLAGS", "bad ai_flags value"]],
  [-3013, ["EAI_BADHINTS", "invalid value for hints"]],
  [-3003, ["EAI_CANCELED", "request canceled"]],
  [-3004, ["EAI_FAIL", "permanent failure"]],
  [-3005, ["EAI_FAMILY", "ai_family not supported"]],
  [-3006, ["EAI_MEMORY", "out of memory"]],
  [-3007, ["EAI_NODATA", "no address"]],
  [-3008, ["EAI_NONAME", "unknown node or service"]],
  [-3009, ["EAI_OVERFLOW", "argument buffer overflow"]],
  [-3014, ["EAI_PROTOCOL", "resolved protocol is unknown"]],
  [-3010, ["EAI_SERVICE", "service not available for socket type"]],
  [-3011, ["EAI_SOCKTYPE", "socket type not supported"]],
  [-4084, ["EALREADY", "connection already in progress"]],
  [-4083, ["EBADF", "bad file descriptor"]],
  [-4082, ["EBUSY", "resource busy or locked"]],
  [-4081, ["ECANCELED", "operation canceled"]],
  [-4080, ["ECHARSET", "invalid Unicode character"]],
  [-4079, ["ECONNABORTED", "software caused connection abort"]],
  [-4078, ["ECONNREFUSED", "connection refused"]],
  [-4077, ["ECONNRESET", "connection reset by peer"]],
  [-4076, ["EDESTADDRREQ", "destination address required"]],
  [-4075, ["EEXIST", "file already exists"]],
  [-4074, ["EFAULT", "bad address in system call argument"]],
  [-4036, ["EFBIG", "file too large"]],
  [-4073, ["EHOSTUNREACH", "host is unreachable"]],
  [-4072, ["EINTR", "interrupted system call"]],
  [-4071, ["EINVAL", "invalid argument"]],
  [-4070, ["EIO", "i/o error"]],
  [-4069, ["EISCONN", "socket is already connected"]],
  [-4068, ["EISDIR", "illegal operation on a directory"]],
  [-4067, ["ELOOP", "too many symbolic links encountered"]],
  [-4066, ["EMFILE", "too many open files"]],
  [-4065, ["EMSGSIZE", "message too long"]],
  [-4064, ["ENAMETOOLONG", "name too long"]],
  [-4063, ["ENETDOWN", "network is down"]],
  [-4062, ["ENETUNREACH", "network is unreachable"]],
  [-4061, ["ENFILE", "file table overflow"]],
  [-4060, ["ENOBUFS", "no buffer space available"]],
  [-4059, ["ENODEV", "no such device"]],
  [-4058, ["ENOENT", "no such file or directory"]],
  [-4057, ["ENOMEM", "not enough memory"]],
  [-4056, ["ENONET", "machine is not on the network"]],
  [-4035, ["ENOPROTOOPT", "protocol not available"]],
  [-4055, ["ENOSPC", "no space left on device"]],
  [-4054, ["ENOSYS", "function not implemented"]],
  [-4053, ["ENOTCONN", "socket is not connected"]],
  [-4052, ["ENOTDIR", "not a directory"]],
  [-4051, ["ENOTEMPTY", "directory not empty"]],
  [-4050, ["ENOTSOCK", "socket operation on non-socket"]],
  [-4049, ["ENOTSUP", "operation not supported on socket"]],
  [-4048, ["EPERM", "operation not permitted"]],
  [-4047, ["EPIPE", "broken pipe"]],
  [-4046, ["EPROTO", "protocol error"]],
  [-4045, ["EPROTONOSUPPORT", "protocol not supported"]],
  [-4044, ["EPROTOTYPE", "protocol wrong type for socket"]],
  [-4034, ["ERANGE", "result too large"]],
  [-4043, ["EROFS", "read-only file system"]],
  [-4042, ["ESHUTDOWN", "cannot send after transport endpoint shutdown"]],
  [-4041, ["ESPIPE", "invalid seek"]],
  [-4040, ["ESRCH", "no such process"]],
  [-4039, ["ETIMEDOUT", "connection timed out"]],
  [-4038, ["ETXTBSY", "text file is busy"]],
  [-4037, ["EXDEV", "cross-device link not permitted"]],
  [-4094, ["UNKNOWN", "unknown error"]],
  [-4095, ["EOF", "end of file"]],
  [-4033, ["ENXIO", "no such device or address"]],
  [-4032, ["EMLINK", "too many links"]],
  [-4031, ["EHOSTDOWN", "host is down"]],
  [-4030, ["EREMOTEIO", "remote I/O error"]],
  [-4029, ["ENOTTY", "inappropriate ioctl for device"]],
  [-4028, ["EFTYPE", "inappropriate file type or format"]],
  [-4027, ["EILSEQ", "illegal byte sequence"]],
];
const errorToCodeWindows = codeToErrorWindows.map(([status, [error]]) => [
  error,
  status,
]);
const codeToErrorDarwin = [
  [-7, ["E2BIG", "argument list too long"]],
  [-13, ["EACCES", "permission denied"]],
  [-48, ["EADDRINUSE", "address already in use"]],
  [-49, ["EADDRNOTAVAIL", "address not available"]],
  [-47, ["EAFNOSUPPORT", "address family not supported"]],
  [-35, ["EAGAIN", "resource temporarily unavailable"]],
  [-3000, ["EAI_ADDRFAMILY", "address family not supported"]],
  [-3001, ["EAI_AGAIN", "temporary failure"]],
  [-3002, ["EAI_BADFLAGS", "bad ai_flags value"]],
  [-3013, ["EAI_BADHINTS", "invalid value for hints"]],
  [-3003, ["EAI_CANCELED", "request canceled"]],
  [-3004, ["EAI_FAIL", "permanent failure"]],
  [-3005, ["EAI_FAMILY", "ai_family not supported"]],
  [-3006, ["EAI_MEMORY", "out of memory"]],
  [-3007, ["EAI_NODATA", "no address"]],
  [-3008, ["EAI_NONAME", "unknown node or service"]],
  [-3009, ["EAI_OVERFLOW", "argument buffer overflow"]],
  [-3014, ["EAI_PROTOCOL", "resolved protocol is unknown"]],
  [-3010, ["EAI_SERVICE", "service not available for socket type"]],
  [-3011, ["EAI_SOCKTYPE", "socket type not supported"]],
  [-37, ["EALREADY", "connection already in progress"]],
  [-9, ["EBADF", "bad file descriptor"]],
  [-16, ["EBUSY", "resource busy or locked"]],
  [-89, ["ECANCELED", "operation canceled"]],
  [-4080, ["ECHARSET", "invalid Unicode character"]],
  [-53, ["ECONNABORTED", "software caused connection abort"]],
  [-61, ["ECONNREFUSED", "connection refused"]],
  [-54, ["ECONNRESET", "connection reset by peer"]],
  [-39, ["EDESTADDRREQ", "destination address required"]],
  [-17, ["EEXIST", "file already exists"]],
  [-14, ["EFAULT", "bad address in system call argument"]],
  [-27, ["EFBIG", "file too large"]],
  [-65, ["EHOSTUNREACH", "host is unreachable"]],
  [-4, ["EINTR", "interrupted system call"]],
  [-22, ["EINVAL", "invalid argument"]],
  [-5, ["EIO", "i/o error"]],
  [-56, ["EISCONN", "socket is already connected"]],
  [-21, ["EISDIR", "illegal operation on a directory"]],
  [-62, ["ELOOP", "too many symbolic links encountered"]],
  [-24, ["EMFILE", "too many open files"]],
  [-40, ["EMSGSIZE", "message too long"]],
  [-63, ["ENAMETOOLONG", "name too long"]],
  [-50, ["ENETDOWN", "network is down"]],
  [-51, ["ENETUNREACH", "network is unreachable"]],
  [-23, ["ENFILE", "file table overflow"]],
  [-55, ["ENOBUFS", "no buffer space available"]],
  [-19, ["ENODEV", "no such device"]],
  [-2, ["ENOENT", "no such file or directory"]],
  [-12, ["ENOMEM", "not enough memory"]],
  [-4056, ["ENONET", "machine is not on the network"]],
  [-42, ["ENOPROTOOPT", "protocol not available"]],
  [-28, ["ENOSPC", "no space left on device"]],
  [-78, ["ENOSYS", "function not implemented"]],
  [-57, ["ENOTCONN", "socket is not connected"]],
  [-20, ["ENOTDIR", "not a directory"]],
  [-66, ["ENOTEMPTY", "directory not empty"]],
  [-38, ["ENOTSOCK", "socket operation on non-socket"]],
  [-45, ["ENOTSUP", "operation not supported on socket"]],
  [-1, ["EPERM", "operation not permitted"]],
  [-32, ["EPIPE", "broken pipe"]],
  [-100, ["EPROTO", "protocol error"]],
  [-43, ["EPROTONOSUPPORT", "protocol not supported"]],
  [-41, ["EPROTOTYPE", "protocol wrong type for socket"]],
  [-34, ["ERANGE", "result too large"]],
  [-30, ["EROFS", "read-only file system"]],
  [-58, ["ESHUTDOWN", "cannot send after transport endpoint shutdown"]],
  [-29, ["ESPIPE", "invalid seek"]],
  [-3, ["ESRCH", "no such process"]],
  [-60, ["ETIMEDOUT", "connection timed out"]],
  [-26, ["ETXTBSY", "text file is busy"]],
  [-18, ["EXDEV", "cross-device link not permitted"]],
  [-4094, ["UNKNOWN", "unknown error"]],
  [-4095, ["EOF", "end of file"]],
  [-6, ["ENXIO", "no such device or address"]],
  [-31, ["EMLINK", "too many links"]],
  [-64, ["EHOSTDOWN", "host is down"]],
  [-4030, ["EREMOTEIO", "remote I/O error"]],
  [-25, ["ENOTTY", "inappropriate ioctl for device"]],
  [-79, ["EFTYPE", "inappropriate file type or format"]],
  [-92, ["EILSEQ", "illegal byte sequence"]],
];
const errorToCodeDarwin = codeToErrorDarwin.map(([status, [code]]) => [
  code,
  status,
]);
const codeToErrorLinux = [
  [-7, ["E2BIG", "argument list too long"]],
  [-13, ["EACCES", "permission denied"]],
  [-98, ["EADDRINUSE", "address already in use"]],
  [-99, ["EADDRNOTAVAIL", "address not available"]],
  [-97, ["EAFNOSUPPORT", "address family not supported"]],
  [-11, ["EAGAIN", "resource temporarily unavailable"]],
  [-3000, ["EAI_ADDRFAMILY", "address family not supported"]],
  [-3001, ["EAI_AGAIN", "temporary failure"]],
  [-3002, ["EAI_BADFLAGS", "bad ai_flags value"]],
  [-3013, ["EAI_BADHINTS", "invalid value for hints"]],
  [-3003, ["EAI_CANCELED", "request canceled"]],
  [-3004, ["EAI_FAIL", "permanent failure"]],
  [-3005, ["EAI_FAMILY", "ai_family not supported"]],
  [-3006, ["EAI_MEMORY", "out of memory"]],
  [-3007, ["EAI_NODATA", "no address"]],
  [-3008, ["EAI_NONAME", "unknown node or service"]],
  [-3009, ["EAI_OVERFLOW", "argument buffer overflow"]],
  [-3014, ["EAI_PROTOCOL", "resolved protocol is unknown"]],
  [-3010, ["EAI_SERVICE", "service not available for socket type"]],
  [-3011, ["EAI_SOCKTYPE", "socket type not supported"]],
  [-114, ["EALREADY", "connection already in progress"]],
  [-9, ["EBADF", "bad file descriptor"]],
  [-16, ["EBUSY", "resource busy or locked"]],
  [-125, ["ECANCELED", "operation canceled"]],
  [-4080, ["ECHARSET", "invalid Unicode character"]],
  [-103, ["ECONNABORTED", "software caused connection abort"]],
  [-111, ["ECONNREFUSED", "connection refused"]],
  [-104, ["ECONNRESET", "connection reset by peer"]],
  [-89, ["EDESTADDRREQ", "destination address required"]],
  [-17, ["EEXIST", "file already exists"]],
  [-14, ["EFAULT", "bad address in system call argument"]],
  [-27, ["EFBIG", "file too large"]],
  [-113, ["EHOSTUNREACH", "host is unreachable"]],
  [-4, ["EINTR", "interrupted system call"]],
  [-22, ["EINVAL", "invalid argument"]],
  [-5, ["EIO", "i/o error"]],
  [-106, ["EISCONN", "socket is already connected"]],
  [-21, ["EISDIR", "illegal operation on a directory"]],
  [-40, ["ELOOP", "too many symbolic links encountered"]],
  [-24, ["EMFILE", "too many open files"]],
  [-90, ["EMSGSIZE", "message too long"]],
  [-36, ["ENAMETOOLONG", "name too long"]],
  [-100, ["ENETDOWN", "network is down"]],
  [-101, ["ENETUNREACH", "network is unreachable"]],
  [-23, ["ENFILE", "file table overflow"]],
  [-105, ["ENOBUFS", "no buffer space available"]],
  [-19, ["ENODEV", "no such device"]],
  [-2, ["ENOENT", "no such file or directory"]],
  [-12, ["ENOMEM", "not enough memory"]],
  [-64, ["ENONET", "machine is not on the network"]],
  [-92, ["ENOPROTOOPT", "protocol not available"]],
  [-28, ["ENOSPC", "no space left on device"]],
  [-38, ["ENOSYS", "function not implemented"]],
  [-107, ["ENOTCONN", "socket is not connected"]],
  [-20, ["ENOTDIR", "not a directory"]],
  [-39, ["ENOTEMPTY", "directory not empty"]],
  [-88, ["ENOTSOCK", "socket operation on non-socket"]],
  [-95, ["ENOTSUP", "operation not supported on socket"]],
  [-1, ["EPERM", "operation not permitted"]],
  [-32, ["EPIPE", "broken pipe"]],
  [-71, ["EPROTO", "protocol error"]],
  [-93, ["EPROTONOSUPPORT", "protocol not supported"]],
  [-91, ["EPROTOTYPE", "protocol wrong type for socket"]],
  [-34, ["ERANGE", "result too large"]],
  [-30, ["EROFS", "read-only file system"]],
  [-108, ["ESHUTDOWN", "cannot send after transport endpoint shutdown"]],
  [-29, ["ESPIPE", "invalid seek"]],
  [-3, ["ESRCH", "no such process"]],
  [-110, ["ETIMEDOUT", "connection timed out"]],
  [-26, ["ETXTBSY", "text file is busy"]],
  [-18, ["EXDEV", "cross-device link not permitted"]],
  [-4094, ["UNKNOWN", "unknown error"]],
  [-4095, ["EOF", "end of file"]],
  [-6, ["ENXIO", "no such device or address"]],
  [-31, ["EMLINK", "too many links"]],
  [-112, ["EHOSTDOWN", "host is down"]],
  [-121, ["EREMOTEIO", "remote I/O error"]],
  [-25, ["ENOTTY", "inappropriate ioctl for device"]],
  [-4028, ["EFTYPE", "inappropriate file type or format"]],
  [-84, ["EILSEQ", "illegal byte sequence"]],
];
const errorToCodeLinux = codeToErrorLinux.map(([status, [code]]) => [
  code,
  status,
]);
const codeToErrorFreebsd = [
  [-7, ["E2BIG", "argument list too long"]],
  [-13, ["EACCES", "permission denied"]],
  [-48, ["EADDRINUSE", "address already in use"]],
  [-49, ["EADDRNOTAVAIL", "address not available"]],
  [-47, ["EAFNOSUPPORT", "address family not supported"]],
  [-35, ["EAGAIN", "resource temporarily unavailable"]],
  [-3000, ["EAI_ADDRFAMILY", "address family not supported"]],
  [-3001, ["EAI_AGAIN", "temporary failure"]],
  [-3002, ["EAI_BADFLAGS", "bad ai_flags value"]],
  [-3013, ["EAI_BADHINTS", "invalid value for hints"]],
  [-3003, ["EAI_CANCELED", "request canceled"]],
  [-3004, ["EAI_FAIL", "permanent failure"]],
  [-3005, ["EAI_FAMILY", "ai_family not supported"]],
  [-3006, ["EAI_MEMORY", "out of memory"]],
  [-3007, ["EAI_NODATA", "no address"]],
  [-3008, ["EAI_NONAME", "unknown node or service"]],
  [-3009, ["EAI_OVERFLOW", "argument buffer overflow"]],
  [-3014, ["EAI_PROTOCOL", "resolved protocol is unknown"]],
  [-3010, ["EAI_SERVICE", "service not available for socket type"]],
  [-3011, ["EAI_SOCKTYPE", "socket type not supported"]],
  [-37, ["EALREADY", "connection already in progress"]],
  [-9, ["EBADF", "bad file descriptor"]],
  [-16, ["EBUSY", "resource busy or locked"]],
  [-85, ["ECANCELED", "operation canceled"]],
  [-4080, ["ECHARSET", "invalid Unicode character"]],
  [-53, ["ECONNABORTED", "software caused connection abort"]],
  [-61, ["ECONNREFUSED", "connection refused"]],
  [-54, ["ECONNRESET", "connection reset by peer"]],
  [-39, ["EDESTADDRREQ", "destination address required"]],
  [-17, ["EEXIST", "file already exists"]],
  [-14, ["EFAULT", "bad address in system call argument"]],
  [-27, ["EFBIG", "file too large"]],
  [-65, ["EHOSTUNREACH", "host is unreachable"]],
  [-4, ["EINTR", "interrupted system call"]],
  [-22, ["EINVAL", "invalid argument"]],
  [-5, ["EIO", "i/o error"]],
  [-56, ["EISCONN", "socket is already connected"]],
  [-21, ["EISDIR", "illegal operation on a directory"]],
  [-62, ["ELOOP", "too many symbolic links encountered"]],
  [-24, ["EMFILE", "too many open files"]],
  [-40, ["EMSGSIZE", "message too long"]],
  [-63, ["ENAMETOOLONG", "name too long"]],
  [-50, ["ENETDOWN", "network is down"]],
  [-51, ["ENETUNREACH", "network is unreachable"]],
  [-23, ["ENFILE", "file table overflow"]],
  [-55, ["ENOBUFS", "no buffer space available"]],
  [-19, ["ENODEV", "no such device"]],
  [-2, ["ENOENT", "no such file or directory"]],
  [-12, ["ENOMEM", "not enough memory"]],
  [-4056, ["ENONET", "machine is not on the network"]],
  [-42, ["ENOPROTOOPT", "protocol not available"]],
  [-28, ["ENOSPC", "no space left on device"]],
  [-78, ["ENOSYS", "function not implemented"]],
  [-57, ["ENOTCONN", "socket is not connected"]],
  [-20, ["ENOTDIR", "not a directory"]],
  [-66, ["ENOTEMPTY", "directory not empty"]],
  [-38, ["ENOTSOCK", "socket operation on non-socket"]],
  [-45, ["ENOTSUP", "operation not supported on socket"]],
  [-84, ["EOVERFLOW", "value too large for defined data type"]],
  [-1, ["EPERM", "operation not permitted"]],
  [-32, ["EPIPE", "broken pipe"]],
  [-92, ["EPROTO", "protocol error"]],
  [-43, ["EPROTONOSUPPORT", "protocol not supported"]],
  [-41, ["EPROTOTYPE", "protocol wrong type for socket"]],
  [-34, ["ERANGE", "result too large"]],
  [-30, ["EROFS", "read-only file system"]],
  [-58, ["ESHUTDOWN", "cannot send after transport endpoint shutdown"]],
  [-29, ["ESPIPE", "invalid seek"]],
  [-3, ["ESRCH", "no such process"]],
  [-60, ["ETIMEDOUT", "connection timed out"]],
  [-26, ["ETXTBSY", "text file is busy"]],
  [-18, ["EXDEV", "cross-device link not permitted"]],
  [-4094, ["UNKNOWN", "unknown error"]],
  [-4095, ["EOF", "end of file"]],
  [-6, ["ENXIO", "no such device or address"]],
  [-31, ["EMLINK", "too many links"]],
  [-64, ["EHOSTDOWN", "host is down"]],
  [-4030, ["EREMOTEIO", "remote I/O error"]],
  [-25, ["ENOTTY", "inappropriate ioctl for device"]],
  [-79, ["EFTYPE", "inappropriate file type or format"]],
  [-86, ["EILSEQ", "illegal byte sequence"]],
  [-44, ["ESOCKTNOSUPPORT", "socket type not supported"]],
];
const errorToCodeFreebsd = codeToErrorFreebsd.map(([status, [code]]) => [
  code,
  status,
]);
const errorMap = new Map(
  osType === "windows"
    ? codeToErrorWindows
    : osType === "darwin"
      ? codeToErrorDarwin
      : osType === "linux"
        ? codeToErrorLinux
        : osType === "freebsd"
          ? codeToErrorFreebsd
          : unreachable(),
);
const codeMap = new Map(
  osType === "windows"
    ? errorToCodeWindows
    : osType === "darwin"
      ? errorToCodeDarwin
      : osType === "linux"
        ? errorToCodeLinux
        : osType === "freebsd"
          ? errorToCodeFreebsd
          : unreachable(),
);
const UV_EAI_MEMORY = codeMap.get("EAI_MEMORY");
const UV_EBADF = codeMap.get("EBADF");
const UV_EEXIST = codeMap.get("EEXIST");
const UV_EINVAL = codeMap.get("EINVAL");
const UV_ENOENT = codeMap.get("ENOENT");
const UV_ENOTSOCK = codeMap.get("ENOTSOCK");
const UV_UNKNOWN = codeMap.get("UNKNOWN");

// std@0.177.0/node/_utils.ts
const NumberIsSafeInteger = Number.isSafeInteger;
function getSystemErrorName(code) {
  if (typeof code !== "number") {
    throw new codes.ERR_INVALID_ARG_TYPE("err", "number", code);
  }
  if (code >= 0 || !NumberIsSafeInteger(code)) {
    throw new codes.ERR_OUT_OF_RANGE("err", "a negative integer", code);
  }
  return errorMap.get(code)?.[0];
}

// std@0.177.0/node/internal_binding/util.ts
const ALL_PROPERTIES = 0;
const ONLY_WRITABLE = 1;
const ONLY_ENUMERABLE = 2;
const ONLY_CONFIGURABLE = 4;
const SKIP_STRINGS = 8;
const SKIP_SYMBOLS = 16;
const isNumericLookup = {};
function isArrayIndex(value) {
  switch (typeof value) {
    case "number":
      return value >= 0 && (value | 0) === value;
    case "string": {
      const result = isNumericLookup[value];
      if (result !== undefined) {
        return result;
      }
      const length = value.length;
      if (length === 0) {
        return (isNumericLookup[value] = false);
      }
      let ch = 0;
      let i = 0;
      for (; i < length; ++i) {
        ch = value.charCodeAt(i);
        if ((i === 0 && ch === 48 && length > 1) || ch < 48 || ch > 57) {
          return (isNumericLookup[value] = false);
        }
      }
      return (isNumericLookup[value] = true);
    }
    default:
      return false;
  }
}
function getOwnNonIndexProperties(obj, filter) {
  let allProperties = [
    ...Object.getOwnPropertyNames(obj),
    ...Object.getOwnPropertySymbols(obj),
  ];
  if (Array.isArray(obj)) {
    allProperties = allProperties.filter((k) => !isArrayIndex(k));
  }
  if (filter === ALL_PROPERTIES) {
    return allProperties;
  }
  const result = [];
  for (const key of allProperties) {
    const desc = Object.getOwnPropertyDescriptor(obj, key);
    if (desc === undefined) {
      continue;
    }
    if (filter & ONLY_WRITABLE && !desc.writable) {
      continue;
    }
    if (filter & ONLY_ENUMERABLE && !desc.enumerable) {
      continue;
    }
    if (filter & ONLY_CONFIGURABLE && !desc.configurable) {
      continue;
    }
    if (filter & SKIP_STRINGS && typeof key === "string") {
      continue;
    }
    if (filter & SKIP_SYMBOLS && typeof key === "symbol") {
      continue;
    }
    result.push(key);
  }
  return result;
}

// std@0.177.0/node/internal/util/inspect.mjs
const kObjectType = 0;
const kArrayType = 1;
const kArrayExtrasType = 2;
const kMinLineLength = 16;
const kWeak = 0;
const kIterator = 1;
const kMapEntries = 2;
const kPending = 0;
const kRejected = 2;
const meta = [
  String.raw`\x00`,
  String.raw`\x01`,
  String.raw`\x02`,
  String.raw`\x03`,
  String.raw`\x04`,
  String.raw`\x05`,
  String.raw`\x06`,
  String.raw`\x07`,
  String.raw`\b`,
  String.raw`\t`,
  String.raw`\n`,
  String.raw`\x0B`,
  String.raw`\f`,
  String.raw`\r`,
  String.raw`\x0E`,
  String.raw`\x0F`,
  String.raw`\x10`,
  String.raw`\x11`,
  String.raw`\x12`,
  String.raw`\x13`,
  String.raw`\x14`,
  String.raw`\x15`,
  String.raw`\x16`,
  String.raw`\x17`,
  String.raw`\x18`,
  String.raw`\x19`,
  String.raw`\x1A`,
  String.raw`\x1B`,
  String.raw`\x1C`,
  String.raw`\x1D`,
  String.raw`\x1E`,
  String.raw`\x1F`,
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  String.raw`\'`,
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "\\\\",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  String.raw`\x7F`,
  String.raw`\x80`,
  String.raw`\x81`,
  String.raw`\x82`,
  String.raw`\x83`,
  String.raw`\x84`,
  String.raw`\x85`,
  String.raw`\x86`,
  String.raw`\x87`,
  String.raw`\x88`,
  String.raw`\x89`,
  String.raw`\x8A`,
  String.raw`\x8B`,
  String.raw`\x8C`,
  String.raw`\x8D`,
  String.raw`\x8E`,
  String.raw`\x8F`,
  String.raw`\x90`,
  String.raw`\x91`,
  String.raw`\x92`,
  String.raw`\x93`,
  String.raw`\x94`,
  String.raw`\x95`,
  String.raw`\x96`,
  String.raw`\x97`,
  String.raw`\x98`,
  String.raw`\x99`,
  String.raw`\x9A`,
  String.raw`\x9B`,
  String.raw`\x9C`,
  String.raw`\x9D`,
  String.raw`\x9E`,
  String.raw`\x9F`,
];
const isUndetectableObject = (v) => v === undefined && v !== undefined;
const strEscapeSequencesRegExp = /[\u0000-\u001F\u0027\u005C\u007F-\u009F]/;
const strEscapeSequencesReplacer = /[\u0000-\u001F\u0027\u005C\u007F-\u009F]/g;
const strEscapeSequencesRegExpSingle = /[\u0000-\u001F\u005C\u007F-\u009F]/;
const strEscapeSequencesReplacerSingle = /[\u0000-\u001F\u005C\u007F-\u009F]/g;
const keyStrRegExp = /^[a-zA-Z_][a-zA-Z_0-9]*$/;
const numberRegExp = /^(0|[1-9][0-9]*)$/;
const nodeModulesRegExp = /[/\\]node_modules[/\\](.+?)(?=[/\\])/g;
const classRegExp = /^(\s+[^(]*?)\s*{/;
const stripCommentsRegExp = /(\/\/.*?\n)|(\/\*(.|\n)*?\*\/)/g;
const inspectDefaultOptions = {
  showHidden: false,
  depth: 2,
  colors: false,
  customInspect: true,
  showProxy: false,
  maxArrayLength: 100,
  maxStringLength: 1e4,
  breakLength: 80,
  compact: 3,
  sorted: false,
  getters: false,
};
function getUserOptions(ctx, isCrossContext) {
  const ret = {
    stylize: ctx.stylize,
    showHidden: ctx.showHidden,
    depth: ctx.depth,
    colors: ctx.colors,
    customInspect: ctx.customInspect,
    showProxy: ctx.showProxy,
    maxArrayLength: ctx.maxArrayLength,
    maxStringLength: ctx.maxStringLength,
    breakLength: ctx.breakLength,
    compact: ctx.compact,
    sorted: ctx.sorted,
    getters: ctx.getters,
    ...ctx.userOptions,
  };
  if (isCrossContext) {
    Object.setPrototypeOf(ret, null);
    for (const key of Object.keys(ret)) {
      if (
        (typeof ret[key] === "object" || typeof ret[key] === "function") &&
        ret[key] !== null
      ) {
        delete ret[key];
      }
    }
    ret.stylize = Object.setPrototypeOf((value, flavour) => {
      let stylized;
      try {
        stylized = `${ctx.stylize(value, flavour)}`;
      } catch {}
      if (typeof stylized !== "string") return value;
      return stylized;
    }, null);
  }
  return ret;
}
function inspect(value, opts) {
  const ctx = {
    budget: {},
    indentationLvl: 0,
    seen: [],
    currentDepth: 0,
    stylize: stylizeNoColor,
    showHidden: inspectDefaultOptions.showHidden,
    depth: inspectDefaultOptions.depth,
    colors: inspectDefaultOptions.colors,
    customInspect: inspectDefaultOptions.customInspect,
    showProxy: inspectDefaultOptions.showProxy,
    maxArrayLength: inspectDefaultOptions.maxArrayLength,
    maxStringLength: inspectDefaultOptions.maxStringLength,
    breakLength: inspectDefaultOptions.breakLength,
    compact: inspectDefaultOptions.compact,
    sorted: inspectDefaultOptions.sorted,
    getters: inspectDefaultOptions.getters,
  };
  if (arguments.length > 1) {
    if (arguments.length > 2) {
      if (arguments[2] !== undefined) {
        ctx.depth = arguments[2];
      }
      if (arguments.length > 3 && arguments[3] !== undefined) {
        ctx.colors = arguments[3];
      }
    }
    if (typeof opts === "boolean") {
      ctx.showHidden = opts;
    } else if (opts) {
      const optKeys = Object.keys(opts);
      for (const key of optKeys) {
        if (inspectDefaultOptions.hasOwnProperty(key) || key === "stylize") {
          ctx[key] = opts[key];
        } else if (ctx.userOptions === undefined) {
          ctx.userOptions = opts;
        }
      }
    }
  }
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  if (ctx.maxArrayLength === null) ctx.maxArrayLength = Infinity;
  if (ctx.maxStringLength === null) ctx.maxStringLength = Infinity;
  return formatValue(ctx, value, 0);
}
const customInspectSymbol = Symbol.for("nodejs.util.inspect.custom");
inspect.custom = customInspectSymbol;
Object.defineProperty(inspect, "defaultOptions", {
  get() {
    return inspectDefaultOptions;
  },
  set(options) {
    validateObject(options, "options");
    return Object.assign(inspectDefaultOptions, options);
  },
});
const defaultFG = 39;
const defaultBG = 49;
inspect.colors = Object.assign(Object.create(null), {
  reset: [0, 0],
  bold: [1, 22],
  dim: [2, 22],
  italic: [3, 23],
  underline: [4, 24],
  blink: [5, 25],
  inverse: [7, 27],
  hidden: [8, 28],
  strikethrough: [9, 29],
  doubleunderline: [21, 24],
  black: [30, defaultFG],
  red: [31, defaultFG],
  green: [32, defaultFG],
  yellow: [33, defaultFG],
  blue: [34, defaultFG],
  magenta: [35, defaultFG],
  cyan: [36, defaultFG],
  white: [37, defaultFG],
  bgBlack: [40, defaultBG],
  bgRed: [41, defaultBG],
  bgGreen: [42, defaultBG],
  bgYellow: [43, defaultBG],
  bgBlue: [44, defaultBG],
  bgMagenta: [45, defaultBG],
  bgCyan: [46, defaultBG],
  bgWhite: [47, defaultBG],
  framed: [51, 54],
  overlined: [53, 55],
  gray: [90, defaultFG],
  redBright: [91, defaultFG],
  greenBright: [92, defaultFG],
  yellowBright: [93, defaultFG],
  blueBright: [94, defaultFG],
  magentaBright: [95, defaultFG],
  cyanBright: [96, defaultFG],
  whiteBright: [97, defaultFG],
  bgGray: [100, defaultBG],
  bgRedBright: [101, defaultBG],
  bgGreenBright: [102, defaultBG],
  bgYellowBright: [103, defaultBG],
  bgBlueBright: [104, defaultBG],
  bgMagentaBright: [105, defaultBG],
  bgCyanBright: [106, defaultBG],
  bgWhiteBright: [107, defaultBG],
});
function defineColorAlias(target, alias) {
  Object.defineProperty(inspect.colors, alias, {
    get() {
      return this[target];
    },
    set(value) {
      this[target] = value;
    },
    configurable: true,
    enumerable: false,
  });
}
defineColorAlias("gray", "grey");
defineColorAlias("gray", "blackBright");
defineColorAlias("bgGray", "bgGrey");
defineColorAlias("bgGray", "bgBlackBright");
defineColorAlias("dim", "faint");
defineColorAlias("strikethrough", "crossedout");
defineColorAlias("strikethrough", "strikeThrough");
defineColorAlias("strikethrough", "crossedOut");
defineColorAlias("hidden", "conceal");
defineColorAlias("inverse", "swapColors");
defineColorAlias("inverse", "swapcolors");
defineColorAlias("doubleunderline", "doubleUnderline");
inspect.styles = Object.assign(Object.create(null), {
  special: "cyan",
  number: "yellow",
  bigint: "yellow",
  boolean: "yellow",
  undefined: "grey",
  null: "bold",
  string: "green",
  symbol: "green",
  date: "magenta",
  regexp: "red",
  module: "underline",
});
function addQuotes(str, quotes) {
  if (quotes === -1) {
    return `"${str}"`;
  }
  if (quotes === -2) {
    return `\`${str}\``;
  }
  return `'${str}'`;
}
const escapeFn = (str) => meta[str.charCodeAt(0)];
function strEscape(str) {
  let escapeTest = strEscapeSequencesRegExp;
  let escapeReplace = strEscapeSequencesReplacer;
  let singleQuote = 39;
  if (str.includes("'")) {
    if (!str.includes('"')) {
      singleQuote = -1;
    } else if (!str.includes("`") && !str.includes("${")) {
      singleQuote = -2;
    }
    if (singleQuote !== 39) {
      escapeTest = strEscapeSequencesRegExpSingle;
      escapeReplace = strEscapeSequencesReplacerSingle;
    }
  }
  if (str.length < 5000 && !escapeTest.test(str)) {
    return addQuotes(str, singleQuote);
  }
  if (str.length > 100) {
    str = str.replace(escapeReplace, escapeFn);
    return addQuotes(str, singleQuote);
  }
  let result = "";
  let last = 0;
  const lastIndex = str.length;
  for (let i = 0; i < lastIndex; i++) {
    const point = str.charCodeAt(i);
    if (
      point === singleQuote ||
      point === 92 ||
      point < 32 ||
      (point > 126 && point < 160)
    ) {
      if (last === i) {
        result += meta[point];
      } else {
        result += `${str.slice(last, i)}${meta[point]}`;
      }
      last = i + 1;
    }
  }
  if (last !== lastIndex) {
    result += str.slice(last);
  }
  return addQuotes(result, singleQuote);
}
function stylizeWithColor(str, styleType) {
  const style = inspect.styles[styleType];
  if (style !== undefined) {
    const color = inspect.colors[style];
    if (color !== undefined) {
      return `\u001B[${color[0]}m${str}\u001B[${color[1]}m`;
    }
  }
  return str;
}
function stylizeNoColor(str) {
  return str;
}
function formatValue(ctx, value, recurseTimes, typedArray) {
  if (
    typeof value !== "object" &&
    typeof value !== "function" &&
    !isUndetectableObject(value)
  ) {
    return formatPrimitive(ctx.stylize, value, ctx);
  }
  if (value === null) {
    return ctx.stylize("null", "null");
  }
  const context = value;
  const proxy = undefined;
  if (ctx.customInspect) {
    const maybeCustom = value[customInspectSymbol];
    if (
      typeof maybeCustom === "function" &&
      maybeCustom !== inspect &&
      !(value.constructor && value.constructor.prototype === value)
    ) {
      const depth = ctx.depth === null ? null : ctx.depth - recurseTimes;
      const isCrossContext =
        proxy !== undefined || !(context instanceof Object);
      const ret = maybeCustom.call(
        context,
        depth,
        getUserOptions(ctx, isCrossContext),
      );
      if (ret !== context) {
        if (typeof ret !== "string") {
          return formatValue(ctx, ret, recurseTimes);
        }
        return ret.replace(
          /\n/g,
          `
${" ".repeat(ctx.indentationLvl)}`,
        );
      }
    }
  }
  if (ctx.seen.includes(value)) {
    let index = 1;
    if (ctx.circular === undefined) {
      ctx.circular = new Map();
      ctx.circular.set(value, index);
    } else {
      index = ctx.circular.get(value);
      if (index === undefined) {
        index = ctx.circular.size + 1;
        ctx.circular.set(value, index);
      }
    }
    return ctx.stylize(`[Circular *${index}]`, "special");
  }
  return formatRaw(ctx, value, recurseTimes, typedArray);
}
function formatRaw(ctx, value, recurseTimes, typedArray) {
  let keys;
  let protoProps;
  if (ctx.showHidden && (recurseTimes <= ctx.depth || ctx.depth === null)) {
    protoProps = [];
  }
  const constructor = getConstructorName(value, ctx, recurseTimes, protoProps);
  if (protoProps !== undefined && protoProps.length === 0) {
    protoProps = undefined;
  }
  let tag = value[Symbol.toStringTag];
  if (typeof tag !== "string") {
    tag = "";
  }
  let base = "";
  let formatter = getEmptyFormatArray;
  let braces;
  let noIterator = true;
  let i = 0;
  const filter = ctx.showHidden ? ALL_PROPERTIES : ONLY_ENUMERABLE;
  let extrasType = kObjectType;
  if (value[Symbol.iterator] || constructor === null) {
    noIterator = false;
    if (Array.isArray(value)) {
      const prefix =
        constructor !== "Array" || tag !== ""
          ? getPrefix(constructor, tag, "Array", `(${value.length})`)
          : "";
      keys = getOwnNonIndexProperties(value, filter);
      braces = [`${prefix}[`, "]"];
      if (value.length === 0 && keys.length === 0 && protoProps === undefined) {
        return `${braces[0]}]`;
      }
      extrasType = kArrayExtrasType;
      formatter = formatArray;
    } else if (isSet2(value)) {
      const size = value.size;
      const prefix = getPrefix(constructor, tag, "Set", `(${size})`);
      keys = getKeys(value, ctx.showHidden);
      formatter =
        constructor === null
          ? formatSet.bind(null, value.values())
          : formatSet.bind(null, value);
      if (size === 0 && keys.length === 0 && protoProps === undefined) {
        return `${prefix}{}`;
      }
      braces = [`${prefix}{`, "}"];
    } else if (isMap2(value)) {
      const size = value.size;
      const prefix = getPrefix(constructor, tag, "Map", `(${size})`);
      keys = getKeys(value, ctx.showHidden);
      formatter =
        constructor === null
          ? formatMap.bind(null, value.entries())
          : formatMap.bind(null, value);
      if (size === 0 && keys.length === 0 && protoProps === undefined) {
        return `${prefix}{}`;
      }
      braces = [`${prefix}{`, "}"];
    } else if (isTypedArray(value)) {
      keys = getOwnNonIndexProperties(value, filter);
      const bound = value;
      const fallback = "";
      if (constructor === null) {}
      const size = value.length;
      const prefix = getPrefix(constructor, tag, fallback, `(${size})`);
      braces = [`${prefix}[`, "]"];
      if (value.length === 0 && keys.length === 0 && !ctx.showHidden) {
        return `${braces[0]}]`;
      }
      formatter = formatTypedArray.bind(null, bound, size);
      extrasType = kArrayExtrasType;
    } else if (isMapIterator2(value)) {
      keys = getKeys(value, ctx.showHidden);
      braces = getIteratorBraces("Map", tag);
      formatter = formatIterator.bind(null, braces);
    } else if (isSetIterator2(value)) {
      keys = getKeys(value, ctx.showHidden);
      braces = getIteratorBraces("Set", tag);
      formatter = formatIterator.bind(null, braces);
    } else {
      noIterator = true;
    }
  }
  if (noIterator) {
    keys = getKeys(value, ctx.showHidden);
    braces = ["{", "}"];
    if (constructor === "Object") {
      if (isArgumentsObject2(value)) {
        braces[0] = "[Arguments] {";
      } else if (tag !== "") {
        braces[0] = `${getPrefix(constructor, tag, "Object")}{`;
      }
      if (keys.length === 0 && protoProps === undefined) {
        return `${braces[0]}}`;
      }
    } else if (typeof value === "function") {
      base = getFunctionBase(value, constructor, tag);
      if (keys.length === 0 && protoProps === undefined) {
        return ctx.stylize(base, "special");
      }
    } else if (isRegExp2(value)) {
      base = new RegExp(
        constructor === null ? new RegExp(value) : value,
      ).toString();
      const prefix = getPrefix(constructor, tag, "RegExp");
      if (prefix !== "RegExp ") {
        base = `${prefix}${base}`;
      }
      if (
        (keys.length === 0 && protoProps === undefined) ||
        (recurseTimes > ctx.depth && ctx.depth !== null)
      ) {
        return ctx.stylize(base, "regexp");
      }
    } else if (isDate2(value)) {
      base = Number.isNaN(value.getTime())
        ? value.toString()
        : value.toISOString();
      const prefix = getPrefix(constructor, tag, "Date");
      if (prefix !== "Date ") {
        base = `${prefix}${base}`;
      }
      if (keys.length === 0 && protoProps === undefined) {
        return ctx.stylize(base, "date");
      }
    } else if (value instanceof Error) {
      base = formatError(value, constructor, tag, ctx, keys);
      if (keys.length === 0 && protoProps === undefined) {
        return base;
      }
    } else if (isAnyArrayBuffer2(value)) {
      const arrayType = isArrayBuffer2(value)
        ? "ArrayBuffer"
        : "SharedArrayBuffer";
      const prefix = getPrefix(constructor, tag, arrayType);
      if (typedArray === undefined) {
        formatter = formatArrayBuffer;
      } else if (keys.length === 0 && protoProps === undefined) {
        return (
          prefix +
          `{ byteLength: ${formatNumber(ctx.stylize, value.byteLength)} }`
        );
      }
      braces[0] = `${prefix}{`;
      Array.prototype.unshift.call(keys, "byteLength");
    } else if (isDataView2(value)) {
      braces[0] = `${getPrefix(constructor, tag, "DataView")}{`;
      Array.prototype.unshift.call(keys, "byteLength", "byteOffset", "buffer");
    } else if (isPromise2(value)) {
      braces[0] = `${getPrefix(constructor, tag, "Promise")}{`;
      formatter = formatPromise;
    } else if (isWeakSet2(value)) {
      braces[0] = `${getPrefix(constructor, tag, "WeakSet")}{`;
      formatter = ctx.showHidden ? formatWeakSet : formatWeakCollection;
    } else if (isWeakMap2(value)) {
      braces[0] = `${getPrefix(constructor, tag, "WeakMap")}{`;
      formatter = ctx.showHidden ? formatWeakMap : formatWeakCollection;
    } else if (isModuleNamespaceObject2(value)) {
      braces[0] = `${getPrefix(constructor, tag, "Module")}{`;
      formatter = formatNamespaceObject.bind(null, keys);
    } else if (isBoxedPrimitive2(value)) {
      base = getBoxedBase(value, ctx, keys, constructor, tag);
      if (keys.length === 0 && protoProps === undefined) {
        return base;
      }
    } else {
      if (keys.length === 0 && protoProps === undefined) {
        return `${getCtxStyle(value, constructor, tag)}{}`;
      }
      braces[0] = `${getCtxStyle(value, constructor, tag)}{`;
    }
  }
  if (recurseTimes > ctx.depth && ctx.depth !== null) {
    let constructorName = getCtxStyle(value, constructor, tag).slice(0, -1);
    if (constructor !== null) {
      constructorName = `[${constructorName}]`;
    }
    return ctx.stylize(constructorName, "special");
  }
  recurseTimes += 1;
  ctx.seen.push(value);
  ctx.currentDepth = recurseTimes;
  let output;
  const indentationLvl = ctx.indentationLvl;
  try {
    output = formatter(ctx, value, recurseTimes);
    for (i = 0; i < keys.length; i++) {
      output.push(
        formatProperty(ctx, value, recurseTimes, keys[i], extrasType),
      );
    }
    if (protoProps !== undefined) {
      output.push(...protoProps);
    }
  } catch (error_) {
    const constructorName = getCtxStyle(value, constructor, tag).slice(0, -1);
    return handleMaxCallStackSize(ctx, error_, constructorName, indentationLvl);
  }
  if (ctx.circular !== undefined) {
    const index = ctx.circular.get(value);
    if (index !== undefined) {
      const reference = ctx.stylize(`<ref *${index}>`, "special");
      if (ctx.compact === true) {
        braces[0] = `${reference} ${braces[0]}`;
      } else {
        base = base === "" ? reference : `${reference} ${base}`;
      }
    }
  }
  ctx.seen.pop();
  if (ctx.sorted) {
    const comparator = ctx.sorted === true ? undefined : ctx.sorted;
    if (extrasType === kObjectType) {
      output = output.sort(comparator);
    } else if (keys.length > 1) {
      const sorted = output.slice(output.length - keys.length).sort(comparator);
      output.splice(output.length - keys.length, keys.length, ...sorted);
    }
  }
  const res = reduceToSingleString(
    ctx,
    output,
    base,
    braces,
    extrasType,
    recurseTimes,
    value,
  );
  const budget = ctx.budget[ctx.indentationLvl] || 0;
  const newLength = budget + res.length;
  ctx.budget[ctx.indentationLvl] = newLength;
  if (newLength > 2 ** 27) {
    ctx.depth = -1;
  }
  return res;
}
const builtInObjects = new Set(
  Object.getOwnPropertyNames(globalThis).filter((e) =>
    /^[A-Z][a-zA-Z0-9]+$/.test(e),
  ),
);
function addPrototypeProperties(ctx, main, obj, recurseTimes, output) {
  let depth = 0;
  let keys;
  let keySet;
  do {
    if (depth !== 0 || main === obj) {
      obj = Object.getPrototypeOf(obj);
      if (obj === null) {
        return;
      }
      const descriptor = Object.getOwnPropertyDescriptor(obj, "constructor");
      if (
        descriptor !== undefined &&
        typeof descriptor.value === "function" &&
        builtInObjects.has(descriptor.value.name)
      ) {
        return;
      }
    }
    if (depth === 0) {
      keySet = new Set();
    } else {
      Array.prototype.forEach.call(keys, (key) => keySet.add(key));
    }
    keys = Reflect.ownKeys(obj);
    Array.prototype.push.call(ctx.seen, main);
    for (const key of keys) {
      if (
        key === "constructor" ||
        main.hasOwnProperty(key) ||
        (depth !== 0 && keySet.has(key))
      ) {
        continue;
      }
      const desc = Object.getOwnPropertyDescriptor(obj, key);
      if (typeof desc.value === "function") {
        continue;
      }
      const value = formatProperty(
        ctx,
        obj,
        recurseTimes,
        key,
        kObjectType,
        desc,
        main,
      );
      if (ctx.colors) {
        Array.prototype.push.call(output, `\u001B[2m${value}\u001B[22m`);
      } else {
        Array.prototype.push.call(output, value);
      }
    }
    Array.prototype.pop.call(ctx.seen);
  } while (++depth !== 3);
}
function getConstructorName(obj, ctx, recurseTimes, protoProps) {
  let firstProto;
  const tmp = obj;
  while (obj || isUndetectableObject(obj)) {
    const descriptor = Object.getOwnPropertyDescriptor(obj, "constructor");
    if (
      descriptor !== undefined &&
      typeof descriptor.value === "function" &&
      descriptor.value.name !== "" &&
      isInstanceof(tmp, descriptor.value)
    ) {
      if (
        protoProps !== undefined &&
        (firstProto !== obj || !builtInObjects.has(descriptor.value.name))
      ) {
        addPrototypeProperties(
          ctx,
          tmp,
          firstProto || tmp,
          recurseTimes,
          protoProps,
        );
      }
      return descriptor.value.name;
    }
    obj = Object.getPrototypeOf(obj);
    if (firstProto === undefined) {
      firstProto = obj;
    }
  }
  if (firstProto === null) {
    return null;
  }
  const res = undefined;
  if (recurseTimes > ctx.depth && ctx.depth !== null) {
    return `${res} <Complex prototype>`;
  }
  const protoConstr = getConstructorName(
    firstProto,
    ctx,
    recurseTimes + 1,
    protoProps,
  );
  if (protoConstr === null) {
    return `${res} <${inspect(firstProto, {
      ...ctx,
      customInspect: false,
      depth: -1,
    })}>`;
  }
  return `${res} <${protoConstr}>`;
}
function formatPrimitive(fn, value, ctx) {
  if (typeof value === "string") {
    let trailer = "";
    if (value.length > ctx.maxStringLength) {
      const remaining = value.length - ctx.maxStringLength;
      value = value.slice(0, ctx.maxStringLength);
      trailer = `... ${remaining} more character${remaining > 1 ? "s" : ""}`;
    }
    if (
      ctx.compact !== true &&
      value.length > kMinLineLength &&
      value.length > ctx.breakLength - ctx.indentationLvl - 4
    ) {
      return (
        value.split(/(?<=\n)/).map((line) => fn(strEscape(line), "string"))
          .join(` +
${" ".repeat(ctx.indentationLvl + 2)}`) + trailer
      );
    }
    return fn(strEscape(value), "string") + trailer;
  }
  if (typeof value === "number") {
    return formatNumber(fn, value);
  }
  if (typeof value === "bigint") {
    return formatBigInt(fn, value);
  }
  if (typeof value === "boolean") {
    return fn(`${value}`, "boolean");
  }
  if (value === undefined) {
    return fn("undefined", "undefined");
  }
  return fn(value.toString(), "symbol");
}
function getEmptyFormatArray() {
  return [];
}
function isInstanceof(object, proto) {
  try {
    return object instanceof proto;
  } catch {
    return false;
  }
}
function getPrefix(constructor, tag, fallback, size = "") {
  if (constructor === null) {
    if (tag !== "" && fallback !== tag) {
      return `[${fallback}${size}: null prototype] [${tag}] `;
    }
    return `[${fallback}${size}: null prototype] `;
  }
  if (tag !== "" && constructor !== tag) {
    return `${constructor}${size} [${tag}] `;
  }
  return `${constructor}${size} `;
}
function formatArray(ctx, value, recurseTimes) {
  const valLen = value.length;
  const len = Math.min(Math.max(0, ctx.maxArrayLength), valLen);
  const remaining = valLen - len;
  const output = [];
  for (let i = 0; i < len; i++) {
    if (!value.hasOwnProperty(i)) {
      return formatSpecialArray(ctx, value, recurseTimes, len, output, i);
    }
    output.push(formatProperty(ctx, value, recurseTimes, i, kArrayType));
  }
  if (remaining > 0) {
    output.push(`... ${remaining} more item${remaining > 1 ? "s" : ""}`);
  }
  return output;
}
function getCtxStyle(_value, constructor, tag) {
  let fallback = "";
  if (constructor === null && fallback === tag) {
      fallback = "Object";
    }
  return getPrefix(constructor, tag, fallback);
}
function getKeys(value, showHidden) {
  let keys;
  const symbols = Object.getOwnPropertySymbols(value);
  if (showHidden) {
    keys = Object.getOwnPropertyNames(value);
    if (symbols.length > 0) {
      Array.prototype.push.apply(keys, symbols);
    }
  } else {
    try {
      keys = Object.keys(value);
    } catch {
      keys = Object.getOwnPropertyNames(value);
    }
    if (symbols.length > 0) {}
  }
  return keys;
}
function formatSet(value, ctx, _ignored, recurseTimes) {
  const output = [];
  ctx.indentationLvl += 2;
  for (const v of value) {
    Array.prototype.push.call(output, formatValue(ctx, v, recurseTimes));
  }
  ctx.indentationLvl -= 2;
  return output;
}
function formatMap(value, ctx, _gnored, recurseTimes) {
  const output = [];
  ctx.indentationLvl += 2;
  for (const { 0: k, 1: v } of value) {
    output.push(
      `${formatValue(ctx, k, recurseTimes)} => ${formatValue(ctx, v, recurseTimes)}`,
    );
  }
  ctx.indentationLvl -= 2;
  return output;
}
function formatTypedArray(value, length, ctx, _ignored, recurseTimes) {
  const maxLength = Math.min(Math.max(0, ctx.maxArrayLength), length);
  const remaining = value.length - maxLength;
  const output = new Array(maxLength);
  const elementFormatter =
    value.length > 0 && typeof value[0] === "number"
      ? formatNumber
      : formatBigInt;
  for (let i = 0; i < maxLength; ++i) {
    output[i] = elementFormatter(ctx.stylize, value[i]);
  }
  if (remaining > 0) {
    output[maxLength] = `... ${remaining} more item${remaining > 1 ? "s" : ""}`;
  }
  if (ctx.showHidden) {
    ctx.indentationLvl += 2;
    for (const key of [
      "BYTES_PER_ELEMENT",
      "length",
      "byteLength",
      "byteOffset",
      "buffer",
    ]) {
      const str = formatValue(ctx, value[key], recurseTimes, true);
      Array.prototype.push.call(output, `[${key}]: ${str}`);
    }
    ctx.indentationLvl -= 2;
  }
  return output;
}
function getIteratorBraces(type, tag) {
  if (tag !== `${type} Iterator`) {
    if (tag !== "") {
      tag += "] [";
    }
    tag += `${type} Iterator`;
  }
  return [`[${tag}] {`, "}"];
}
function formatIterator(braces, ctx, value, recurseTimes) {
  const { 0: entries, 1: isKeyValue } = value;
  if (isKeyValue) {
    braces[0] = braces[0].replace(/ Iterator] {$/, " Entries] {");
    return formatMapIterInner(ctx, recurseTimes, entries, kMapEntries);
  }
  return formatSetIterInner(ctx, recurseTimes, entries, kIterator);
}
function getFunctionBase(value, constructor, tag) {
  const stringified = Function.prototype.toString.call(value);
  if (stringified.slice(0, 5) === "class" && stringified.endsWith("}")) {
    const slice = stringified.slice(5, -1);
    const bracketIndex = slice.indexOf("{");
    if (
      bracketIndex !== -1 &&
      (!slice.slice(0, bracketIndex).includes("(") ||
        classRegExp.test(slice.replace(stripCommentsRegExp)))
    ) {
      return getClassBase(value, constructor, tag);
    }
  }
  let type = "Function";
  if (isGeneratorFunction2(value)) {
    type = `Generator${type}`;
  }
  if (isAsyncFunction2(value)) {
    type = `Async${type}`;
  }
  let base = `[${type}`;
  if (constructor === null) {
    base += " (null prototype)";
  }
  if (value.name === "") {
    base += " (anonymous)";
  } else {
    base += `: ${value.name}`;
  }
  base += "]";
  if (constructor !== type && constructor !== null) {
    base += ` ${constructor}`;
  }
  if (tag !== "" && constructor !== tag) {
    base += ` [${tag}]`;
  }
  return base;
}
function formatError(err, constructor, tag, ctx, keys) {
  const name = err.name == null ? "Error" : String(err.name);
  let len = name.length;
  let stack = err.stack ? String(err.stack) : err.toString();
  if (!ctx.showHidden && keys.length > 0) {
    for (const name2 of ["name", "message", "stack"]) {
      const index = keys.indexOf(name2);
      if (index !== -1 && stack.includes(err[name2])) {
        keys.splice(index, 1);
      }
    }
  }
  if (
    constructor === null ||
    (name.endsWith("Error") &&
      stack.startsWith(name) &&
      (stack.length === len ||
        stack[len] === ":" ||
        stack[len] ===
          `
`))
  ) {
    let fallback = "Error";
    if (constructor === null) {
      const start =
        stack.match(/^([A-Z][a-z_ A-Z0-9[\]()-]+)(?::|\n {4}at)/) ||
        stack.match(/^([a-z_A-Z0-9-]*Error)$/);
      fallback = (start && start[1]) || "";
      len = fallback.length;
      fallback = fallback || "Error";
    }
    const prefix = getPrefix(constructor, tag, fallback).slice(0, -1);
    if (name !== prefix) {
      if (prefix.includes(name)) {
        if (len === 0) {
          stack = `${prefix}: ${stack}`;
        } else {
          stack = `${prefix}${stack.slice(len)}`;
        }
      } else {
        stack = `${prefix} [${name}]${stack.slice(len)}`;
      }
    }
  }
  let pos = (err.message && stack.indexOf(err.message)) || -1;
  if (pos !== -1) {
    pos += err.message.length;
  }
  const stackStart = stack.indexOf(
    `
    at`,
    pos,
  );
  if (stackStart === -1) {
    stack = `[${stack}]`;
  } else if (ctx.colors) {
    let newStack = stack.slice(0, stackStart);
    const lines = stack.slice(stackStart + 1).split(`
`);
    for (const line of lines) {
      let nodeModule;
      newStack += `
`;
      let pos2 = 0;
      while ((nodeModule = nodeModulesRegExp.exec(line))) {
        newStack += line.slice(pos2, nodeModule.index + 14);
        newStack += ctx.stylize(nodeModule[1], "module");
        pos2 = nodeModule.index + nodeModule[0].length;
      }
      newStack += pos2 === 0 ? line : line.slice(pos2);
    }
    stack = newStack;
  }
  if (ctx.indentationLvl !== 0) {
    const indentation = " ".repeat(ctx.indentationLvl);
    stack = stack.replace(
      /\n/g,
      `
${indentation}`,
    );
  }
  return stack;
}
let hexSlice;
function formatArrayBuffer(ctx, value) {
  let buffer;
  try {
    buffer = new Uint8Array(value);
  } catch {
    return [ctx.stylize("(detached)", "special")];
  }
  let str = hexSlice(buffer, 0, Math.min(ctx.maxArrayLength, buffer.length))
    .replace(/(.{2})/g, "$1 ")
    .trim();
  const remaining = buffer.length - ctx.maxArrayLength;
  if (remaining > 0) {
    str += ` ... ${remaining} more byte${remaining > 1 ? "s" : ""}`;
  }
  return [`${ctx.stylize("[Uint8Contents]", "special")}: <${str}>`];
}
function formatNumber(fn, value) {
  return fn(Object.is(value, -0) ? "-0" : `${value}`, "number");
}
function formatPromise(ctx, value, recurseTimes) {
  let output;
  const { 0: state, 1: result } = value;
  if (state === kPending) {
    output = [ctx.stylize("<pending>", "special")];
  } else {
    ctx.indentationLvl += 2;
    const str = formatValue(ctx, result, recurseTimes);
    ctx.indentationLvl -= 2;
    output = [
      state === kRejected
        ? `${ctx.stylize("<rejected>", "special")} ${str}`
        : str,
    ];
  }
  return output;
}
function formatWeakCollection(ctx) {
  return [ctx.stylize("<items unknown>", "special")];
}
function formatWeakSet(ctx, value, recurseTimes) {
  const entries = value;
  return formatSetIterInner(ctx, recurseTimes, entries, kWeak);
}
function formatWeakMap(ctx, value, recurseTimes) {
  const entries = value;
  return formatMapIterInner(ctx, recurseTimes, entries, kWeak);
}
function formatProperty(
  ctx,
  value,
  recurseTimes,
  key,
  type,
  desc,
  original = value,
) {
  let name, str;
  let extra = " ";
  desc = desc ||
    Object.getOwnPropertyDescriptor(value, key) || {
      value: value[key],
      enumerable: true,
    };
  if (desc.value !== undefined) {
    const diff = ctx.compact !== true || type !== kObjectType ? 2 : 3;
    ctx.indentationLvl += diff;
    str = formatValue(ctx, desc.value, recurseTimes);
    if (diff === 3 && ctx.breakLength < getStringWidth(str, ctx.colors)) {
      extra = `
${" ".repeat(ctx.indentationLvl)}`;
    }
    ctx.indentationLvl -= diff;
  } else if (desc.get !== undefined) {
    const label = desc.set === undefined ? "Getter" : "Getter/Setter";
    const s = ctx.stylize;
    const sp = "special";
    if (
      ctx.getters &&
      (ctx.getters === true ||
        (ctx.getters === "get" && desc.set === undefined) ||
        (ctx.getters === "set" && desc.set !== undefined))
    ) {
      try {
        const tmp = desc.get.call(original);
        ctx.indentationLvl += 2;
        if (tmp === null) {
          str = `${s(`[${label}:`, sp)} ${s("null", "null")}${s("]", sp)}`;
        } else if (typeof tmp === "object") {
          str = `${s(`[${label}]`, sp)} ${formatValue(ctx, tmp, recurseTimes)}`;
        } else {
          const primitive = formatPrimitive(s, tmp, ctx);
          str = `${s(`[${label}:`, sp)} ${primitive}${s("]", sp)}`;
        }
        ctx.indentationLvl -= 2;
      } catch (error_) {
        const message = `<Inspection threw (${error_.message})>`;
        str = `${s(`[${label}:`, sp)} ${message}${s("]", sp)}`;
      }
    } else {
      str = ctx.stylize(`[${label}]`, sp);
    }
  } else if (desc.set === undefined) {
    str = ctx.stylize("undefined", "undefined");
  } else {
    str = ctx.stylize("[Setter]", "special");
  }
  if (type === kArrayType) {
    return str;
  }
  if (typeof key === "symbol") {
    const tmp = key.toString().replace(strEscapeSequencesReplacer, escapeFn);
    name = `[${ctx.stylize(tmp, "symbol")}]`;
  } else if (key === "__proto__") {
    name = "['__proto__']";
  } else if (desc.enumerable === false) {
    const tmp = key.replace(strEscapeSequencesReplacer, escapeFn);
    name = `[${tmp}]`;
  } else if (keyStrRegExp.test(key)) {
    name = ctx.stylize(key, "name");
  } else {
    name = ctx.stylize(strEscape(key), "string");
  }
  return `${name}:${extra}${str}`;
}
function handleMaxCallStackSize(
  _ctx,
  _err,
  _constructorName,
  _indentationLvl,
) {}
const colorRegExp = /\u001B\[\d\d?m/g;
function removeColors(str) {
  return str.replace(colorRegExp, "");
}
function isBelowBreakLength(ctx, output, start, base) {
  let totalLength = output.length + start;
  if (totalLength + output.length > ctx.breakLength) {
    return false;
  }
  for (const element_ of output) {
    if (ctx.colors) {
      totalLength += removeColors(element_).length;
    } else {
      totalLength += element_.length;
    }
    if (totalLength > ctx.breakLength) {
      return false;
    }
  }
  return (
    base === "" ||
    !base.includes(`
`)
  );
}
function formatBigInt(fn, value) {
  return fn(`${value}n`, "bigint");
}
function formatNamespaceObject(keys, ctx, value, recurseTimes) {
  const output = Array.from({length: keys.length});
  for (const [i, key] of keys.entries()) {
    try {
      output[i] = formatProperty(
        ctx,
        value,
        recurseTimes,
        key,
        kObjectType,
      );
    } catch {
      const tmp = { [key]: "" };
      output[i] = formatProperty(ctx, tmp, recurseTimes, key, kObjectType);
      const pos = output[i].lastIndexOf(" ");
      output[i] =
        output[i].slice(0, pos + 1) + ctx.stylize("<uninitialized>", "special");
    }
  }
  keys.length = 0;
  return output;
}
function formatSpecialArray(ctx, value, recurseTimes, maxLength, output, i) {
  const keys = Object.keys(value);
  let index = i;
  for (; i < keys.length && output.length < maxLength; i++) {
    const key = keys[i];
    const tmp = +key;
    if (tmp > 2 ** 32 - 2) {
      break;
    }
    if (`${index}` !== key) {
      if (!numberRegExp.test(key)) {
        break;
      }
      const emptyItems = tmp - index;
      const ending = emptyItems > 1 ? "s" : "";
      const message = `<${emptyItems} empty item${ending}>`;
      output.push(ctx.stylize(message, "undefined"));
      index = tmp;
      if (output.length === maxLength) {
        break;
      }
    }
    output.push(formatProperty(ctx, value, recurseTimes, key, kArrayType));
    index++;
  }
  const remaining = value.length - index;
  if (output.length !== maxLength) {
    if (remaining > 0) {
      const ending = remaining > 1 ? "s" : "";
      const message = `<${remaining} empty item${ending}>`;
      output.push(ctx.stylize(message, "undefined"));
    }
  } else if (remaining > 0) {
    output.push(`... ${remaining} more item${remaining > 1 ? "s" : ""}`);
  }
  return output;
}
function getBoxedBase(value, ctx, keys, constructor, tag) {
  let type;
  if (isNumberObject2(value)) {
    type = "Number";
  } else if (isStringObject2(value)) {
    type = "String";
    keys.splice(0, value.length);
  } else if (isBooleanObject2(value)) {
    type = "Boolean";
  } else if (isBigIntObject2(value)) {
    type = "BigInt";
  } else {
    type = "Symbol";
  }
  let base = `[${type}`;
  if (type !== constructor) {
    if (constructor === null) {
      base += " (null prototype)";
    } else {
      base += ` (${constructor})`;
    }
  }
  base += `: ${formatPrimitive(stylizeNoColor, value.valueOf(), ctx)}]`;
  if (tag !== "" && tag !== constructor) {
    base += ` [${tag}]`;
  }
  if (keys.length > 0 || ctx.stylize === stylizeNoColor) {
    return base;
  }
  return ctx.stylize(base, type.toLowerCase());
}
function getClassBase(value, constructor, tag) {
  const hasName = value.hasOwnProperty("name");
  const name = (hasName && value.name) || "(anonymous)";
  let base = `class ${name}`;
  if (constructor !== "Function" && constructor !== null) {
    base += ` [${constructor}]`;
  }
  if (tag !== "" && constructor !== tag) {
    base += ` [${tag}]`;
  }
  if (constructor === null) {
    base += " extends [null prototype]";
  } else {
    const superName = Object.getPrototypeOf(value).name;
    if (superName) {
      base += ` extends ${superName}`;
    }
  }
  return `[${base}]`;
}
function reduceToSingleString(
  ctx,
  output,
  base,
  braces,
  extrasType,
  recurseTimes,
  value,
) {
  if (ctx.compact !== true) {
    if (typeof ctx.compact === "number" && ctx.compact >= 1) {
      const entries = output.length;
      if (extrasType === kArrayExtrasType && entries > 6) {
        output = groupArrayElements(ctx, output, value);
      }
      if (
        ctx.currentDepth - recurseTimes < ctx.compact &&
        entries === output.length
      ) {
        const start =
          output.length +
          ctx.indentationLvl +
          braces[0].length +
          base.length +
          10;
        if (isBelowBreakLength(ctx, output, start, base)) {
          return (
            `${base ? `${base} ` : ""}${braces[0]} ${join(output, ", ")}` +
            ` ${braces[1]}`
          );
        }
      }
    }
    const indentation2 = `
${" ".repeat(ctx.indentationLvl)}`;
    return (
      `${base ? `${base} ` : ""}${braces[0]}${indentation2}  ` +
      `${join(output, `,${indentation2}  `)}${indentation2}${braces[1]}`
    );
  }
  if (isBelowBreakLength(ctx, output, 0, base)) {
    return (
      `${braces[0]}${base ? ` ${base}` : ""} ${join(output, ", ")} ` + braces[1]
    );
  }
  const indentation = " ".repeat(ctx.indentationLvl);
  const ln =
    base === "" && braces[0].length === 1
      ? " "
      : `${base ? ` ${base}` : ""}
${indentation}  `;
  return `${braces[0]}${ln}${join(
    output,
    `,
${indentation}  `,
  )} ${braces[1]}`;
}
function join(output, separator) {
  let str = "";
  if (output.length > 0) {
    const lastIndex = output.length - 1;
    for (let i = 0; i < lastIndex; i++) {
      str += output[i];
      str += separator;
    }
    str += output[lastIndex];
  }
  return str;
}
function groupArrayElements(ctx, output, value) {
  let totalLength = 0;
  let maxLength = 0;
  let i = 0;
  let outputLength = output.length;
  if (ctx.maxArrayLength < output.length) {
    outputLength--;
  }
  const separatorSpace = 2;
  const dataLen = new Array(outputLength);
  for (; i < outputLength; i++) {
    const len = getStringWidth(output[i], ctx.colors);
    dataLen[i] = len;
    totalLength += len + separatorSpace;
    if (maxLength < len) {
      maxLength = len;
    }
  }
  const actualMax = maxLength + separatorSpace;
  if (
    actualMax * 3 + ctx.indentationLvl < ctx.breakLength &&
    (totalLength / actualMax > 5 || maxLength <= 6)
  ) {
    const approxCharHeights = 2.5;
    const averageBias = Math.sqrt(actualMax - totalLength / output.length);
    const biasedMax = Math.max(actualMax - 3 - averageBias, 1);
    const columns = Math.min(
      Math.round(
        Math.sqrt(approxCharHeights * biasedMax * outputLength) / biasedMax,
      ),
      Math.floor((ctx.breakLength - ctx.indentationLvl) / actualMax),
      ctx.compact * 4,
      15,
    );
    if (columns <= 1) {
      return output;
    }
    const tmp = [];
    const maxLineLength = [];
    for (let i2 = 0; i2 < columns; i2++) {
      let lineMaxLength = 0;
      for (let j = i2; j < output.length; j += columns) {
        if (dataLen[j] > lineMaxLength) {
          lineMaxLength = dataLen[j];
        }
      }
      lineMaxLength += separatorSpace;
      maxLineLength[i2] = lineMaxLength;
    }
    let order = String.prototype.padStart;
    if (value !== undefined) {
      for (let i2 = 0; i2 < output.length; i2++) {
        if (typeof value[i2] !== "number" && typeof value[i2] !== "bigint") {
          order = String.prototype.padEnd;
          break;
        }
      }
    }
    for (let i2 = 0; i2 < outputLength; i2 += columns) {
      const max = Math.min(i2 + columns, outputLength);
      let str = "";
      let j = i2;
      for (; j < max - 1; j++) {
        const padding = maxLineLength[j - i2] + output[j].length - dataLen[j];
        str += `${output[j]}, `.padStart(padding, " ");
      }
      if (order === String.prototype.padStart) {
        const padding =
          maxLineLength[j - i2] +
          output[j].length -
          dataLen[j] -
          separatorSpace;
        str += output[j].padStart(padding, " ");
      } else {
        str += output[j];
      }
      Array.prototype.push.call(tmp, str);
    }
    if (ctx.maxArrayLength < output.length) {
      Array.prototype.push.call(tmp, output[outputLength]);
    }
    output = tmp;
  }
  return output;
}
function formatMapIterInner(ctx, recurseTimes, entries, state) {
  const maxArrayLength = Math.max(ctx.maxArrayLength, 0);
  const len = entries.length / 2;
  const remaining = len - maxArrayLength;
  const maxLength = Math.min(maxArrayLength, len);
  let output = new Array(maxLength);
  let i = 0;
  ctx.indentationLvl += 2;
  if (state === kWeak) {
    for (; i < maxLength; i++) {
      const pos = i * 2;
      output[i] =
        `${formatValue(ctx, entries[pos], recurseTimes)} => ${formatValue(ctx, entries[pos + 1], recurseTimes)}`;
    }
    if (!ctx.sorted) {
      output = output.sort();
    }
  } else {
    for (; i < maxLength; i++) {
      const pos = i * 2;
      const res = [
        formatValue(ctx, entries[pos], recurseTimes),
        formatValue(ctx, entries[pos + 1], recurseTimes),
      ];
      output[i] = reduceToSingleString(
        ctx,
        res,
        "",
        ["[", "]"],
        kArrayExtrasType,
        recurseTimes,
      );
    }
  }
  ctx.indentationLvl -= 2;
  if (remaining > 0) {
    output.push(`... ${remaining} more item${remaining > 1 ? "s" : ""}`);
  }
  return output;
}
function formatSetIterInner(ctx, recurseTimes, entries, state) {
  const maxArrayLength = Math.max(ctx.maxArrayLength, 0);
  const maxLength = Math.min(maxArrayLength, entries.length);
  const output = new Array(maxLength);
  ctx.indentationLvl += 2;
  for (let i = 0; i < maxLength; i++) {
    output[i] = formatValue(ctx, entries[i], recurseTimes);
  }
  ctx.indentationLvl -= 2;
  if (state === kWeak && !ctx.sorted) {
    output.sort();
  }
  const remaining = entries.length - maxLength;
  if (remaining > 0) {
    Array.prototype.push.call(
      output,
      `... ${remaining} more item${remaining > 1 ? "s" : ""}`,
    );
  }
  return output;
}
const ansiPattern =
  String.raw`[\u001B\u009B][[\]()#;?]*` +
  String.raw`(?:(?:(?:(?:;[-a-zA-Z\d\/#&.:=?%@~_]+)*` +
  String.raw`|[a-zA-Z\d]+(?:;[-a-zA-Z\d\/#&.:=?%@~_]*)*)?\u0007)` +
  String.raw`|(?:(?:\d{1,4}(?:;\d{0,4})*)?[\dA-PR-TZcf-ntqry=><~]))`;
const ansi = new RegExp(ansiPattern, "g");
function getStringWidth(str, removeControlChars = true) {
  let width = 0;
  if (removeControlChars) {
    str = stripVTControlCharacters(str);
  }
  str = str.normalize("NFC");
  for (const char of str[Symbol.iterator]()) {
    const code = char.codePointAt(0);
    if (isFullWidthCodePoint(code)) {
      width += 2;
    } else if (!isZeroWidthCodePoint(code)) {
      width++;
    }
  }
  return width;
}
var isFullWidthCodePoint = (code) => {
  return (
    code >= 4352 &&
    (code <= 4447 ||
      code === 9001 ||
      code === 9002 ||
      (code >= 11_904 && code <= 12_871 && code !== 12_351) ||
      (code >= 12_880 && code <= 19_903) ||
      (code >= 19_968 && code <= 42_182) ||
      (code >= 43_360 && code <= 43_388) ||
      (code >= 44_032 && code <= 55_203) ||
      (code >= 63_744 && code <= 64_255) ||
      (code >= 65_040 && code <= 65_049) ||
      (code >= 65_072 && code <= 65_131) ||
      (code >= 65_281 && code <= 65_376) ||
      (code >= 65_504 && code <= 65_510) ||
      (code >= 110_592 && code <= 110_593) ||
      (code >= 127_488 && code <= 127_569) ||
      (code >= 127_744 && code <= 128_591) ||
      (code >= 131_072 && code <= 262_141))
  );
};
var isZeroWidthCodePoint = (code) => {
  return (
    code <= 31 ||
    (code >= 127 && code <= 159) ||
    (code >= 768 && code <= 879) ||
    (code >= 8203 && code <= 8207) ||
    (code >= 8400 && code <= 8447) ||
    (code >= 65_024 && code <= 65_039) ||
    (code >= 65_056 && code <= 65_071) ||
    (code >= 917_760 && code <= 917_999)
  );
};
function stripVTControlCharacters(str) {
  validateString(str, "str");
  return str.replace(ansi, "");
}

// std@0.177.0/node/internal_binding/constants.ts
let os;
if ((globalThis.Deno?.build.os || globalThis.process?.platform) === "darwin") {
  os = {
    UV_UDP_REUSEADDR: 4,
    dlopen: {
      RTLD_LAZY: 1,
      RTLD_NOW: 2,
      RTLD_GLOBAL: 8,
      RTLD_LOCAL: 4,
    },
    errno: {
      E2BIG: 7,
      EACCES: 13,
      EADDRINUSE: 48,
      EADDRNOTAVAIL: 49,
      EAFNOSUPPORT: 47,
      EAGAIN: 35,
      EALREADY: 37,
      EBADF: 9,
      EBADMSG: 94,
      EBUSY: 16,
      ECANCELED: 89,
      ECHILD: 10,
      ECONNABORTED: 53,
      ECONNREFUSED: 61,
      ECONNRESET: 54,
      EDEADLK: 11,
      EDESTADDRREQ: 39,
      EDOM: 33,
      EDQUOT: 69,
      EEXIST: 17,
      EFAULT: 14,
      EFBIG: 27,
      EHOSTUNREACH: 65,
      EIDRM: 90,
      EILSEQ: 92,
      EINPROGRESS: 36,
      EINTR: 4,
      EINVAL: 22,
      EIO: 5,
      EISCONN: 56,
      EISDIR: 21,
      ELOOP: 62,
      EMFILE: 24,
      EMLINK: 31,
      EMSGSIZE: 40,
      EMULTIHOP: 95,
      ENAMETOOLONG: 63,
      ENETDOWN: 50,
      ENETRESET: 52,
      ENETUNREACH: 51,
      ENFILE: 23,
      ENOBUFS: 55,
      ENODATA: 96,
      ENODEV: 19,
      ENOENT: 2,
      ENOEXEC: 8,
      ENOLCK: 77,
      ENOLINK: 97,
      ENOMEM: 12,
      ENOMSG: 91,
      ENOPROTOOPT: 42,
      ENOSPC: 28,
      ENOSR: 98,
      ENOSTR: 99,
      ENOSYS: 78,
      ENOTCONN: 57,
      ENOTDIR: 20,
      ENOTEMPTY: 66,
      ENOTSOCK: 38,
      ENOTSUP: 45,
      ENOTTY: 25,
      ENXIO: 6,
      EOPNOTSUPP: 102,
      EOVERFLOW: 84,
      EPERM: 1,
      EPIPE: 32,
      EPROTO: 100,
      EPROTONOSUPPORT: 43,
      EPROTOTYPE: 41,
      ERANGE: 34,
      EROFS: 30,
      ESPIPE: 29,
      ESRCH: 3,
      ESTALE: 70,
      ETIME: 101,
      ETIMEDOUT: 60,
      ETXTBSY: 26,
      EWOULDBLOCK: 35,
      EXDEV: 18,
    },
    signals: {
      SIGHUP: 1,
      SIGINT: 2,
      SIGQUIT: 3,
      SIGILL: 4,
      SIGTRAP: 5,
      SIGABRT: 6,
      SIGIOT: 6,
      SIGBUS: 10,
      SIGFPE: 8,
      SIGKILL: 9,
      SIGUSR1: 30,
      SIGSEGV: 11,
      SIGUSR2: 31,
      SIGPIPE: 13,
      SIGALRM: 14,
      SIGTERM: 15,
      SIGCHLD: 20,
      SIGCONT: 19,
      SIGSTOP: 17,
      SIGTSTP: 18,
      SIGTTIN: 21,
      SIGTTOU: 22,
      SIGURG: 16,
      SIGXCPU: 24,
      SIGXFSZ: 25,
      SIGVTALRM: 26,
      SIGPROF: 27,
      SIGWINCH: 28,
      SIGIO: 23,
      SIGINFO: 29,
      SIGSYS: 12,
    },
    priority: {
      PRIORITY_LOW: 19,
      PRIORITY_BELOW_NORMAL: 10,
      PRIORITY_NORMAL: 0,
      PRIORITY_ABOVE_NORMAL: -7,
      PRIORITY_HIGH: -14,
      PRIORITY_HIGHEST: -20,
    },
  };
} else if (
  (globalThis.Deno?.build.os || globalThis.process?.platform) === "linux"
) {
  os = {
    UV_UDP_REUSEADDR: 4,
    dlopen: {
      RTLD_LAZY: 1,
      RTLD_NOW: 2,
      RTLD_GLOBAL: 256,
      RTLD_LOCAL: 0,
      RTLD_DEEPBIND: 8,
    },
    errno: {
      E2BIG: 7,
      EACCES: 13,
      EADDRINUSE: 98,
      EADDRNOTAVAIL: 99,
      EAFNOSUPPORT: 97,
      EAGAIN: 11,
      EALREADY: 114,
      EBADF: 9,
      EBADMSG: 74,
      EBUSY: 16,
      ECANCELED: 125,
      ECHILD: 10,
      ECONNABORTED: 103,
      ECONNREFUSED: 111,
      ECONNRESET: 104,
      EDEADLK: 35,
      EDESTADDRREQ: 89,
      EDOM: 33,
      EDQUOT: 122,
      EEXIST: 17,
      EFAULT: 14,
      EFBIG: 27,
      EHOSTUNREACH: 113,
      EIDRM: 43,
      EILSEQ: 84,
      EINPROGRESS: 115,
      EINTR: 4,
      EINVAL: 22,
      EIO: 5,
      EISCONN: 106,
      EISDIR: 21,
      ELOOP: 40,
      EMFILE: 24,
      EMLINK: 31,
      EMSGSIZE: 90,
      EMULTIHOP: 72,
      ENAMETOOLONG: 36,
      ENETDOWN: 100,
      ENETRESET: 102,
      ENETUNREACH: 101,
      ENFILE: 23,
      ENOBUFS: 105,
      ENODATA: 61,
      ENODEV: 19,
      ENOENT: 2,
      ENOEXEC: 8,
      ENOLCK: 37,
      ENOLINK: 67,
      ENOMEM: 12,
      ENOMSG: 42,
      ENOPROTOOPT: 92,
      ENOSPC: 28,
      ENOSR: 63,
      ENOSTR: 60,
      ENOSYS: 38,
      ENOTCONN: 107,
      ENOTDIR: 20,
      ENOTEMPTY: 39,
      ENOTSOCK: 88,
      ENOTSUP: 95,
      ENOTTY: 25,
      ENXIO: 6,
      EOPNOTSUPP: 95,
      EOVERFLOW: 75,
      EPERM: 1,
      EPIPE: 32,
      EPROTO: 71,
      EPROTONOSUPPORT: 93,
      EPROTOTYPE: 91,
      ERANGE: 34,
      EROFS: 30,
      ESPIPE: 29,
      ESRCH: 3,
      ESTALE: 116,
      ETIME: 62,
      ETIMEDOUT: 110,
      ETXTBSY: 26,
      EWOULDBLOCK: 11,
      EXDEV: 18,
    },
    signals: {
      SIGHUP: 1,
      SIGINT: 2,
      SIGQUIT: 3,
      SIGILL: 4,
      SIGTRAP: 5,
      SIGABRT: 6,
      SIGIOT: 6,
      SIGBUS: 7,
      SIGFPE: 8,
      SIGKILL: 9,
      SIGUSR1: 10,
      SIGSEGV: 11,
      SIGUSR2: 12,
      SIGPIPE: 13,
      SIGALRM: 14,
      SIGTERM: 15,
      SIGCHLD: 17,
      SIGSTKFLT: 16,
      SIGCONT: 18,
      SIGSTOP: 19,
      SIGTSTP: 20,
      SIGTTIN: 21,
      SIGTTOU: 22,
      SIGURG: 23,
      SIGXCPU: 24,
      SIGXFSZ: 25,
      SIGVTALRM: 26,
      SIGPROF: 27,
      SIGWINCH: 28,
      SIGIO: 29,
      SIGPOLL: 29,
      SIGPWR: 30,
      SIGSYS: 31,
      SIGUNUSED: 31,
    },
    priority: {
      PRIORITY_LOW: 19,
      PRIORITY_BELOW_NORMAL: 10,
      PRIORITY_NORMAL: 0,
      PRIORITY_ABOVE_NORMAL: -7,
      PRIORITY_HIGH: -14,
      PRIORITY_HIGHEST: -20,
    },
  };
} else {
  os = {
    UV_UDP_REUSEADDR: 4,
    dlopen: {},
    errno: {
      E2BIG: 7,
      EACCES: 13,
      EADDRINUSE: 100,
      EADDRNOTAVAIL: 101,
      EAFNOSUPPORT: 102,
      EAGAIN: 11,
      EALREADY: 103,
      EBADF: 9,
      EBADMSG: 104,
      EBUSY: 16,
      ECANCELED: 105,
      ECHILD: 10,
      ECONNABORTED: 106,
      ECONNREFUSED: 107,
      ECONNRESET: 108,
      EDEADLK: 36,
      EDESTADDRREQ: 109,
      EDOM: 33,
      EEXIST: 17,
      EFAULT: 14,
      EFBIG: 27,
      EHOSTUNREACH: 110,
      EIDRM: 111,
      EILSEQ: 42,
      EINPROGRESS: 112,
      EINTR: 4,
      EINVAL: 22,
      EIO: 5,
      EISCONN: 113,
      EISDIR: 21,
      ELOOP: 114,
      EMFILE: 24,
      EMLINK: 31,
      EMSGSIZE: 115,
      ENAMETOOLONG: 38,
      ENETDOWN: 116,
      ENETRESET: 117,
      ENETUNREACH: 118,
      ENFILE: 23,
      ENOBUFS: 119,
      ENODATA: 120,
      ENODEV: 19,
      ENOENT: 2,
      ENOEXEC: 8,
      ENOLCK: 39,
      ENOLINK: 121,
      ENOMEM: 12,
      ENOMSG: 122,
      ENOPROTOOPT: 123,
      ENOSPC: 28,
      ENOSR: 124,
      ENOSTR: 125,
      ENOSYS: 40,
      ENOTCONN: 126,
      ENOTDIR: 20,
      ENOTEMPTY: 41,
      ENOTSOCK: 128,
      ENOTSUP: 129,
      ENOTTY: 25,
      ENXIO: 6,
      EOPNOTSUPP: 130,
      EOVERFLOW: 132,
      EPERM: 1,
      EPIPE: 32,
      EPROTO: 134,
      EPROTONOSUPPORT: 135,
      EPROTOTYPE: 136,
      ERANGE: 34,
      EROFS: 30,
      ESPIPE: 29,
      ESRCH: 3,
      ETIME: 137,
      ETIMEDOUT: 138,
      ETXTBSY: 139,
      EWOULDBLOCK: 140,
      EXDEV: 18,
      WSAEINTR: 10_004,
      WSAEBADF: 10_009,
      WSAEACCES: 10_013,
      WSAEFAULT: 10_014,
      WSAEINVAL: 10_022,
      WSAEMFILE: 10_024,
      WSAEWOULDBLOCK: 10_035,
      WSAEINPROGRESS: 10_036,
      WSAEALREADY: 10_037,
      WSAENOTSOCK: 10_038,
      WSAEDESTADDRREQ: 10_039,
      WSAEMSGSIZE: 10_040,
      WSAEPROTOTYPE: 10_041,
      WSAENOPROTOOPT: 10_042,
      WSAEPROTONOSUPPORT: 10_043,
      WSAESOCKTNOSUPPORT: 10_044,
      WSAEOPNOTSUPP: 10_045,
      WSAEPFNOSUPPORT: 10_046,
      WSAEAFNOSUPPORT: 10_047,
      WSAEADDRINUSE: 10_048,
      WSAEADDRNOTAVAIL: 10_049,
      WSAENETDOWN: 10_050,
      WSAENETUNREACH: 10_051,
      WSAENETRESET: 10_052,
      WSAECONNABORTED: 10_053,
      WSAECONNRESET: 10_054,
      WSAENOBUFS: 10_055,
      WSAEISCONN: 10_056,
      WSAENOTCONN: 10_057,
      WSAESHUTDOWN: 10_058,
      WSAETOOMANYREFS: 10_059,
      WSAETIMEDOUT: 10_060,
      WSAECONNREFUSED: 10_061,
      WSAELOOP: 10_062,
      WSAENAMETOOLONG: 10_063,
      WSAEHOSTDOWN: 10_064,
      WSAEHOSTUNREACH: 10_065,
      WSAENOTEMPTY: 10_066,
      WSAEPROCLIM: 10_067,
      WSAEUSERS: 10_068,
      WSAEDQUOT: 10_069,
      WSAESTALE: 10_070,
      WSAEREMOTE: 10_071,
      WSASYSNOTREADY: 10_091,
      WSAVERNOTSUPPORTED: 10_092,
      WSANOTINITIALISED: 10_093,
      WSAEDISCON: 10_101,
      WSAENOMORE: 10_102,
      WSAECANCELLED: 10_103,
      WSAEINVALIDPROCTABLE: 10_104,
      WSAEINVALIDPROVIDER: 10_105,
      WSAEPROVIDERFAILEDINIT: 10_106,
      WSASYSCALLFAILURE: 10_107,
      WSASERVICE_NOT_FOUND: 10_108,
      WSATYPE_NOT_FOUND: 10_109,
      WSA_E_NO_MORE: 10_110,
      WSA_E_CANCELLED: 10_111,
      WSAEREFUSED: 10_112,
    },
    signals: {
      SIGHUP: 1,
      SIGINT: 2,
      SIGILL: 4,
      SIGABRT: 22,
      SIGFPE: 8,
      SIGKILL: 9,
      SIGSEGV: 11,
      SIGTERM: 15,
      SIGBREAK: 21,
      SIGWINCH: 28,
    },
    priority: {
      PRIORITY_LOW: 19,
      PRIORITY_BELOW_NORMAL: 10,
      PRIORITY_NORMAL: 0,
      PRIORITY_ABOVE_NORMAL: -7,
      PRIORITY_HIGH: -14,
      PRIORITY_HIGHEST: -20,
    },
  };
}

// std@0.177.0/node/internal/errors.ts
const kIsNodeError = Symbol("kIsNodeError");
const classRegExp2 = /^([A-Z][a-z0-9]*)+$/;
const kTypes = new Set([
  "string",
  "function",
  "number",
  "object",
  "Function",
  "Object",
  "boolean",
  "bigint",
  "symbol",
]);
function addNumericalSeparator(val) {
  let res = "";
  let i = val.length;
  const start = val[0] === "-" ? 1 : 0;
  for (; i >= start + 4; i -= 3) {
    res = `_${val.slice(i - 3, i)}${res}`;
  }
  return `${val.slice(0, i)}${res}`;
}
const captureLargerStackTrace = hideStackFrames(
  function captureLargerStackTrace2(err) {
    Error.captureStackTrace(err);
    return err;
  },
);
const uvExceptionWithHostPort = hideStackFrames(
  function uvExceptionWithHostPort2(err, syscall, address, port) {
    const { 0: code, 1: uvmsg } = uvErrmapGet(err) || uvUnmappedError;
    const message = `${syscall} ${code}: ${uvmsg}`;
    let details = "";
    if (port && port > 0) {
      details = ` ${address}:${port}`;
    } else if (address) {
      details = ` ${address}`;
    }
    const ex = new Error(`${message}${details}`);
    ex.code = code;
    ex.errno = err;
    ex.syscall = syscall;
    ex.address = address;
    if (port) {
      ex.port = port;
    }
    return captureLargerStackTrace(ex);
  },
);
const errnoException = hideStackFrames(
  function errnoException2(err, syscall, original) {
    const code = getSystemErrorName(err);
    const message = original
      ? `${syscall} ${code} ${original}`
      : `${syscall} ${code}`;
    const ex = new Error(message);
    ex.errno = err;
    ex.code = code;
    ex.syscall = syscall;
    return captureLargerStackTrace(ex);
  },
);
function uvErrmapGet(name) {
  return errorMap.get(name);
}
var uvUnmappedError = ["UNKNOWN", "unknown error"];
const uvException = hideStackFrames(function uvException2(ctx) {
  const { 0: code, 1: uvmsg } = uvErrmapGet(ctx.errno) || uvUnmappedError;
  let message = `${code}: ${ctx.message || uvmsg}, ${ctx.syscall}`;
  let path;
  let dest;
  if (ctx.path) {
    path = ctx.path.toString();
    message += ` '${path}'`;
  }
  if (ctx.dest) {
    dest = ctx.dest.toString();
    message += ` -> '${dest}'`;
  }
  const err = new Error(message);
  for (const prop of Object.keys(ctx)) {
    if (prop === "message" || prop === "path" || prop === "dest") {
      continue;
    }
    err[prop] = ctx[prop];
  }
  err.code = code;
  if (path) {
    err.path = path;
  }
  if (dest) {
    err.dest = dest;
  }
  return captureLargerStackTrace(err);
});
const exceptionWithHostPort = hideStackFrames(
  function exceptionWithHostPort2(err, syscall, address, port, additional) {
    const code = getSystemErrorName(err);
    let details = "";
    if (port && port > 0) {
      details = ` ${address}:${port}`;
    } else if (address) {
      details = ` ${address}`;
    }
    if (additional) {
      details += ` - Local (${additional})`;
    }
    const ex = new Error(`${syscall} ${code}${details}`);
    ex.errno = err;
    ex.code = code;
    ex.syscall = syscall;
    ex.address = address;
    if (port) {
      ex.port = port;
    }
    return captureLargerStackTrace(ex);
  },
);
const dnsException = hideStackFrames(function (code, syscall, hostname) {
  let errno;
  if (typeof code === "number") {
    errno = code;
    if (
      code === codeMap.get("EAI_NODATA") ||
      code === codeMap.get("EAI_NONAME")
    ) {
      code = "ENOTFOUND";
    } else {
      code = getSystemErrorName(code);
    }
  }
  const message = `${syscall} ${code}${hostname ? ` ${hostname}` : ""}`;
  const ex = new Error(message);
  ex.errno = errno;
  ex.code = code;
  ex.syscall = syscall;
  if (hostname) {
    ex.hostname = hostname;
  }
  return captureLargerStackTrace(ex);
});

class NodeErrorAbstraction extends Error {
  code;
  constructor(name, code, message) {
    super(message);
    this.code = code;
    this.name = name;
    this.stack = this.stack && `${name} [${this.code}]${this.stack.slice(20)}`;
  }
  toString() {
    return `${this.name} [${this.code}]: ${this.message}`;
  }
}

class NodeError extends NodeErrorAbstraction {
  constructor(code, message) {
    super(Error.prototype.name, code, message);
  }
}
class NodeRangeError extends NodeErrorAbstraction {
  constructor(code, message) {
    super(RangeError.prototype.name, code, message);
    Object.setPrototypeOf(this, RangeError.prototype);
    this.toString = function () {
      return `${this.name} [${this.code}]: ${this.message}`;
    };
  }
}

class NodeTypeError extends NodeErrorAbstraction {
  constructor(code, message) {
    super(TypeError.prototype.name, code, message);
    Object.setPrototypeOf(this, TypeError.prototype);
    this.toString = function () {
      return `${this.name} [${this.code}]: ${this.message}`;
    };
  }
}
class NodeSystemError extends NodeErrorAbstraction {
  constructor(key, context, msgPrefix) {
    let message =
      `${msgPrefix}: ${context.syscall} returned ` +
      `${context.code} (${context.message})`;
    if (context.path !== undefined) {
      message += ` ${context.path}`;
    }
    if (context.dest !== undefined) {
      message += ` => ${context.dest}`;
    }
    super("SystemError", key, message);
    captureLargerStackTrace(this);
    Object.defineProperties(this, {
      [kIsNodeError]: {
        value: true,
        enumerable: false,
        writable: false,
        configurable: true,
      },
      info: {
        value: context,
        enumerable: true,
        configurable: true,
        writable: false,
      },
      errno: {
        get() {
          return context.errno;
        },
        set: (value) => {
          context.errno = value;
        },
        enumerable: true,
        configurable: true,
      },
      syscall: {
        get() {
          return context.syscall;
        },
        set: (value) => {
          context.syscall = value;
        },
        enumerable: true,
        configurable: true,
      },
    });
    if (context.path !== undefined) {
      Object.defineProperty(this, "path", {
        get() {
          return context.path;
        },
        set: (value) => {
          context.path = value;
        },
        enumerable: true,
        configurable: true,
      });
    }
    if (context.dest !== undefined) {
      Object.defineProperty(this, "dest", {
        get() {
          return context.dest;
        },
        set: (value) => {
          context.dest = value;
        },
        enumerable: true,
        configurable: true,
      });
    }
  }
  toString() {
    return `${this.name} [${this.code}]: ${this.message}`;
  }
}
function makeSystemErrorWithCode(key, msgPrfix) {
  return class NodeError2 extends NodeSystemError {
    constructor(ctx) {
      super(key, ctx, msgPrfix);
    }
  };
}
const ERR_FS_EISDIR = makeSystemErrorWithCode(
  "ERR_FS_EISDIR",
  "Path is a directory",
);
function createInvalidArgType(name, expected) {
  expected = Array.isArray(expected) ? expected : [expected];
  let msg = "The ";
  if (name.endsWith(" argument")) {
    msg += `${name} `;
  } else {
    const type = name.includes(".") ? "property" : "argument";
    msg += `"${name}" ${type} `;
  }
  msg += "must be ";
  const types = [];
  const instances = [];
  const other = [];
  for (const value of expected) {
    if (kTypes.has(value)) {
      types.push(value.toLocaleLowerCase());
    } else if (classRegExp2.test(value)) {
      instances.push(value);
    } else {
      other.push(value);
    }
  }
  if (instances.length > 0) {
    const pos = types.indexOf("object");
    if (pos !== -1) {
      types.splice(pos, 1);
      instances.push("Object");
    }
  }
  if (types.length > 0) {
    if (types.length > 2) {
      const last = types.pop();
      msg += `one of type ${types.join(", ")}, or ${last}`;
    } else if (types.length === 2) {
      msg += `one of type ${types[0]} or ${types[1]}`;
    } else {
      msg += `of type ${types[0]}`;
    }
    if (instances.length > 0 || other.length > 0) {
      msg += " or ";
    }
  }
  if (instances.length > 0) {
    if (instances.length > 2) {
      const last = instances.pop();
      msg += `an instance of ${instances.join(", ")}, or ${last}`;
    } else {
      msg += `an instance of ${instances[0]}`;
      if (instances.length === 2) {
        msg += ` or ${instances[1]}`;
      }
    }
    if (other.length > 0) {
      msg += " or ";
    }
  }
  if (other.length > 0) {
    if (other.length > 2) {
      const last = other.pop();
      msg += `one of ${other.join(", ")}, or ${last}`;
    } else if (other.length === 2) {
      msg += `one of ${other[0]} or ${other[1]}`;
    } else {
      if (other[0].toLowerCase() !== other[0]) {
        msg += "an ";
      }
      msg += `${other[0]}`;
    }
  }
  return msg;
}

class ERR_INVALID_ARG_TYPE_RANGE extends NodeRangeError {
  constructor(name, expected, actual) {
    const msg = createInvalidArgType(name, expected);
    super("ERR_INVALID_ARG_TYPE", `${msg}.${invalidArgTypeHelper(actual)}`);
  }
}

class ERR_INVALID_ARG_TYPE extends NodeTypeError {
  constructor(name, expected, actual) {
    const msg = createInvalidArgType(name, expected);
    super("ERR_INVALID_ARG_TYPE", `${msg}.${invalidArgTypeHelper(actual)}`);
  }
  static RangeError = ERR_INVALID_ARG_TYPE_RANGE;
}

class ERR_INVALID_ARG_VALUE_RANGE extends NodeRangeError {
  constructor(name, value, reason = "is invalid") {
    const type = name.includes(".") ? "property" : "argument";
    const inspected = inspect(value);
    super(
      "ERR_INVALID_ARG_VALUE",
      `The ${type} '${name}' ${reason}. Received ${inspected}`,
    );
  }
}

class ERR_INVALID_ARG_VALUE extends NodeTypeError {
  constructor(name, value, reason = "is invalid") {
    const type = name.includes(".") ? "property" : "argument";
    const inspected = inspect(value);
    super(
      "ERR_INVALID_ARG_VALUE",
      `The ${type} '${name}' ${reason}. Received ${inspected}`,
    );
  }
  static RangeError = ERR_INVALID_ARG_VALUE_RANGE;
}
function invalidArgTypeHelper(input) {
  if (input == null) {
    return ` Received ${input}`;
  }
  if (typeof input === "function" && input.name) {
    return ` Received function ${input.name}`;
  }
  if (typeof input === "object") {
    if (input.constructor && input.constructor.name) {
      return ` Received an instance of ${input.constructor.name}`;
    }
    return ` Received ${inspect(input, { depth: -1 })}`;
  }
  let inspected = inspect(input, { colors: false });
  if (inspected.length > 25) {
    inspected = `${inspected.slice(0, 25)}...`;
  }
  return ` Received type ${typeof input} (${inspected})`;
}

class ERR_OUT_OF_RANGE extends RangeError {
  code = "ERR_OUT_OF_RANGE";
  constructor(str, range, input, replaceDefaultBoolean = false) {
    assert(range, 'Missing "range" argument');
    let msg = replaceDefaultBoolean
      ? str
      : `The value of "${str}" is out of range.`;
    let received;
    if (Number.isInteger(input) && Math.abs(input) > 2 ** 32) {
      received = addNumericalSeparator(String(input));
    } else if (typeof input === "bigint") {
      received = String(input);
      if (input > 2n ** 32n || input < -(2n ** 32n)) {
        received = addNumericalSeparator(received);
      }
      received += "n";
    } else {
      received = inspect(input);
    }
    msg += ` It must be ${range}. Received ${received}`;
    super(msg);
    const { name } = this;
    this.name = `${name} [${this.code}]`;
    this.stack;
    this.name = name;
  }
}
class ERR_BUFFER_OUT_OF_BOUNDS extends NodeRangeError {
  constructor(name) {
    super(
      "ERR_BUFFER_OUT_OF_BOUNDS",
      name
        ? `"${name}" is outside of buffer bounds`
        : "Attempt to access memory outside buffer bounds",
    );
  }
}
class ERR_IPC_CHANNEL_CLOSED extends NodeError {
  constructor() {
    super("ERR_IPC_CHANNEL_CLOSED", `Channel closed`);
  }
}
class ERR_SOCKET_BAD_PORT extends NodeRangeError {
  constructor(name, port, allowZero = true) {
    assert(
      typeof allowZero === "boolean",
      "The 'allowZero' argument must be of type boolean.",
    );
    const operator = allowZero ? ">=" : ">";
    super(
      "ERR_SOCKET_BAD_PORT",
      `${name} should be ${operator} 0 and < 65536. Received ${port}.`,
    );
  }
}
class ERR_UNKNOWN_ENCODING extends NodeTypeError {
  constructor(x) {
    super("ERR_UNKNOWN_ENCODING", `Unknown encoding: ${x}`);
  }
}
codes.ERR_IPC_CHANNEL_CLOSED = ERR_IPC_CHANNEL_CLOSED;
codes.ERR_INVALID_ARG_TYPE = ERR_INVALID_ARG_TYPE;
codes.ERR_INVALID_ARG_VALUE = ERR_INVALID_ARG_VALUE;
codes.ERR_OUT_OF_RANGE = ERR_OUT_OF_RANGE;
codes.ERR_SOCKET_BAD_PORT = ERR_SOCKET_BAD_PORT;
codes.ERR_BUFFER_OUT_OF_BOUNDS = ERR_BUFFER_OUT_OF_BOUNDS;
codes.ERR_UNKNOWN_ENCODING = ERR_UNKNOWN_ENCODING;
const genericNodeError = hideStackFrames(
  function genericNodeError2(message, errorProperties) {
    const err = new Error(message);
    Object.assign(err, errorProperties);
    return err;
  },
);

// std@0.177.0/node/internal/util.mjs
const customInspectSymbol2 = Symbol.for("nodejs.util.inspect.custom");
const kEnumerableProperty = Object.create(null);
kEnumerableProperty.enumerable = true;
const kEmptyObject = Object.freeze(Object.create(null));
const kCustomPromisifiedSymbol = Symbol.for("nodejs.util.promisify.custom");
const kCustomPromisifyArgsSymbol = Symbol.for("nodejs.util.promisify.customArgs");
function promisify(original) {
  validateFunction(original, "original");
  if (original[kCustomPromisifiedSymbol]) {
    const fn2 = original[kCustomPromisifiedSymbol];
    validateFunction(fn2, "util.promisify.custom");
    return Object.defineProperty(fn2, kCustomPromisifiedSymbol, {
      value: fn2,
      enumerable: false,
      writable: false,
      configurable: true,
    });
  }
  const argumentNames = original[kCustomPromisifyArgsSymbol];
  function fn(...args) {
    return new Promise((resolve, reject) => {
      args.push((err, ...values) => {
        if (err) {
          return reject(err);
        }
        if (argumentNames !== undefined && values.length > 1) {
          const obj = {};
          for (const [i, argumentName] of argumentNames.entries()) {
            obj[argumentName] = values[i];
          }
          resolve(obj);
        } else {
          resolve(values[0]);
        }
      });
      Reflect.apply(original, this, args);
    });
  }
  Object.setPrototypeOf(fn, Object.getPrototypeOf(original));
  Object.defineProperty(fn, kCustomPromisifiedSymbol, {
    value: fn,
    enumerable: false,
    writable: false,
    configurable: true,
  });
  return Object.defineProperties(
    fn,
    Object.getOwnPropertyDescriptors(original),
  );
}
promisify.custom = kCustomPromisifiedSymbol;

// std@0.177.0/node/internal/buffer.mjs
const utf8Encoder = new TextEncoder();
const float32Array = new Float32Array(1);
const uInt8Float32Array = new Uint8Array(float32Array.buffer);
const float64Array = new Float64Array(1);
const uInt8Float64Array = new Uint8Array(float64Array.buffer);
float32Array[0] = -1;
const bigEndian = uInt8Float32Array[3] === 0;
const kMaxLength = 2_147_483_647;
const kStringMaxLength = 536_870_888;
const MAX_UINT32 = 2 ** 32;
const customInspectSymbol3 =
  typeof Symbol === "function" && typeof Symbol["for"] === "function"
    ? Symbol["for"]("nodejs.util.inspect.custom")
    : null;
export var INSPECT_MAX_BYTES = 50;
const constants = {
  MAX_LENGTH: kMaxLength,
  MAX_STRING_LENGTH: kStringMaxLength,
};
Object.defineProperty(Buffer.prototype, "parent", {
  enumerable: true,
  get: function () {
    if (!Buffer.isBuffer(this)) {
      return;
    }
    return this.buffer;
  },
});
Object.defineProperty(Buffer.prototype, "offset", {
  enumerable: true,
  get: function () {
    if (!Buffer.isBuffer(this)) {
      return;
    }
    return this.byteOffset;
  },
});
function createBuffer(length) {
  if (length > kMaxLength) {
    throw new RangeError(
      'The value "' + length + '" is invalid for option "size"',
    );
  }
  const buf = new Uint8Array(length);
  Object.setPrototypeOf(buf, Buffer.prototype);
  return buf;
}
function Buffer(arg, encodingOrOffset, length) {
  if (typeof arg === "number") {
    if (typeof encodingOrOffset === "string") {
      throw new codes.ERR_INVALID_ARG_TYPE("string", "string", arg);
    }
    return _allocUnsafe(arg);
  }
  return _from(arg, encodingOrOffset, length);
}
Buffer.poolSize = 8192;
function _from(value, encodingOrOffset, length) {
  if (typeof value === "string") {
    return fromString(value, encodingOrOffset);
  }
  if (typeof value === "object" && value !== null) {
    if (isAnyArrayBuffer2(value)) {
      return fromArrayBuffer(value, encodingOrOffset, length);
    }
    const valueOf = value.valueOf && value.valueOf();
    if (
      valueOf != null &&
      valueOf !== value &&
      (typeof valueOf === "string" || typeof valueOf === "object")
    ) {
      return _from(valueOf, encodingOrOffset, length);
    }
    const b = fromObject(value);
    if (b) {
      return b;
    }
    if (typeof value[Symbol.toPrimitive] === "function") {
      const primitive = value[Symbol.toPrimitive]("string");
      if (typeof primitive === "string") {
        return fromString(primitive, encodingOrOffset);
      }
    }
  }
  throw new codes.ERR_INVALID_ARG_TYPE(
    "first argument",
    ["string", "Buffer", "ArrayBuffer", "Array", "Array-like Object"],
    value,
  );
}
Buffer.from = function from(value, encodingOrOffset, length) {
  return _from(value, encodingOrOffset, length);
};
Object.setPrototypeOf(Buffer.prototype, Uint8Array.prototype);
Object.setPrototypeOf(Buffer, Uint8Array);
function assertSize(size) {
  validateNumber(size, "size");
  if (!(size >= 0 && size <= kMaxLength)) {
    throw new codes.ERR_INVALID_ARG_VALUE.RangeError("size", size);
  }
}
function _alloc(size, fill, encoding) {
  assertSize(size);
  const buffer = createBuffer(size);
  if (fill !== undefined) {
    if (encoding !== undefined && typeof encoding !== "string") {
      throw new codes.ERR_INVALID_ARG_TYPE("encoding", "string", encoding);
    }
    return buffer.fill(fill, encoding);
  }
  return buffer;
}
Buffer.alloc = function alloc(size, fill, encoding) {
  return _alloc(size, fill, encoding);
};
function _allocUnsafe(size) {
  assertSize(size);
  return createBuffer(size < 0 ? 0 : checked(size) | 0);
}
Buffer.allocUnsafe = function allocUnsafe(size) {
  return _allocUnsafe(size);
};
Buffer.allocUnsafeSlow = function allocUnsafeSlow(size) {
  return _allocUnsafe(size);
};
function fromString(string, encoding) {
  if (typeof encoding !== "string" || encoding === "") {
    encoding = "utf8";
  }
  if (!Buffer.isEncoding(encoding)) {
    throw new codes.ERR_UNKNOWN_ENCODING(encoding);
  }
  const length = byteLength(string, encoding) | 0;
  let buf = createBuffer(length);
  const actual = buf.write(string, encoding);
  if (actual !== length) {
    buf = buf.slice(0, actual);
  }
  return buf;
}
function fromArrayLike(array) {
  const length = array.length < 0 ? 0 : checked(array.length) | 0;
  const buf = createBuffer(length);
  for (let i = 0; i < length; i += 1) {
    buf[i] = array[i] & 255;
  }
  return buf;
}
function fromObject(obj) {
  if (obj.length !== undefined || isAnyArrayBuffer2(obj.buffer)) {
    if (typeof obj.length !== "number") {
      return createBuffer(0);
    }
    return fromArrayLike(obj);
  }
  if (obj.type === "Buffer" && Array.isArray(obj.data)) {
    return fromArrayLike(obj.data);
  }
}
function checked(length) {
  if (length >= kMaxLength) {
    throw new RangeError(
      "Attempt to allocate Buffer larger than maximum size: 0x" +
        kMaxLength.toString(16) +
        " bytes",
    );
  }
  return length | 0;
}
function SlowBuffer(length) {
  assertSize(length);
  return Buffer.alloc(+length);
}
Object.setPrototypeOf(SlowBuffer.prototype, Uint8Array.prototype);
Object.setPrototypeOf(SlowBuffer, Uint8Array);
Buffer.isBuffer = function isBuffer(b) {
  return b != null && b._isBuffer === true && b !== Buffer.prototype;
};
Buffer.compare = function compare(a, b) {
  if (isInstance(a, Uint8Array)) {
    a = Buffer.from(a, a.offset, a.byteLength);
  }
  if (isInstance(b, Uint8Array)) {
    b = Buffer.from(b, b.offset, b.byteLength);
  }
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError(
      'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array',
    );
  }
  if (a === b) {
    return 0;
  }
  let x = a.length;
  let y = b.length;
  for (let i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i];
      y = b[i];
      break;
    }
  }
  if (x < y) {
    return -1;
  }
  if (y < x) {
    return 1;
  }
  return 0;
};
Buffer.isEncoding = function isEncoding(encoding) {
  return (
    typeof encoding === "string" &&
    encoding.length > 0 &&
    normalizeEncoding(encoding) !== undefined
  );
};
Buffer.concat = function concat(list, length) {
  if (!Array.isArray(list)) {
    throw new codes.ERR_INVALID_ARG_TYPE("list", "Array", list);
  }
  if (list.length === 0) {
    return Buffer.alloc(0);
  }
  if (length === undefined) {
    length = 0;
    for (const element_ of list) {
      if (element_.length > 0) {
        length += element_.length;
      }
    }
  } else {
    validateOffset(length, "length");
  }
  const buffer = Buffer.allocUnsafe(length);
  let pos = 0;
  for (const [i, buf] of list.entries()) {
    if (!isUint8Array(buf)) {
      throw new codes.ERR_INVALID_ARG_TYPE(
        `list[${i}]`,
        ["Buffer", "Uint8Array"],
        buf,
      );
    }
    pos += _copyActual(buf, buffer, pos, 0, buf.length);
  }
  if (pos < length) {
    buffer.fill(0, pos, length);
  }
  return buffer;
};
function byteLength(string, encoding) {
  if (typeof string !== "string") {
    if (isArrayBufferView(string) || isAnyArrayBuffer2(string)) {
      return string.byteLength;
    }
    throw new codes.ERR_INVALID_ARG_TYPE(
      "string",
      ["string", "Buffer", "ArrayBuffer"],
      string,
    );
  }
  const len = string.length;
  const mustMatch = arguments.length > 2 && arguments[2] === true;
  if (!mustMatch && len === 0) {
    return 0;
  }
  if (!encoding) {
    return mustMatch ? -1 : byteLengthUtf8(string);
  }
  const ops = getEncodingOps(encoding);
  if (ops === undefined) {
    return mustMatch ? -1 : byteLengthUtf8(string);
  }
  return ops.byteLength(string);
}
Buffer.byteLength = byteLength;
Buffer.prototype._isBuffer = true;
function swap(b, n, m) {
  const i = b[n];
  b[n] = b[m];
  b[m] = i;
}
Buffer.prototype.swap16 = function swap16() {
  const len = this.length;
  if (len % 2 !== 0) {
    throw new RangeError("Buffer size must be a multiple of 16-bits");
  }
  for (let i = 0; i < len; i += 2) {
    swap(this, i, i + 1);
  }
  return this;
};
Buffer.prototype.swap32 = function swap32() {
  const len = this.length;
  if (len % 4 !== 0) {
    throw new RangeError("Buffer size must be a multiple of 32-bits");
  }
  for (let i = 0; i < len; i += 4) {
    swap(this, i, i + 3);
    swap(this, i + 1, i + 2);
  }
  return this;
};
Buffer.prototype.swap64 = function swap64() {
  const len = this.length;
  if (len % 8 !== 0) {
    throw new RangeError("Buffer size must be a multiple of 64-bits");
  }
  for (let i = 0; i < len; i += 8) {
    swap(this, i, i + 7);
    swap(this, i + 1, i + 6);
    swap(this, i + 2, i + 5);
    swap(this, i + 3, i + 4);
  }
  return this;
};
Buffer.prototype.toString = function toString(encoding, start, end) {
  if (arguments.length === 0) {
    return this.utf8Slice(0, this.length);
  }
  const len = this.length;
  if (start <= 0) {
    start = 0;
  } else if (start >= len) {
    return "";
  } else {
    start |= 0;
  }
  if (end === undefined || end > len) {
    end = len;
  } else {
    end |= 0;
  }
  if (end <= start) {
    return "";
  }
  if (encoding === undefined) {
    return this.utf8Slice(start, end);
  }
  const ops = getEncodingOps(encoding);
  if (ops === undefined) {
    throw new codes.ERR_UNKNOWN_ENCODING(encoding);
  }
  return ops.slice(this, start, end);
};
Buffer.prototype.toLocaleString = Buffer.prototype.toString;
Buffer.prototype.equals = function equals(b) {
  if (!isUint8Array(b)) {
    throw new codes.ERR_INVALID_ARG_TYPE(
      "otherBuffer",
      ["Buffer", "Uint8Array"],
      b,
    );
  }
  if (this === b) {
    return true;
  }
  return Buffer.compare(this, b) === 0;
};
Buffer.prototype.inspect = function inspect2() {
  let str = "";
  const max = INSPECT_MAX_BYTES;
  str = this.toString("hex", 0, max)
    .replace(/(.{2})/g, "$1 ")
    .trim();
  if (this.length > max) {
    str += " ... ";
  }
  return "<Buffer " + str + ">";
};
if (customInspectSymbol3) {
  Buffer.prototype[customInspectSymbol3] = Buffer.prototype.inspect;
}
Buffer.prototype.compare = function compare2(
  target,
  start,
  end,
  thisStart,
  thisEnd,
) {
  if (isInstance(target, Uint8Array)) {
    target = Buffer.from(target, target.offset, target.byteLength);
  }
  if (!Buffer.isBuffer(target)) {
    throw new codes.ERR_INVALID_ARG_TYPE(
      "target",
      ["Buffer", "Uint8Array"],
      target,
    );
  }
  if (start === undefined) {
    start = 0;
  } else {
    validateOffset(start, "targetStart", 0, kMaxLength);
  }
  if (end === undefined) {
    end = target.length;
  } else {
    validateOffset(end, "targetEnd", 0, target.length);
  }
  if (thisStart === undefined) {
    thisStart = 0;
  } else {
    validateOffset(start, "sourceStart", 0, kMaxLength);
  }
  if (thisEnd === undefined) {
    thisEnd = this.length;
  } else {
    validateOffset(end, "sourceEnd", 0, this.length);
  }
  if (
    start < 0 ||
    end > target.length ||
    thisStart < 0 ||
    thisEnd > this.length
  ) {
    throw new codes.ERR_OUT_OF_RANGE("out of range index", "range");
  }
  if (thisStart >= thisEnd && start >= end) {
    return 0;
  }
  if (thisStart >= thisEnd) {
    return -1;
  }
  if (start >= end) {
    return 1;
  }
  start >>>= 0;
  end >>>= 0;
  thisStart >>>= 0;
  thisEnd >>>= 0;
  if (this === target) {
    return 0;
  }
  let x = thisEnd - thisStart;
  let y = end - start;
  const len = Math.min(x, y);
  const thisCopy = this.slice(thisStart, thisEnd);
  const targetCopy = target.slice(start, end);
  for (let i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i];
      y = targetCopy[i];
      break;
    }
  }
  if (x < y) {
    return -1;
  }
  if (y < x) {
    return 1;
  }
  return 0;
};
function bidirectionalIndexOf(buffer, val, byteOffset, encoding, dir) {
  validateBuffer(buffer);
  if (typeof byteOffset === "string") {
    encoding = byteOffset;
    byteOffset = undefined;
  } else if (byteOffset > 2_147_483_647) {
    byteOffset = 2_147_483_647;
  } else if (byteOffset < -2_147_483_648) {
    byteOffset = -2_147_483_648;
  }
  byteOffset = +byteOffset;
  if (Number.isNaN(byteOffset)) {
    byteOffset = dir ? 0 : buffer.length || buffer.byteLength;
  }
  dir = !!dir;
  if (typeof val === "number") {
    return indexOfNumber(buffer, val >>> 0, byteOffset, dir);
  }
  let ops;
  if (encoding === undefined) {
    ops = encodingOps.utf8;
  } else {
    ops = getEncodingOps(encoding);
  }
  if (typeof val === "string") {
    if (ops === undefined) {
      throw new codes.ERR_UNKNOWN_ENCODING(encoding);
    }
    return ops.indexOf(buffer, val, byteOffset, dir);
  }
  if (isUint8Array(val)) {
    const encodingVal = ops === undefined ? encodingsMap.utf8 : ops.encodingVal;
    return indexOfBuffer(buffer, val, byteOffset, encodingVal, dir);
  }
  throw new codes.ERR_INVALID_ARG_TYPE(
    "value",
    ["number", "string", "Buffer", "Uint8Array"],
    val,
  );
}
Buffer.prototype.includes = function includes(val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1;
};
Buffer.prototype.indexOf = function indexOf(val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true);
};
Buffer.prototype.lastIndexOf = function lastIndexOf(val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false);
};
Buffer.prototype.asciiSlice = function asciiSlice(offset, length) {
  if (offset === 0 && length === this.length) {
    return bytesToAscii(this);
  } else {
    return bytesToAscii(this.slice(offset, length));
  }
};
Buffer.prototype.asciiWrite = function asciiWrite(string, offset, length) {
  return blitBuffer(asciiToBytes(string), this, offset, length);
};
Buffer.prototype.base64Slice = function base64Slice(offset, length) {
  if (offset === 0 && length === this.length) {
    return encode(this);
  } else {
    return encode(this.slice(offset, length));
  }
};
Buffer.prototype.base64Write = function base64Write(string, offset, length) {
  return blitBuffer(base64ToBytes(string), this, offset, length);
};
Buffer.prototype.base64urlSlice = function base64urlSlice(offset, length) {
  if (offset === 0 && length === this.length) {
    return encode2(this);
  } else {
    return encode2(this.slice(offset, length));
  }
};
Buffer.prototype.base64urlWrite = function base64urlWrite(
  string,
  offset,
  length,
) {
  return blitBuffer(base64UrlToBytes(string), this, offset, length);
};
Buffer.prototype.hexWrite = function hexWrite(string, offset, length) {
  return blitBuffer(
    hexToBytes(string, this.length - offset),
    this,
    offset,
    length,
  );
};
Buffer.prototype.hexSlice = function hexSlice2(string, offset, length) {
  return _hexSlice(this, string, offset, length);
};
Buffer.prototype.latin1Slice = function latin1Slice(string, offset, length) {
  return _latin1Slice(this, string, offset, length);
};
Buffer.prototype.latin1Write = function latin1Write(string, offset, length) {
  return blitBuffer(asciiToBytes(string), this, offset, length);
};
Buffer.prototype.ucs2Slice = function ucs2Slice(offset, length) {
  if (offset === 0 && length === this.length) {
    return bytesToUtf16le(this);
  } else {
    return bytesToUtf16le(this.slice(offset, length));
  }
};
Buffer.prototype.ucs2Write = function ucs2Write(string, offset, length) {
  return blitBuffer(
    utf16leToBytes(string, this.length - offset),
    this,
    offset,
    length,
  );
};
Buffer.prototype.utf8Slice = function utf8Slice(string, offset, length) {
  return _utf8Slice(this, string, offset, length);
};
Buffer.prototype.utf8Write = function utf8Write(string, offset, length) {
  return blitBuffer(
    utf8ToBytes(string, this.length - offset),
    this,
    offset,
    length,
  );
};
Buffer.prototype.write = function write(string, offset, length, encoding) {
  if (offset === undefined) {
    return this.utf8Write(string, 0, this.length);
  }
  if (length === undefined && typeof offset === "string") {
    encoding = offset;
    length = this.length;
    offset = 0;
  } else {
    validateOffset(offset, "offset", 0, this.length);
    const remaining = this.length - offset;
    if (length === undefined) {
      length = remaining;
    } else if (typeof length === "string") {
      encoding = length;
      length = remaining;
    } else {
      validateOffset(length, "length", 0, this.length);
      if (length > remaining) {
        length = remaining;
      }
    }
  }
  if (!encoding) {
    return this.utf8Write(string, offset, length);
  }
  const ops = getEncodingOps(encoding);
  if (ops === undefined) {
    throw new codes.ERR_UNKNOWN_ENCODING(encoding);
  }
  return ops.write(this, string, offset, length);
};
Buffer.prototype.toJSON = function toJSON() {
  return {
    type: "Buffer",
    data: Array.prototype.slice.call(this._arr || this, 0),
  };
};
function fromArrayBuffer(obj, byteOffset, length) {
  if (byteOffset === undefined) {
    byteOffset = 0;
  } else {
    byteOffset = +byteOffset;
    if (Number.isNaN(byteOffset)) {
      byteOffset = 0;
    }
  }
  const maxLength = obj.byteLength - byteOffset;
  if (maxLength < 0) {
    throw new codes.ERR_BUFFER_OUT_OF_BOUNDS("offset");
  }
  if (length === undefined) {
    length = maxLength;
  } else {
    length = +length;
    if (length > 0) {
      if (length > maxLength) {
        throw new codes.ERR_BUFFER_OUT_OF_BOUNDS("length");
      }
    } else {
      length = 0;
    }
  }
  const buffer = new Uint8Array(obj, byteOffset, length);
  Object.setPrototypeOf(buffer, Buffer.prototype);
  return buffer;
}
const decoder = new TextDecoder();
function _utf8Slice(buf, start, end) {
  return decoder.decode(buf.slice(start, end));
}
function _latin1Slice(buf, start, end) {
  let ret = "";
  end = Math.min(buf.length, end);
  for (let i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i]);
  }
  return ret;
}
function _hexSlice(buf, start, end) {
  const len = buf.length;
  if (!start || start < 0) {
    start = 0;
  }
  if (!end || end < 0 || end > len) {
    end = len;
  }
  let out = "";
  for (let i = start; i < end; ++i) {
    out += hexSliceLookupTable[buf[i]];
  }
  return out;
}
Buffer.prototype.slice = function slice(start, end) {
  const len = this.length;
  start = ~~start;
  end = end === undefined ? len : ~~end;
  if (start < 0) {
    start += len;
    if (start < 0) {
      start = 0;
    }
  } else if (start > len) {
    start = len;
  }
  if (end < 0) {
    end += len;
    if (end < 0) {
      end = 0;
    }
  } else if (end > len) {
    end = len;
  }
  if (end < start) {
    end = start;
  }
  const newBuf = this.subarray(start, end);
  Object.setPrototypeOf(newBuf, Buffer.prototype);
  return newBuf;
};
Buffer.prototype.readUintLE = Buffer.prototype.readUIntLE = function readUIntLE(
  offset,
  byteLength2,
) {
  if (offset === undefined) {
    throw new codes.ERR_INVALID_ARG_TYPE("offset", "number", offset);
  }
  if (byteLength2 === 6) {
    return readUInt48LE(this, offset);
  }
  if (byteLength2 === 5) {
    return readUInt40LE(this, offset);
  }
  if (byteLength2 === 3) {
    return readUInt24LE(this, offset);
  }
  if (byteLength2 === 4) {
    return this.readUInt32LE(offset);
  }
  if (byteLength2 === 2) {
    return this.readUInt16LE(offset);
  }
  if (byteLength2 === 1) {
    return this.readUInt8(offset);
  }
  boundsError(byteLength2, 6, "byteLength");
};
Buffer.prototype.readUintBE = Buffer.prototype.readUIntBE = function readUIntBE(
  offset,
  byteLength2,
) {
  if (offset === undefined) {
    throw new codes.ERR_INVALID_ARG_TYPE("offset", "number", offset);
  }
  if (byteLength2 === 6) {
    return readUInt48BE(this, offset);
  }
  if (byteLength2 === 5) {
    return readUInt40BE(this, offset);
  }
  if (byteLength2 === 3) {
    return readUInt24BE(this, offset);
  }
  if (byteLength2 === 4) {
    return this.readUInt32BE(offset);
  }
  if (byteLength2 === 2) {
    return this.readUInt16BE(offset);
  }
  if (byteLength2 === 1) {
    return this.readUInt8(offset);
  }
  boundsError(byteLength2, 6, "byteLength");
};
Buffer.prototype.readUint8 = Buffer.prototype.readUInt8 = function readUInt8(
  offset = 0,
) {
  validateNumber(offset, "offset");
  const val = this[offset];
  if (val === undefined) {
    boundsError(offset, this.length - 1);
  }
  return val;
};
Buffer.prototype.readUint16BE = Buffer.prototype.readUInt16BE = readUInt16BE;
Buffer.prototype.readUint16LE = Buffer.prototype.readUInt16LE =
  function readUInt16LE(offset = 0) {
    validateNumber(offset, "offset");
    const first = this[offset];
    const last = this[offset + 1];
    if (first === undefined || last === undefined) {
      boundsError(offset, this.length - 2);
    }
    return first + last * 2 ** 8;
  };
Buffer.prototype.readUint32LE = Buffer.prototype.readUInt32LE =
  function readUInt32LE(offset = 0) {
    validateNumber(offset, "offset");
    const first = this[offset];
    const last = this[offset + 3];
    if (first === undefined || last === undefined) {
      boundsError(offset, this.length - 4);
    }
    return (
      first +
      this[++offset] * 2 ** 8 +
      this[++offset] * 2 ** 16 +
      last * 2 ** 24
    );
  };
Buffer.prototype.readUint32BE = Buffer.prototype.readUInt32BE = readUInt32BE;
Buffer.prototype.readBigUint64LE = Buffer.prototype.readBigUInt64LE =
  defineBigIntMethod(function readBigUInt64LE(offset) {
    offset = offset >>> 0;
    validateNumber(offset, "offset");
    const first = this[offset];
    const last = this[offset + 7];
    if (first === undefined || last === undefined) {
      boundsError(offset, this.length - 8);
    }
    const lo =
      first +
      this[++offset] * 2 ** 8 +
      this[++offset] * 2 ** 16 +
      this[++offset] * 2 ** 24;
    const hi =
      this[++offset] +
      this[++offset] * 2 ** 8 +
      this[++offset] * 2 ** 16 +
      last * 2 ** 24;
    return BigInt(lo) + (BigInt(hi) << BigInt(32));
  });
Buffer.prototype.readBigUint64BE = Buffer.prototype.readBigUInt64BE =
  defineBigIntMethod(function readBigUInt64BE(offset) {
    offset = offset >>> 0;
    validateNumber(offset, "offset");
    const first = this[offset];
    const last = this[offset + 7];
    if (first === undefined || last === undefined) {
      boundsError(offset, this.length - 8);
    }
    const hi =
      first * 2 ** 24 +
      this[++offset] * 2 ** 16 +
      this[++offset] * 2 ** 8 +
      this[++offset];
    const lo =
      this[++offset] * 2 ** 24 +
      this[++offset] * 2 ** 16 +
      this[++offset] * 2 ** 8 +
      last;
    return (BigInt(hi) << BigInt(32)) + BigInt(lo);
  });
Buffer.prototype.readIntLE = function readIntLE(offset, byteLength2) {
  if (offset === undefined) {
    throw new codes.ERR_INVALID_ARG_TYPE("offset", "number", offset);
  }
  if (byteLength2 === 6) {
    return readInt48LE(this, offset);
  }
  if (byteLength2 === 5) {
    return readInt40LE(this, offset);
  }
  if (byteLength2 === 3) {
    return readInt24LE(this, offset);
  }
  if (byteLength2 === 4) {
    return this.readInt32LE(offset);
  }
  if (byteLength2 === 2) {
    return this.readInt16LE(offset);
  }
  if (byteLength2 === 1) {
    return this.readInt8(offset);
  }
  boundsError(byteLength2, 6, "byteLength");
};
Buffer.prototype.readIntBE = function readIntBE(offset, byteLength2) {
  if (offset === undefined) {
    throw new codes.ERR_INVALID_ARG_TYPE("offset", "number", offset);
  }
  if (byteLength2 === 6) {
    return readInt48BE(this, offset);
  }
  if (byteLength2 === 5) {
    return readInt40BE(this, offset);
  }
  if (byteLength2 === 3) {
    return readInt24BE(this, offset);
  }
  if (byteLength2 === 4) {
    return this.readInt32BE(offset);
  }
  if (byteLength2 === 2) {
    return this.readInt16BE(offset);
  }
  if (byteLength2 === 1) {
    return this.readInt8(offset);
  }
  boundsError(byteLength2, 6, "byteLength");
};
Buffer.prototype.readInt8 = function readInt8(offset = 0) {
  validateNumber(offset, "offset");
  const val = this[offset];
  if (val === undefined) {
    boundsError(offset, this.length - 1);
  }
  return val | ((val & (2 ** 7)) * 33_554_430);
};
Buffer.prototype.readInt16LE = function readInt16LE(offset = 0) {
  validateNumber(offset, "offset");
  const first = this[offset];
  const last = this[offset + 1];
  if (first === undefined || last === undefined) {
    boundsError(offset, this.length - 2);
  }
  const val = first + last * 2 ** 8;
  return val | ((val & (2 ** 15)) * 131_070);
};
Buffer.prototype.readInt16BE = function readInt16BE(offset = 0) {
  validateNumber(offset, "offset");
  const first = this[offset];
  const last = this[offset + 1];
  if (first === undefined || last === undefined) {
    boundsError(offset, this.length - 2);
  }
  const val = first * 2 ** 8 + last;
  return val | ((val & (2 ** 15)) * 131_070);
};
Buffer.prototype.readInt32LE = function readInt32LE(offset = 0) {
  validateNumber(offset, "offset");
  const first = this[offset];
  const last = this[offset + 3];
  if (first === undefined || last === undefined) {
    boundsError(offset, this.length - 4);
  }
  return (
    first + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + (last << 24)
  );
};
Buffer.prototype.readInt32BE = function readInt32BE(offset = 0) {
  validateNumber(offset, "offset");
  const first = this[offset];
  const last = this[offset + 3];
  if (first === undefined || last === undefined) {
    boundsError(offset, this.length - 4);
  }
  return (
    (first << 24) + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + last
  );
};
Buffer.prototype.readBigInt64LE = defineBigIntMethod(
  function readBigInt64LE(offset) {
    offset = offset >>> 0;
    validateNumber(offset, "offset");
    const first = this[offset];
    const last = this[offset + 7];
    if (first === undefined || last === undefined) {
      boundsError(offset, this.length - 8);
    }
    const val =
      this[offset + 4] +
      this[offset + 5] * 2 ** 8 +
      this[offset + 6] * 2 ** 16 +
      (last << 24);
    return (
      (BigInt(val) << BigInt(32)) +
      BigInt(
        first +
          this[++offset] * 2 ** 8 +
          this[++offset] * 2 ** 16 +
          this[++offset] * 2 ** 24,
      )
    );
  },
);
Buffer.prototype.readBigInt64BE = defineBigIntMethod(
  function readBigInt64BE(offset) {
    offset = offset >>> 0;
    validateNumber(offset, "offset");
    const first = this[offset];
    const last = this[offset + 7];
    if (first === undefined || last === undefined) {
      boundsError(offset, this.length - 8);
    }
    const val =
      (first << 24) +
      this[++offset] * 2 ** 16 +
      this[++offset] * 2 ** 8 +
      this[++offset];
    return (
      (BigInt(val) << BigInt(32)) +
      BigInt(
        this[++offset] * 2 ** 24 +
          this[++offset] * 2 ** 16 +
          this[++offset] * 2 ** 8 +
          last,
      )
    );
  },
);
Buffer.prototype.readFloatLE = function readFloatLE(offset) {
  return bigEndian
    ? readFloatBackwards(this, offset)
    : readFloatForwards(this, offset);
};
Buffer.prototype.readFloatBE = function readFloatBE(offset) {
  return bigEndian
    ? readFloatForwards(this, offset)
    : readFloatBackwards(this, offset);
};
Buffer.prototype.readDoubleLE = function readDoubleLE(offset) {
  return bigEndian
    ? readDoubleBackwards(this, offset)
    : readDoubleForwards(this, offset);
};
Buffer.prototype.readDoubleBE = function readDoubleBE(offset) {
  return bigEndian
    ? readDoubleForwards(this, offset)
    : readDoubleBackwards(this, offset);
};
Buffer.prototype.writeUintLE = Buffer.prototype.writeUIntLE =
  function writeUIntLE(value, offset, byteLength2) {
    if (byteLength2 === 6) {
      return writeU_Int48LE(this, value, offset, 0, 281_474_976_710_655);
    }
    if (byteLength2 === 5) {
      return writeU_Int40LE(this, value, offset, 0, 1_099_511_627_775);
    }
    if (byteLength2 === 3) {
      return writeU_Int24LE(this, value, offset, 0, 16_777_215);
    }
    if (byteLength2 === 4) {
      return writeU_Int32LE(this, value, offset, 0, 4_294_967_295);
    }
    if (byteLength2 === 2) {
      return writeU_Int16LE(this, value, offset, 0, 65_535);
    }
    if (byteLength2 === 1) {
      return writeU_Int8(this, value, offset, 0, 255);
    }
    boundsError(byteLength2, 6, "byteLength");
  };
Buffer.prototype.writeUintBE = Buffer.prototype.writeUIntBE =
  function writeUIntBE(value, offset, byteLength2) {
    if (byteLength2 === 6) {
      return writeU_Int48BE(this, value, offset, 0, 281_474_976_710_655);
    }
    if (byteLength2 === 5) {
      return writeU_Int40BE(this, value, offset, 0, 1_099_511_627_775);
    }
    if (byteLength2 === 3) {
      return writeU_Int24BE(this, value, offset, 0, 16_777_215);
    }
    if (byteLength2 === 4) {
      return writeU_Int32BE(this, value, offset, 0, 4_294_967_295);
    }
    if (byteLength2 === 2) {
      return writeU_Int16BE(this, value, offset, 0, 65_535);
    }
    if (byteLength2 === 1) {
      return writeU_Int8(this, value, offset, 0, 255);
    }
    boundsError(byteLength2, 6, "byteLength");
  };
Buffer.prototype.writeUint8 = Buffer.prototype.writeUInt8 = function writeUInt8(
  value,
  offset = 0,
) {
  return writeU_Int8(this, value, offset, 0, 255);
};
Buffer.prototype.writeUint16LE = Buffer.prototype.writeUInt16LE =
  function writeUInt16LE(value, offset = 0) {
    return writeU_Int16LE(this, value, offset, 0, 65_535);
  };
Buffer.prototype.writeUint16BE = Buffer.prototype.writeUInt16BE =
  function writeUInt16BE(value, offset = 0) {
    return writeU_Int16BE(this, value, offset, 0, 65_535);
  };
Buffer.prototype.writeUint32LE = Buffer.prototype.writeUInt32LE =
  function writeUInt32LE(value, offset = 0) {
    return _writeUInt32LE(this, value, offset, 0, 4_294_967_295);
  };
Buffer.prototype.writeUint32BE = Buffer.prototype.writeUInt32BE =
  function writeUInt32BE(value, offset = 0) {
    return _writeUInt32BE(this, value, offset, 0, 4_294_967_295);
  };
function wrtBigUInt64LE(buf, value, offset, min, max) {
  checkIntBI(value, min, max, buf, offset, 7);
  let lo = Number(value & BigInt(4_294_967_295));
  buf[offset++] = lo;
  lo = lo >> 8;
  buf[offset++] = lo;
  lo = lo >> 8;
  buf[offset++] = lo;
  lo = lo >> 8;
  buf[offset++] = lo;
  let hi = Number((value >> BigInt(32)) & BigInt(4_294_967_295));
  buf[offset++] = hi;
  hi = hi >> 8;
  buf[offset++] = hi;
  hi = hi >> 8;
  buf[offset++] = hi;
  hi = hi >> 8;
  buf[offset++] = hi;
  return offset;
}
function wrtBigUInt64BE(buf, value, offset, min, max) {
  checkIntBI(value, min, max, buf, offset, 7);
  let lo = Number(value & BigInt(4_294_967_295));
  buf[offset + 7] = lo;
  lo = lo >> 8;
  buf[offset + 6] = lo;
  lo = lo >> 8;
  buf[offset + 5] = lo;
  lo = lo >> 8;
  buf[offset + 4] = lo;
  let hi = Number((value >> BigInt(32)) & BigInt(4_294_967_295));
  buf[offset + 3] = hi;
  hi = hi >> 8;
  buf[offset + 2] = hi;
  hi = hi >> 8;
  buf[offset + 1] = hi;
  hi = hi >> 8;
  buf[offset] = hi;
  return offset + 8;
}
Buffer.prototype.writeBigUint64LE = Buffer.prototype.writeBigUInt64LE =
  defineBigIntMethod(function writeBigUInt64LE(value, offset = 0) {
    return wrtBigUInt64LE(
      this,
      value,
      offset,
      BigInt(0),
      BigInt("0xffffffffffffffff"),
    );
  });
Buffer.prototype.writeBigUint64BE = Buffer.prototype.writeBigUInt64BE =
  defineBigIntMethod(function writeBigUInt64BE(value, offset = 0) {
    return wrtBigUInt64BE(
      this,
      value,
      offset,
      BigInt(0),
      BigInt("0xffffffffffffffff"),
    );
  });
Buffer.prototype.writeIntLE = function writeIntLE(value, offset, byteLength2) {
  if (byteLength2 === 6) {
    return writeU_Int48LE(
      this,
      value,
      offset,
      -140_737_488_355_328,
      140_737_488_355_327,
    );
  }
  if (byteLength2 === 5) {
    return writeU_Int40LE(this, value, offset, -549_755_813_888, 549_755_813_887);
  }
  if (byteLength2 === 3) {
    return writeU_Int24LE(this, value, offset, -8_388_608, 8_388_607);
  }
  if (byteLength2 === 4) {
    return writeU_Int32LE(this, value, offset, -2_147_483_648, 2_147_483_647);
  }
  if (byteLength2 === 2) {
    return writeU_Int16LE(this, value, offset, -32_768, 32_767);
  }
  if (byteLength2 === 1) {
    return writeU_Int8(this, value, offset, -128, 127);
  }
  boundsError(byteLength2, 6, "byteLength");
};
Buffer.prototype.writeIntBE = function writeIntBE(value, offset, byteLength2) {
  if (byteLength2 === 6) {
    return writeU_Int48BE(
      this,
      value,
      offset,
      -140_737_488_355_328,
      140_737_488_355_327,
    );
  }
  if (byteLength2 === 5) {
    return writeU_Int40BE(this, value, offset, -549_755_813_888, 549_755_813_887);
  }
  if (byteLength2 === 3) {
    return writeU_Int24BE(this, value, offset, -8_388_608, 8_388_607);
  }
  if (byteLength2 === 4) {
    return writeU_Int32BE(this, value, offset, -2_147_483_648, 2_147_483_647);
  }
  if (byteLength2 === 2) {
    return writeU_Int16BE(this, value, offset, -32_768, 32_767);
  }
  if (byteLength2 === 1) {
    return writeU_Int8(this, value, offset, -128, 127);
  }
  boundsError(byteLength2, 6, "byteLength");
};
Buffer.prototype.writeInt8 = function writeInt8(value, offset = 0) {
  return writeU_Int8(this, value, offset, -128, 127);
};
Buffer.prototype.writeInt16LE = function writeInt16LE(value, offset = 0) {
  return writeU_Int16LE(this, value, offset, -32_768, 32_767);
};
Buffer.prototype.writeInt16BE = function writeInt16BE(value, offset = 0) {
  return writeU_Int16BE(this, value, offset, -32_768, 32_767);
};
Buffer.prototype.writeInt32LE = function writeInt32LE(value, offset = 0) {
  return writeU_Int32LE(this, value, offset, -2_147_483_648, 2_147_483_647);
};
Buffer.prototype.writeInt32BE = function writeInt32BE(value, offset = 0) {
  return writeU_Int32BE(this, value, offset, -2_147_483_648, 2_147_483_647);
};
Buffer.prototype.writeBigInt64LE = defineBigIntMethod(function writeBigInt64LE(
  value,
  offset = 0,
) {
  return wrtBigUInt64LE(
    this,
    value,
    offset,
    -BigInt("0x8000000000000000"),
    BigInt("0x7fffffffffffffff"),
  );
});
Buffer.prototype.writeBigInt64BE = defineBigIntMethod(function writeBigInt64BE(
  value,
  offset = 0,
) {
  return wrtBigUInt64BE(
    this,
    value,
    offset,
    -BigInt("0x8000000000000000"),
    BigInt("0x7fffffffffffffff"),
  );
});
Buffer.prototype.writeFloatLE = function writeFloatLE(value, offset) {
  return bigEndian
    ? writeFloatBackwards(this, value, offset)
    : writeFloatForwards(this, value, offset);
};
Buffer.prototype.writeFloatBE = function writeFloatBE(value, offset) {
  return bigEndian
    ? writeFloatForwards(this, value, offset)
    : writeFloatBackwards(this, value, offset);
};
Buffer.prototype.writeDoubleLE = function writeDoubleLE(value, offset) {
  return bigEndian
    ? writeDoubleBackwards(this, value, offset)
    : writeDoubleForwards(this, value, offset);
};
Buffer.prototype.writeDoubleBE = function writeDoubleBE(value, offset) {
  return bigEndian
    ? writeDoubleForwards(this, value, offset)
    : writeDoubleBackwards(this, value, offset);
};
Buffer.prototype.copy = function copy(
  target,
  targetStart,
  sourceStart,
  sourceEnd,
) {
  if (!isUint8Array(this)) {
    throw new codes.ERR_INVALID_ARG_TYPE(
      "source",
      ["Buffer", "Uint8Array"],
      this,
    );
  }
  if (!isUint8Array(target)) {
    throw new codes.ERR_INVALID_ARG_TYPE(
      "target",
      ["Buffer", "Uint8Array"],
      target,
    );
  }
  if (targetStart === undefined) {
    targetStart = 0;
  } else {
    targetStart = toInteger(targetStart, 0);
    if (targetStart < 0) {
      throw new codes.ERR_OUT_OF_RANGE("targetStart", ">= 0", targetStart);
    }
  }
  if (sourceStart === undefined) {
    sourceStart = 0;
  } else {
    sourceStart = toInteger(sourceStart, 0);
    if (sourceStart < 0) {
      throw new codes.ERR_OUT_OF_RANGE("sourceStart", ">= 0", sourceStart);
    }
    if (sourceStart >= MAX_UINT32) {
      throw new codes.ERR_OUT_OF_RANGE(
        "sourceStart",
        `< ${MAX_UINT32}`,
        sourceStart,
      );
    }
  }
  if (sourceEnd === undefined) {
    sourceEnd = this.length;
  } else {
    sourceEnd = toInteger(sourceEnd, 0);
    if (sourceEnd < 0) {
      throw new codes.ERR_OUT_OF_RANGE("sourceEnd", ">= 0", sourceEnd);
    }
    if (sourceEnd >= MAX_UINT32) {
      throw new codes.ERR_OUT_OF_RANGE(
        "sourceEnd",
        `< ${MAX_UINT32}`,
        sourceEnd,
      );
    }
  }
  if (targetStart >= target.length) {
    return 0;
  }
  if (sourceEnd > 0 && sourceEnd < sourceStart) {
    sourceEnd = sourceStart;
  }
  if (sourceEnd === sourceStart) {
    return 0;
  }
  if (target.length === 0 || this.length === 0) {
    return 0;
  }
  if (sourceEnd > this.length) {
    sourceEnd = this.length;
  }
  if (target.length - targetStart < sourceEnd - sourceStart) {
    sourceEnd = target.length - targetStart + sourceStart;
  }
  const len = sourceEnd - sourceStart;
  if (
    this === target &&
    typeof Uint8Array.prototype.copyWithin === "function"
  ) {
    this.copyWithin(targetStart, sourceStart, sourceEnd);
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(sourceStart, sourceEnd),
      targetStart,
    );
  }
  return len;
};
Buffer.prototype.fill = function fill(val, start, end, encoding) {
  if (typeof val === "string") {
    if (typeof start === "string") {
      encoding = start;
      start = 0;
      end = this.length;
    } else if (typeof end === "string") {
      encoding = end;
      end = this.length;
    }
    if (encoding !== undefined && typeof encoding !== "string") {
      throw new TypeError("encoding must be a string");
    }
    if (typeof encoding === "string" && !Buffer.isEncoding(encoding)) {
      throw new TypeError("Unknown encoding: " + encoding);
    }
    if (val.length === 1) {
      const code = val.charCodeAt(0);
      if ((encoding === "utf8" && code < 128) || encoding === "latin1") {
        val = code;
      }
    }
  } else if (typeof val === "number") {
    val = val & 255;
  } else if (typeof val === "boolean") {
    val = Number(val);
  }
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError("Out of range index");
  }
  if (end <= start) {
    return this;
  }
  start = start >>> 0;
  end = end === undefined ? this.length : end >>> 0;
  if (!val) {
    val = 0;
  }
  let i;
  if (typeof val === "number") {
    for (i = start; i < end; ++i) {
      this[i] = val;
    }
  } else {
    const bytes = Buffer.isBuffer(val) ? val : Buffer.from(val, encoding);
    const len = bytes.length;
    if (len === 0) {
      throw new codes.ERR_INVALID_ARG_VALUE("value", val);
    }
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len];
    }
  }
  return this;
};
function checkBounds(buf, offset, byteLength2) {
  validateNumber(offset, "offset");
  if (buf[offset] === undefined || buf[offset + byteLength2] === undefined) {
    boundsError(offset, buf.length - (byteLength2 + 1));
  }
}
function checkIntBI(value, min, max, buf, offset, byteLength2) {
  if (value > max || value < min) {
    const n = typeof min === "bigint" ? "n" : "";
    let range;
    if (byteLength2 > 3) {
      if (min === 0 || min === BigInt(0)) {
        range = `>= 0${n} and < 2${n} ** ${(byteLength2 + 1) * 8}${n}`;
      } else {
        range = `>= -(2${n} ** ${(byteLength2 + 1) * 8 - 1}${n}) and < 2 ** ${(byteLength2 + 1) * 8 - 1}${n}`;
      }
    } else {
      range = `>= ${min}${n} and <= ${max}${n}`;
    }
    throw new codes.ERR_OUT_OF_RANGE("value", range, value);
  }
  checkBounds(buf, offset, byteLength2);
}
function utf8ToBytes(string, units) {
  units = units || Infinity;
  let codePoint;
  const length = string.length;
  let leadSurrogate = null;
  const bytes = [];
  for (let i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i);
    if (codePoint > 55_295 && codePoint < 57_344) {
      if (!leadSurrogate) {
        if (codePoint > 56_319) {
          if ((units -= 3) > -1) {
            bytes.push(239, 191, 189);
          }
          continue;
        } else if (i + 1 === length) {
          if ((units -= 3) > -1) {
            bytes.push(239, 191, 189);
          }
          continue;
        }
        leadSurrogate = codePoint;
        continue;
      }
      if (codePoint < 56_320) {
        if ((units -= 3) > -1) {
          bytes.push(239, 191, 189);
        }
        leadSurrogate = codePoint;
        continue;
      }
      codePoint =
        (((leadSurrogate - 55_296) << 10) | (codePoint - 56_320)) + 65_536;
    } else if (leadSurrogate && (units -= 3) > -1) {
        bytes.push(239, 191, 189);
      }
    leadSurrogate = null;
    if (codePoint < 128) {
      if ((units -= 1) < 0) {
        break;
      }
      bytes.push(codePoint);
    } else if (codePoint < 2048) {
      if ((units -= 2) < 0) {
        break;
      }
      bytes.push((codePoint >> 6) | 192, (codePoint & 63) | 128);
    } else if (codePoint < 65_536) {
      if ((units -= 3) < 0) {
        break;
      }
      bytes.push(
        (codePoint >> 12) | 224,
        ((codePoint >> 6) & 63) | 128,
        (codePoint & 63) | 128,
      );
    } else if (codePoint < 1_114_112) {
      if ((units -= 4) < 0) {
        break;
      }
      bytes.push(
        (codePoint >> 18) | 240,
        ((codePoint >> 12) & 63) | 128,
        ((codePoint >> 6) & 63) | 128,
        (codePoint & 63) | 128,
      );
    } else {
      throw new Error("Invalid code point");
    }
  }
  return bytes;
}
function blitBuffer(src, dst, offset, byteLength2) {
  let i;
  const length = byteLength2 === undefined ? src.length : byteLength2;
  for (i = 0; i < length; ++i) {
    if (i + offset >= dst.length || i >= src.length) {
      break;
    }
    dst[i + offset] = src[i];
  }
  return i;
}
function isInstance(obj, type) {
  return (
    obj instanceof type ||
    (obj != null &&
      obj.constructor != null &&
      obj.constructor.name != null &&
      obj.constructor.name === type.name)
  );
}
var hexSliceLookupTable = (function () {
  const alphabet = "0123456789abcdef";
  const table = Array.from({length: 256});
  for (let i = 0; i < 16; ++i) {
    const i16 = i * 16;
    for (let j = 0; j < 16; ++j) {
      table[i16 + j] = alphabet[i] + alphabet[j];
    }
  }
  return table;
})();
function defineBigIntMethod(fn) {
  return typeof BigInt === "undefined" ? BufferBigIntNotDefined : fn;
}
function BufferBigIntNotDefined() {
  throw new Error("BigInt not supported");
}
const atob2 = globalThis.atob;
const Blob = globalThis.Blob;
const btoa = globalThis.btoa;
function readUInt48LE(buf, offset = 0) {
  validateNumber(offset, "offset");
  const first = buf[offset];
  const last = buf[offset + 5];
  if (first === undefined || last === undefined) {
    boundsError(offset, buf.length - 6);
  }
  return (
    first +
    buf[++offset] * 2 ** 8 +
    buf[++offset] * 2 ** 16 +
    buf[++offset] * 2 ** 24 +
    (buf[++offset] + last * 2 ** 8) * 2 ** 32
  );
}
function readUInt40LE(buf, offset = 0) {
  validateNumber(offset, "offset");
  const first = buf[offset];
  const last = buf[offset + 4];
  if (first === undefined || last === undefined) {
    boundsError(offset, buf.length - 5);
  }
  return (
    first +
    buf[++offset] * 2 ** 8 +
    buf[++offset] * 2 ** 16 +
    buf[++offset] * 2 ** 24 +
    last * 2 ** 32
  );
}
function readUInt24LE(buf, offset = 0) {
  validateNumber(offset, "offset");
  const first = buf[offset];
  const last = buf[offset + 2];
  if (first === undefined || last === undefined) {
    boundsError(offset, buf.length - 3);
  }
  return first + buf[++offset] * 2 ** 8 + last * 2 ** 16;
}
function readUInt48BE(buf, offset = 0) {
  validateNumber(offset, "offset");
  const first = buf[offset];
  const last = buf[offset + 5];
  if (first === undefined || last === undefined) {
    boundsError(offset, buf.length - 6);
  }
  return (
    (first * 2 ** 8 + buf[++offset]) * 2 ** 32 +
    buf[++offset] * 2 ** 24 +
    buf[++offset] * 2 ** 16 +
    buf[++offset] * 2 ** 8 +
    last
  );
}
function readUInt40BE(buf, offset = 0) {
  validateNumber(offset, "offset");
  const first = buf[offset];
  const last = buf[offset + 4];
  if (first === undefined || last === undefined) {
    boundsError(offset, buf.length - 5);
  }
  return (
    first * 2 ** 32 +
    buf[++offset] * 2 ** 24 +
    buf[++offset] * 2 ** 16 +
    buf[++offset] * 2 ** 8 +
    last
  );
}
function readUInt24BE(buf, offset = 0) {
  validateNumber(offset, "offset");
  const first = buf[offset];
  const last = buf[offset + 2];
  if (first === undefined || last === undefined) {
    boundsError(offset, buf.length - 3);
  }
  return first * 2 ** 16 + buf[++offset] * 2 ** 8 + last;
}
function readUInt16BE(offset = 0) {
  validateNumber(offset, "offset");
  const first = this[offset];
  const last = this[offset + 1];
  if (first === undefined || last === undefined) {
    boundsError(offset, this.length - 2);
  }
  return first * 2 ** 8 + last;
}
function readUInt32BE(offset = 0) {
  validateNumber(offset, "offset");
  const first = this[offset];
  const last = this[offset + 3];
  if (first === undefined || last === undefined) {
    boundsError(offset, this.length - 4);
  }
  return (
    first * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + last
  );
}
function readDoubleBackwards(buffer, offset = 0) {
  validateNumber(offset, "offset");
  const first = buffer[offset];
  const last = buffer[offset + 7];
  if (first === undefined || last === undefined) {
    boundsError(offset, buffer.length - 8);
  }
  uInt8Float64Array[7] = first;
  uInt8Float64Array[6] = buffer[++offset];
  uInt8Float64Array[5] = buffer[++offset];
  uInt8Float64Array[4] = buffer[++offset];
  uInt8Float64Array[3] = buffer[++offset];
  uInt8Float64Array[2] = buffer[++offset];
  uInt8Float64Array[1] = buffer[++offset];
  uInt8Float64Array[0] = last;
  return float64Array[0];
}
function readDoubleForwards(buffer, offset = 0) {
  validateNumber(offset, "offset");
  const first = buffer[offset];
  const last = buffer[offset + 7];
  if (first === undefined || last === undefined) {
    boundsError(offset, buffer.length - 8);
  }
  uInt8Float64Array[0] = first;
  uInt8Float64Array[1] = buffer[++offset];
  uInt8Float64Array[2] = buffer[++offset];
  uInt8Float64Array[3] = buffer[++offset];
  uInt8Float64Array[4] = buffer[++offset];
  uInt8Float64Array[5] = buffer[++offset];
  uInt8Float64Array[6] = buffer[++offset];
  uInt8Float64Array[7] = last;
  return float64Array[0];
}
function writeDoubleForwards(buffer, val, offset = 0) {
  val = +val;
  checkBounds(buffer, offset, 7);
  float64Array[0] = val;
  buffer[offset++] = uInt8Float64Array[0];
  buffer[offset++] = uInt8Float64Array[1];
  buffer[offset++] = uInt8Float64Array[2];
  buffer[offset++] = uInt8Float64Array[3];
  buffer[offset++] = uInt8Float64Array[4];
  buffer[offset++] = uInt8Float64Array[5];
  buffer[offset++] = uInt8Float64Array[6];
  buffer[offset++] = uInt8Float64Array[7];
  return offset;
}
function writeDoubleBackwards(buffer, val, offset = 0) {
  val = +val;
  checkBounds(buffer, offset, 7);
  float64Array[0] = val;
  buffer[offset++] = uInt8Float64Array[7];
  buffer[offset++] = uInt8Float64Array[6];
  buffer[offset++] = uInt8Float64Array[5];
  buffer[offset++] = uInt8Float64Array[4];
  buffer[offset++] = uInt8Float64Array[3];
  buffer[offset++] = uInt8Float64Array[2];
  buffer[offset++] = uInt8Float64Array[1];
  buffer[offset++] = uInt8Float64Array[0];
  return offset;
}
function readFloatBackwards(buffer, offset = 0) {
  validateNumber(offset, "offset");
  const first = buffer[offset];
  const last = buffer[offset + 3];
  if (first === undefined || last === undefined) {
    boundsError(offset, buffer.length - 4);
  }
  uInt8Float32Array[3] = first;
  uInt8Float32Array[2] = buffer[++offset];
  uInt8Float32Array[1] = buffer[++offset];
  uInt8Float32Array[0] = last;
  return float32Array[0];
}
function readFloatForwards(buffer, offset = 0) {
  validateNumber(offset, "offset");
  const first = buffer[offset];
  const last = buffer[offset + 3];
  if (first === undefined || last === undefined) {
    boundsError(offset, buffer.length - 4);
  }
  uInt8Float32Array[0] = first;
  uInt8Float32Array[1] = buffer[++offset];
  uInt8Float32Array[2] = buffer[++offset];
  uInt8Float32Array[3] = last;
  return float32Array[0];
}
function writeFloatForwards(buffer, val, offset = 0) {
  val = +val;
  checkBounds(buffer, offset, 3);
  float32Array[0] = val;
  buffer[offset++] = uInt8Float32Array[0];
  buffer[offset++] = uInt8Float32Array[1];
  buffer[offset++] = uInt8Float32Array[2];
  buffer[offset++] = uInt8Float32Array[3];
  return offset;
}
function writeFloatBackwards(buffer, val, offset = 0) {
  val = +val;
  checkBounds(buffer, offset, 3);
  float32Array[0] = val;
  buffer[offset++] = uInt8Float32Array[3];
  buffer[offset++] = uInt8Float32Array[2];
  buffer[offset++] = uInt8Float32Array[1];
  buffer[offset++] = uInt8Float32Array[0];
  return offset;
}
function readInt24LE(buf, offset = 0) {
  validateNumber(offset, "offset");
  const first = buf[offset];
  const last = buf[offset + 2];
  if (first === undefined || last === undefined) {
    boundsError(offset, buf.length - 3);
  }
  const val = first + buf[++offset] * 2 ** 8 + last * 2 ** 16;
  return val | ((val & (2 ** 23)) * 510);
}
function readInt40LE(buf, offset = 0) {
  validateNumber(offset, "offset");
  const first = buf[offset];
  const last = buf[offset + 4];
  if (first === undefined || last === undefined) {
    boundsError(offset, buf.length - 5);
  }
  return (
    (last | ((last & (2 ** 7)) * 33_554_430)) * 2 ** 32 +
    first +
    buf[++offset] * 2 ** 8 +
    buf[++offset] * 2 ** 16 +
    buf[++offset] * 2 ** 24
  );
}
function readInt48LE(buf, offset = 0) {
  validateNumber(offset, "offset");
  const first = buf[offset];
  const last = buf[offset + 5];
  if (first === undefined || last === undefined) {
    boundsError(offset, buf.length - 6);
  }
  const val = buf[offset + 4] + last * 2 ** 8;
  return (
    (val | ((val & (2 ** 15)) * 131_070)) * 2 ** 32 +
    first +
    buf[++offset] * 2 ** 8 +
    buf[++offset] * 2 ** 16 +
    buf[++offset] * 2 ** 24
  );
}
function readInt24BE(buf, offset = 0) {
  validateNumber(offset, "offset");
  const first = buf[offset];
  const last = buf[offset + 2];
  if (first === undefined || last === undefined) {
    boundsError(offset, buf.length - 3);
  }
  const val = first * 2 ** 16 + buf[++offset] * 2 ** 8 + last;
  return val | ((val & (2 ** 23)) * 510);
}
function readInt48BE(buf, offset = 0) {
  validateNumber(offset, "offset");
  const first = buf[offset];
  const last = buf[offset + 5];
  if (first === undefined || last === undefined) {
    boundsError(offset, buf.length - 6);
  }
  const val = buf[++offset] + first * 2 ** 8;
  return (
    (val | ((val & (2 ** 15)) * 131_070)) * 2 ** 32 +
    buf[++offset] * 2 ** 24 +
    buf[++offset] * 2 ** 16 +
    buf[++offset] * 2 ** 8 +
    last
  );
}
function readInt40BE(buf, offset = 0) {
  validateNumber(offset, "offset");
  const first = buf[offset];
  const last = buf[offset + 4];
  if (first === undefined || last === undefined) {
    boundsError(offset, buf.length - 5);
  }
  return (
    (first | ((first & (2 ** 7)) * 33_554_430)) * 2 ** 32 +
    buf[++offset] * 2 ** 24 +
    buf[++offset] * 2 ** 16 +
    buf[++offset] * 2 ** 8 +
    last
  );
}
function byteLengthUtf8(str) {
  return utf8Encoder.encode(str).length;
}
function base64ByteLength(str, bytes) {
  if (str.charCodeAt(bytes - 1) === 61) {
    bytes--;
  }
  if (bytes > 1 && str.charCodeAt(bytes - 1) === 61) {
    bytes--;
  }
  return (bytes * 3) >>> 2;
}
var encodingsMap = Object.create(null);
for (const [i, encoding] of encodings.entries()) {
  encodingsMap[encoding] = i;
}
var encodingOps = {
  ascii: {
    byteLength: (string) => string.length,
    encoding: "ascii",
    encodingVal: encodingsMap.ascii,
    indexOf: (buf, val, byteOffset, dir) =>
      indexOfBuffer(
        buf,
        asciiToBytes(val),
        byteOffset,
        encodingsMap.ascii,
        dir,
      ),
    slice: (buf, start, end) => buf.asciiSlice(start, end),
    write: (buf, string, offset, len) => buf.asciiWrite(string, offset, len),
  },
  base64: {
    byteLength: (string) => base64ByteLength(string, string.length),
    encoding: "base64",
    encodingVal: encodingsMap.base64,
    indexOf: (buf, val, byteOffset, dir) =>
      indexOfBuffer(
        buf,
        base64ToBytes(val),
        byteOffset,
        encodingsMap.base64,
        dir,
      ),
    slice: (buf, start, end) => buf.base64Slice(start, end),
    write: (buf, string, offset, len) => buf.base64Write(string, offset, len),
  },
  base64url: {
    byteLength: (string) => base64ByteLength(string, string.length),
    encoding: "base64url",
    encodingVal: encodingsMap.base64url,
    indexOf: (buf, val, byteOffset, dir) =>
      indexOfBuffer(
        buf,
        base64UrlToBytes(val),
        byteOffset,
        encodingsMap.base64url,
        dir,
      ),
    slice: (buf, start, end) => buf.base64urlSlice(start, end),
    write: (buf, string, offset, len) =>
      buf.base64urlWrite(string, offset, len),
  },
  hex: {
    byteLength: (string) => string.length >>> 1,
    encoding: "hex",
    encodingVal: encodingsMap.hex,
    indexOf: (buf, val, byteOffset, dir) =>
      indexOfBuffer(buf, hexToBytes(val), byteOffset, encodingsMap.hex, dir),
    slice: (buf, start, end) => buf.hexSlice(start, end),
    write: (buf, string, offset, len) => buf.hexWrite(string, offset, len),
  },
  latin1: {
    byteLength: (string) => string.length,
    encoding: "latin1",
    encodingVal: encodingsMap.latin1,
    indexOf: (buf, val, byteOffset, dir) =>
      indexOfBuffer(
        buf,
        asciiToBytes(val),
        byteOffset,
        encodingsMap.latin1,
        dir,
      ),
    slice: (buf, start, end) => buf.latin1Slice(start, end),
    write: (buf, string, offset, len) => buf.latin1Write(string, offset, len),
  },
  ucs2: {
    byteLength: (string) => string.length * 2,
    encoding: "ucs2",
    encodingVal: encodingsMap.utf16le,
    indexOf: (buf, val, byteOffset, dir) =>
      indexOfBuffer(
        buf,
        utf16leToBytes(val),
        byteOffset,
        encodingsMap.utf16le,
        dir,
      ),
    slice: (buf, start, end) => buf.ucs2Slice(start, end),
    write: (buf, string, offset, len) => buf.ucs2Write(string, offset, len),
  },
  utf8: {
    byteLength: byteLengthUtf8,
    encoding: "utf8",
    encodingVal: encodingsMap.utf8,
    indexOf: (buf, val, byteOffset, dir) =>
      indexOfBuffer(
        buf,
        utf8Encoder.encode(val),
        byteOffset,
        encodingsMap.utf8,
        dir,
      ),
    slice: (buf, start, end) => buf.utf8Slice(start, end),
    write: (buf, string, offset, len) => buf.utf8Write(string, offset, len),
  },
  utf16le: {
    byteLength: (string) => string.length * 2,
    encoding: "utf16le",
    encodingVal: encodingsMap.utf16le,
    indexOf: (buf, val, byteOffset, dir) =>
      indexOfBuffer(
        buf,
        utf16leToBytes(val),
        byteOffset,
        encodingsMap.utf16le,
        dir,
      ),
    slice: (buf, start, end) => buf.ucs2Slice(start, end),
    write: (buf, string, offset, len) => buf.ucs2Write(string, offset, len),
  },
};
function getEncodingOps(encoding) {
  encoding = String(encoding).toLowerCase();
  switch (encoding.length) {
    case 4:
      if (encoding === "utf8") return encodingOps.utf8;
      if (encoding === "ucs2") return encodingOps.ucs2;
      break;
    case 5:
      if (encoding === "utf-8") return encodingOps.utf8;
      if (encoding === "ascii") return encodingOps.ascii;
      if (encoding === "ucs-2") return encodingOps.ucs2;
      break;
    case 7:
      if (encoding === "utf16le") {
        return encodingOps.utf16le;
      }
      break;
    case 8:
      if (encoding === "utf-16le") {
        return encodingOps.utf16le;
      }
      break;
    case 6:
      if (encoding === "latin1" || encoding === "binary") {
        return encodingOps.latin1;
      }
      if (encoding === "base64") return encodingOps.base64;
    case 3:
      if (encoding === "hex") {
        return encodingOps.hex;
      }
      break;
    case 9:
      if (encoding === "base64url") {
        return encodingOps.base64url;
      }
      break;
  }
}
function _copyActual(source, target, targetStart, sourceStart, sourceEnd) {
  if (sourceEnd - sourceStart > target.length - targetStart) {
    sourceEnd = sourceStart + target.length - targetStart;
  }
  let nb = sourceEnd - sourceStart;
  const sourceLen = source.length - sourceStart;
  if (nb > sourceLen) {
    nb = sourceLen;
  }
  if (sourceStart !== 0 || sourceEnd < source.length) {
    source = new Uint8Array(source.buffer, source.byteOffset + sourceStart, nb);
  }
  target.set(source, targetStart);
  return nb;
}
function boundsError(value, length, type) {
  if (Math.floor(value) !== value) {
    validateNumber(value, type);
    throw new codes.ERR_OUT_OF_RANGE(type || "offset", "an integer", value);
  }
  if (length < 0) {
    throw new codes.ERR_BUFFER_OUT_OF_BOUNDS();
  }
  throw new codes.ERR_OUT_OF_RANGE(
    type || "offset",
    `>= ${type ? 1 : 0} and <= ${length}`,
    value,
  );
}
function validateNumber(value, name) {
  if (typeof value !== "number") {
    throw new codes.ERR_INVALID_ARG_TYPE(name, "number", value);
  }
}
function checkInt(value, min, max, buf, offset, byteLength2) {
  if (value > max || value < min) {
    const n = typeof min === "bigint" ? "n" : "";
    let range;
    if (byteLength2 > 3) {
      if (min === 0 || min === 0n) {
        range = `>= 0${n} and < 2${n} ** ${(byteLength2 + 1) * 8}${n}`;
      } else {
        range =
          `>= -(2${n} ** ${(byteLength2 + 1) * 8 - 1}${n}) and ` +
          `< 2${n} ** ${(byteLength2 + 1) * 8 - 1}${n}`;
      }
    } else {
      range = `>= ${min}${n} and <= ${max}${n}`;
    }
    throw new codes.ERR_OUT_OF_RANGE("value", range, value);
  }
  checkBounds(buf, offset, byteLength2);
}
function toInteger(n, defaultVal) {
  n = +n;
  if (
    !Number.isNaN(n) &&
    n >= Number.MIN_SAFE_INTEGER &&
    n <= Number.MAX_SAFE_INTEGER
  ) {
    return n % 1 === 0 ? n : Math.floor(n);
  }
  return defaultVal;
}
function writeU_Int8(buf, value, offset, min, max) {
  value = +value;
  validateNumber(offset, "offset");
  if (value > max || value < min) {
    throw new codes.ERR_OUT_OF_RANGE("value", `>= ${min} and <= ${max}`, value);
  }
  if (buf[offset] === undefined) {
    boundsError(offset, buf.length - 1);
  }
  buf[offset] = value;
  return offset + 1;
}
function writeU_Int16BE(buf, value, offset, min, max) {
  value = +value;
  checkInt(value, min, max, buf, offset, 1);
  buf[offset++] = value >>> 8;
  buf[offset++] = value;
  return offset;
}
function _writeUInt32LE(buf, value, offset, min, max) {
  value = +value;
  checkInt(value, min, max, buf, offset, 3);
  buf[offset++] = value;
  value = value >>> 8;
  buf[offset++] = value;
  value = value >>> 8;
  buf[offset++] = value;
  value = value >>> 8;
  buf[offset++] = value;
  return offset;
}
function writeU_Int16LE(buf, value, offset, min, max) {
  value = +value;
  checkInt(value, min, max, buf, offset, 1);
  buf[offset++] = value;
  buf[offset++] = value >>> 8;
  return offset;
}
function _writeUInt32BE(buf, value, offset, min, max) {
  value = +value;
  checkInt(value, min, max, buf, offset, 3);
  buf[offset + 3] = value;
  value = value >>> 8;
  buf[offset + 2] = value;
  value = value >>> 8;
  buf[offset + 1] = value;
  value = value >>> 8;
  buf[offset] = value;
  return offset + 4;
}
function writeU_Int48BE(buf, value, offset, min, max) {
  value = +value;
  checkInt(value, min, max, buf, offset, 5);
  const newVal = Math.floor(value * 2 ** -32);
  buf[offset++] = newVal >>> 8;
  buf[offset++] = newVal;
  buf[offset + 3] = value;
  value = value >>> 8;
  buf[offset + 2] = value;
  value = value >>> 8;
  buf[offset + 1] = value;
  value = value >>> 8;
  buf[offset] = value;
  return offset + 4;
}
function writeU_Int40BE(buf, value, offset, min, max) {
  value = +value;
  checkInt(value, min, max, buf, offset, 4);
  buf[offset++] = Math.floor(value * 2 ** -32);
  buf[offset + 3] = value;
  value = value >>> 8;
  buf[offset + 2] = value;
  value = value >>> 8;
  buf[offset + 1] = value;
  value = value >>> 8;
  buf[offset] = value;
  return offset + 4;
}
function writeU_Int32BE(buf, value, offset, min, max) {
  value = +value;
  checkInt(value, min, max, buf, offset, 3);
  buf[offset + 3] = value;
  value = value >>> 8;
  buf[offset + 2] = value;
  value = value >>> 8;
  buf[offset + 1] = value;
  value = value >>> 8;
  buf[offset] = value;
  return offset + 4;
}
function writeU_Int24BE(buf, value, offset, min, max) {
  value = +value;
  checkInt(value, min, max, buf, offset, 2);
  buf[offset + 2] = value;
  value = value >>> 8;
  buf[offset + 1] = value;
  value = value >>> 8;
  buf[offset] = value;
  return offset + 3;
}
function validateOffset(value, name, min = 0, max = Number.MAX_SAFE_INTEGER) {
  if (typeof value !== "number") {
    throw new codes.ERR_INVALID_ARG_TYPE(name, "number", value);
  }
  if (!Number.isInteger(value)) {
    throw new codes.ERR_OUT_OF_RANGE(name, "an integer", value);
  }
  if (value < min || value > max) {
    throw new codes.ERR_OUT_OF_RANGE(name, `>= ${min} && <= ${max}`, value);
  }
}
function writeU_Int48LE(buf, value, offset, min, max) {
  value = +value;
  checkInt(value, min, max, buf, offset, 5);
  const newVal = Math.floor(value * 2 ** -32);
  buf[offset++] = value;
  value = value >>> 8;
  buf[offset++] = value;
  value = value >>> 8;
  buf[offset++] = value;
  value = value >>> 8;
  buf[offset++] = value;
  buf[offset++] = newVal;
  buf[offset++] = newVal >>> 8;
  return offset;
}
function writeU_Int40LE(buf, value, offset, min, max) {
  value = +value;
  checkInt(value, min, max, buf, offset, 4);
  const newVal = value;
  buf[offset++] = value;
  value = value >>> 8;
  buf[offset++] = value;
  value = value >>> 8;
  buf[offset++] = value;
  value = value >>> 8;
  buf[offset++] = value;
  buf[offset++] = Math.floor(newVal * 2 ** -32);
  return offset;
}
function writeU_Int32LE(buf, value, offset, min, max) {
  value = +value;
  checkInt(value, min, max, buf, offset, 3);
  buf[offset++] = value;
  value = value >>> 8;
  buf[offset++] = value;
  value = value >>> 8;
  buf[offset++] = value;
  value = value >>> 8;
  buf[offset++] = value;
  return offset;
}
function writeU_Int24LE(buf, value, offset, min, max) {
  value = +value;
  checkInt(value, min, max, buf, offset, 2);
  buf[offset++] = value;
  value = value >>> 8;
  buf[offset++] = value;
  value = value >>> 8;
  buf[offset++] = value;
  return offset;
}
const buffer_default = {
  atob: atob2,
  btoa,
  Blob,
  Buffer,
  constants,
  kMaxLength,
  kStringMaxLength,
  SlowBuffer,
};
export {
  writeU_Int8,
  writeU_Int48LE,
  writeU_Int48BE,
  writeU_Int40LE,
  writeU_Int40BE,
  writeU_Int32LE,
  writeU_Int32BE,
  writeU_Int24LE,
  writeU_Int24BE,
  writeU_Int16LE,
  writeU_Int16BE,
  writeFloatForwards,
  writeFloatBackwards,
  writeDoubleForwards,
  writeDoubleBackwards,
  validateOffset,
  validateNumber,
  toInteger,
  readUInt48LE,
  readUInt48BE,
  readUInt40LE,
  readUInt40BE,
  readUInt32BE,
  readUInt24LE,
  readUInt24BE,
  readUInt16BE,
  readInt48LE,
  readInt48BE,
  readInt40LE,
  readInt40BE,
  readInt24LE,
  readInt24BE,
  readFloatForwards,
  readFloatBackwards,
  readDoubleForwards,
  readDoubleBackwards,
  kStringMaxLength,
  kMaxLength,
  getEncodingOps,
  encodingsMap,
  encodingOps,
  buffer_default as default,
  constants,
  byteLengthUtf8,
  btoa,
  boundsError,
  bigEndian,
  atob2 as atob,
  _writeUInt32LE,
  _writeUInt32BE,
  _copyActual,
  SlowBuffer,
  Buffer,
  Blob,
};
