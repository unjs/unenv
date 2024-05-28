import { parseQuery, stringifyQuery } from "ufo";
import type { QueryObject } from "ufo";
import type querystring from "node:querystring";

const _stringify: typeof querystring.stringify = function (obj) {
  return stringifyQuery(obj as QueryObject);
};
export const decode: typeof querystring.decode = parseQuery;
export const encode: typeof querystring.encode = _stringify;
export const parse: typeof querystring.parse = parseQuery;
export const stringify: typeof querystring.stringify = _stringify;

export let escape: typeof querystring.escape = encodeURIComponent;
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
