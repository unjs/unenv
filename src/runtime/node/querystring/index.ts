// Source: https://github.com/nodejs/node/blob/v22.7.0/lib/querystring.js

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

import { encodeStr, hexTable, isHexTable } from "./internal/querystring";

// prettier-ignore
const unhexTable = new Int8Array([
  -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, // 0 - 15
  -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, // 16 - 31
  -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, // 32 - 47
  +0, +1, +2, +3, +4, +5, +6, +7, +8, +9, -1, -1, -1, -1, -1, -1, // 48 - 63
  -1, 10, 11, 12, 13, 14, 15, -1, -1, -1, -1, -1, -1, -1, -1, -1, // 64 - 79
  -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, // 80 - 95
  -1, 10, 11, 12, 13, 14, 15, -1, -1, -1, -1, -1, -1, -1, -1, -1, // 96 - 111
  -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, // 112 - 127
  -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, // 128 ...
  -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
  -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
  -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
  -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
  -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
  -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
  -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  // ... 255
]);

/**
 * A safe fast alternative to decodeURIComponent
 * @param {string} s
 * @param {boolean} decodeSpaces
 * @returns {string}
 */
function unescapeBuffer(s: string, decodeSpaces?: boolean): string | Buffer {
  // TODO: Use TextEncoder/TextDecoder + Uint8Array to avoid Buffer
  const out = globalThis.Buffer.allocUnsafe(s.length);
  let index = 0;
  let outIndex = 0;
  let currentChar;
  let nextChar;
  let hexHigh;
  let hexLow;
  const maxLength = s.length - 2;
  // Flag to know if some hex chars have been decoded
  let hasHex = false;
  while (index < s.length) {
    currentChar = String.prototype.charCodeAt.call(s, index);
    if (currentChar === 43 /* '+' */ && decodeSpaces) {
      out[outIndex++] = 32; // ' '
      index++;
      continue;
    }
    if (currentChar === 37 /* '%' */ && index < maxLength) {
      currentChar = String.prototype.charCodeAt.call(s, ++index);
      hexHigh = unhexTable[currentChar];
      if (hexHigh >= 0) {
        nextChar = String.prototype.charCodeAt.call(s, ++index);
        hexLow = unhexTable[nextChar];
        if (hexLow >= 0) {
          hasHex = true;
          currentChar = hexHigh * 16 + hexLow;
        } else {
          out[outIndex++] = 37; // '%'
          index--;
        }
      } else {
        out[outIndex++] = 37; // '%'
        continue;
      }
    }
    out[outIndex++] = currentChar;
    index++;
  }
  return hasHex ? out.slice(0, outIndex) : out;
}

/**
 * @param {string} s
 * @param {boolean} decodeSpaces
 * @returns {string}
 */
function qsUnescape(s: string, decodeSpaces?: boolean): string {
  try {
    return decodeURIComponent(s);
  } catch {
    return unescapeBuffer(s, decodeSpaces).toString();
  }
}

// These characters do not need escaping when generating query strings:
// ! - . _ ~
// ' ( ) *
// digits
// alpha (uppercase)
// alpha (lowercase)
// prettier-ignore
const noEscape = new Int8Array([
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // 0 - 15
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // 16 - 31
  0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 0, // 32 - 47
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, // 48 - 63
  0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, // 64 - 79
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, // 80 - 95
  0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, // 96 - 111
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0,  // 112 - 127
]);

/**
 * QueryString.escape() replaces encodeURIComponent()
 * @see https://www.ecma-international.org/ecma-262/5.1/#sec-15.1.3.4
 * @param {any} str
 * @returns {string}
 */
function qsEscape(str: string): string {
  if (typeof str !== "string") {
    if (typeof str === "object") str = String(str);
    else {
      (str as any) += "";
    }
  }

  return encodeStr(str, noEscape, hexTable);
}

/**
 * @param {string | number | bigint | boolean | symbol | undefined | null} v
 * @returns {string}
 */
function stringifyPrimitive(
  v: string | number | bigint | boolean | symbol | undefined | null,
): string {
  if (typeof v === "string") return v;
  if (typeof v === "number" && Number.isFinite(v)) return "" + v;
  if (typeof v === "bigint") return "" + v;
  if (typeof v === "boolean") return v ? "true" : "false";
  return "";
}

/**
 * @param {string | number | bigint | boolean} v
 * @param {(v: string) => string} encode
 * @returns {string}
 */
