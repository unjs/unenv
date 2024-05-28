// https://nodejs.org/api/querystring.html

import { parseQuery, stringifyQuery } from "ufo";
import type { QueryObject } from "ufo";
import type querystring from "node:querystring";

export const parse: typeof querystring.parse = function (
  obj,
  _sep,
  _eq,
  _options,
) {
  return parseQuery(obj);
};
export const decode: typeof querystring.decode = parse;

export const stringify: typeof querystring.stringify = function (
  obj,
  _sep,
  _eq,
  _options,
) {
  return stringifyQuery(obj as QueryObject);
};
export const encode: typeof querystring.encode = stringify;

// eslint-disable-next-line prefer-const
export let escape: typeof querystring.escape = encodeURIComponent;

// eslint-disable-next-line prefer-const
export let unescape: typeof querystring.unescape = decodeURIComponent;

export const unescapeBuffer = function (str: string, _decodeSpaces: boolean) {
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
