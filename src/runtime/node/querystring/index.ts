import {
  parseQuery,
  stringifyQuery,
  encode as _encode,
  decode as _decode,
} from "ufo";
import type { QueryObject } from "ufo";
import type querystring from "node:querystring";
import { notImplemented } from "src/runtime/_internal/utils";

const _stringify: typeof querystring.stringify = function (obj) {
  return stringifyQuery(obj as QueryObject);
};
export const decode: typeof querystring.decode = parseQuery;
export const encode: typeof querystring.encode = _stringify;
export const escape: typeof querystring.escape = _encode;
export const parse: typeof querystring.parse = parseQuery;
export const stringify: typeof querystring.stringify = _stringify;
export const unescape: typeof querystring.unescape = _decode;
export const unescapeBuffer: typeof querystring.unescape = notImplemented(
  "querystring.unescapeBuffer",
);

export default <typeof querystring>{
  decode,
  encode,
  escape,
  parse,
  stringify,
  unescape,
  unescapeBuffer,
};