function encodeStringified(
  v: string | number | bigint | boolean,
  encode: (v: string) => string,
): string {
  if (typeof v === "string") return v.length > 0 ? encode(v) : "";
  if (typeof v === "number" && Number.isFinite(v)) {
    // Values >= 1e21 automatically switch to scientific notation which requires
    // escaping due to the inclusion of a '+' in the output
    return Math.abs(v) < 1e21 ? "" + v : encode("" + v);
  }
  if (typeof v === "bigint") return "" + v;
  if (typeof v === "boolean") return v ? "true" : "false";
  return "";
}

/**
 * @param {string | number | boolean | null} v
 * @param {(v: string) => string} encode
 * @returns {string}
 */
function encodeStringifiedCustom(
  v: string | number | boolean | null,
  encode: (v: string) => string,
): string {
  return encode(stringifyPrimitive(v));
}

/**
 * @param {Record<string, string | number | boolean
 * | ReadonlyArray<string | number | boolean> | null>} obj
 * @param {string} [sep]
 * @param {string} [eq]
 * @param {{ encodeURIComponent?: (v: string) => string }} [options]
 * @returns {string}
 */
function stringify(
  obj: Record<
    string,
    string | number | boolean | ReadonlyArray<string | number | boolean> | null
  >,
  sep: string,
  eq: string,
  options: { encodeURIComponent?: (v: string) => string },
) {
  sep = sep || "&";
  eq = eq || "=";

  let encode = qsEscape;
  if (options && typeof options.encodeURIComponent === "function") {
    encode = options.encodeURIComponent;
  }
  const convert =
    encode === qsEscape ? encodeStringified : encodeStringifiedCustom;

  if (obj !== null && typeof obj === "object") {
    const keys = Object.keys(obj);
    const len = keys.length;
    let fields = "";
    for (let i = 0; i < len; ++i) {
      const k = keys[i];
      const v = obj[k];
      let ks = convert(k, encode);
      ks += eq;

      if (Array.isArray(v)) {
        const vlen = v.length;
        if (vlen === 0) continue;
        if (fields) fields += sep;
        for (let j = 0; j < vlen; ++j) {
          if (j) fields += sep;
          fields += ks;
          fields += convert(v[j], encode);
        }
      } else {
        if (fields) fields += sep;
        fields += ks;
        fields += convert(v as any /* CHECKME */, encode);
      }
    }
    return fields;
  }
  return "";
}

/**
 * @param {string} str
 * @returns {number[]}
 */
function charCodes(str: string): number[] {
  if (str.length === 0) return [];
  if (str.length === 1) return [String.prototype.charCodeAt.call(str, 0)];
  const ret = Array.from({ length: str.length }) as number[];
  for (let i = 0; i < str.length; ++i)
    ret[i] = String.prototype.charCodeAt.call(str, i);
  return ret;
}

const defSepCodes = [38]; // &
const defEqCodes = [61]; // =

function addKeyVal(
  obj: any,
  key: string,
  value: string,
  keyEncoded: boolean,
  valEncoded: boolean,
  decode: (v: string, decodeSpaces?: boolean) => string,
) {
  if (key.length > 0 && keyEncoded) key = decodeStr(key, decode);
  if (value.length > 0 && valEncoded) value = decodeStr(value, decode);

  if (obj[key] === undefined) {
    obj[key] = value;
  } else {
    const curValue = obj[key];
    // A simple Array-specific property check is enough here to
    // distinguish from a string value and is faster and still safe
    // since we are generating all of the values being assigned.
    if (curValue.pop) curValue[curValue.length] = value;
    else obj[key] = [curValue, value];
  }
}

/**
 * Parse a key/val string.
 * @param {string} qs
 * @param {string} sep
 * @param {string} eq
 * @param {{
 *   maxKeys?: number;
 *   decodeURIComponent?(v: string): string;
 *   }} [options]
 * @returns {Record<string, string | string[]>}
 */
