// https://nodejs.org/api/string_decoder.html
import type nodeStringDecoder from "node:string_decoder";
import { notImplementedClass } from "../_internal/utils.ts";

export const StringDecoder: typeof nodeStringDecoder.StringDecoder =
  (globalThis as any).StringDecoder ||
  /*@__PURE__*/ notImplementedClass("string_decoder.StringDecoder");

export default {
  StringDecoder,
} satisfies typeof nodeStringDecoder;
