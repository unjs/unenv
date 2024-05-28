// https://nodejs.org/api/querystring.html

import { parseQuery, stringifyQuery } from "ufo";
import type { QueryObject } from "ufo";
import type querystring from "node:querystring";

const _stringify: typeof querystring.stringify = function (obj) {
  return stringifyQuery(obj as QueryObject);
};
const _parse: typeof querystring.parse = function (obj) {
  return parseQuery(obj);
};

export const decode: typeof querystring.decode = _parse;
export const parse: typeof querystring.parse = _parse;
export const encode: typeof querystring.encode = _stringify;
export const stringify: typeof querystring.stringify = _stringify;

// eslint-disable-next-line prefer-const
export let escape: typeof querystring.escape = encodeURIComponent;
// eslint-disable-next-line prefer-const
export let unescape: typeof querystring.unescape = decodeURIComponent;

export const unescapeBuffer = function (str: string) {
  return Buffer.from(unescape(str));
};

export default <typeof querystring>{
  decode,
  encode,
  escape,
  parse,
  stringify,
  unescape,
  unescapeBuffer,
};