function parse(
  qs: string,
  sep: string,
  eq: string,
  options: {
    maxKeys?: number;
    decodeURIComponent?(v: string): string;
  },
) {
  const obj = { __proto__: null };

  if (typeof qs !== "string" || qs.length === 0) {
    return obj;
  }

  const sepCodes = sep ? charCodes(String(sep)) : defSepCodes;
  const eqCodes = eq ? charCodes(String(eq)) : defEqCodes;
  const sepLen = sepCodes.length;
  const eqLen = eqCodes.length;

  let pairs = 1000;
  if (options && typeof options.maxKeys === "number") {
    // -1 is used in place of a value like Infinity for meaning
    // "unlimited pairs" because of additional checks V8 (at least as of v5.4)
    // has to do when using variables that contain values like Infinity. Since
    // `pairs` is always decremented and checked explicitly for 0, -1 works
    // effectively the same as Infinity, while providing a significant
    // performance boost.
    pairs = options.maxKeys > 0 ? options.maxKeys : -1;
  }

  let decode = qsUnescape;
  if (options && typeof options.decodeURIComponent === "function") {
    decode = options.decodeURIComponent;
  }
  const customDecode = decode !== qsUnescape;

  let lastPos = 0;
  let sepIdx = 0;
  let eqIdx = 0;
  let key = "";
  let value = "";
  let keyEncoded = customDecode;
  let valEncoded = customDecode;
  const plusChar = customDecode ? "%20" : " ";
  let encodeCheck = 0;
  for (let i = 0; i < qs.length; ++i) {
    const code = String.prototype.charCodeAt.call(qs, i);

    // Try matching key/value pair separator (e.g. '&')
    if (code === sepCodes[sepIdx]) {
      if (++sepIdx === sepLen) {
        // Key/value pair separator match!
        const end = i - sepIdx + 1;
        if (eqIdx < eqLen) {
          // We didn't find the (entire) key/value separator
          if (lastPos < end) {
            // Treat the substring as part of the key instead of the value
            key += String.prototype.slice.call(qs, lastPos, end);
          } else if (key.length === 0) {
            // We saw an empty substring between separators
            if (--pairs === 0) return obj;
            lastPos = i + 1;
            sepIdx = eqIdx = 0;
            continue;
          }
        } else if (lastPos < end) {
          value += String.prototype.slice.call(qs, lastPos, end);
        }

        addKeyVal(obj, key, value, keyEncoded, valEncoded, decode);

        if (--pairs === 0) return obj;
        keyEncoded = valEncoded = customDecode;
        key = value = "";
        encodeCheck = 0;
        lastPos = i + 1;
        sepIdx = eqIdx = 0;
      }
    } else {
      sepIdx = 0;
      // Try matching key/value separator (e.g. '=') if we haven't already
      if (eqIdx < eqLen) {
        if (code === eqCodes[eqIdx]) {
          if (++eqIdx === eqLen) {
            // Key/value separator match!
            const end = i - eqIdx + 1;
            if (lastPos < end)
              key += String.prototype.slice.call(qs, lastPos, end);
            encodeCheck = 0;
            lastPos = i + 1;
          }
          continue;
        } else {
          eqIdx = 0;
          if (!keyEncoded) {
            // Try to match an (valid) encoded byte once to minimize unnecessary
            // calls to string decoding functions
            if (code === 37 /* % */) {
              encodeCheck = 1;
              continue;
            } else if (encodeCheck > 0) {
              if (isHexTable[code] === 1) {
                if (++encodeCheck === 3) keyEncoded = true;
                continue;
              } else {
                encodeCheck = 0;
              }
            }
          }
        }
        if (code === 43 /* + */) {
          if (lastPos < i) key += String.prototype.slice.call(qs, lastPos, i);
          key += plusChar;
          lastPos = i + 1;
          continue;
        }
      }
      if (code === 43 /* + */) {
        if (lastPos < i) value += String.prototype.slice.call(qs, lastPos, i);
        value += plusChar;
        lastPos = i + 1;
      } else if (!valEncoded) {
        // Try to match an (valid) encoded byte (once) to minimize unnecessary
        // calls to string decoding functions
        if (code === 37 /* % */) {
          encodeCheck = 1;
        } else if (encodeCheck > 0) {
          if (isHexTable[code] === 1) {
            if (++encodeCheck === 3) valEncoded = true;
          } else {
            encodeCheck = 0;
          }
        }
      }
    }
  }

  // Deal with any leftover key or value data
  if (lastPos < qs.length) {
    if (eqIdx < eqLen) key += String.prototype.slice.call(qs, lastPos);
    else if (sepIdx < sepLen) value += String.prototype.slice.call(qs, lastPos);
  } else if (eqIdx === 0 && key.length === 0) {
    // We ended on an empty substring
    return obj;
  }

  addKeyVal(obj, key, value, keyEncoded, valEncoded, decode);

  return obj;
}

/**
 * V8 does not optimize functions with try-catch blocks, so we isolate them here
 * to minimize the damage (Note: no longer true as of V8 5.4 -- but still will
 * not be inlined).
 * @param {string} s
 * @param {(v: string) => string} decoder
 * @returns {string}
 */
function decodeStr(s: string, decoder: (v: string) => string) {
  try {
    return decoder(s);
  } catch {
    return qsUnescape(s, true);
  }
}

export {
  unescapeBuffer,
  qsUnescape as unescape,
  qsEscape as escape,
  stringify,
  stringify as encode,
  parse,
  parse as decode,
};

export default {
  unescapeBuffer,
  unescape: qsUnescape,
  escape: qsEscape,
  stringify,
  encode: stringify,
  parse,
  decode: parse,
};
