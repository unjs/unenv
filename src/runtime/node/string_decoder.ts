// https://nodejs.org/api/string_decoder.html
import type stringDecoder from "node:string_decoder";
import { notImplementedClass } from "../_internal/utils.ts";

export const StringDecoder: typeof stringDecoder.StringDecoder =
  (globalThis as any).StringDecoder ||
  /*@__PURE__*/ notImplementedClass("string_decoder.StringDecoder");

export default <typeof stringDecoder>{
  StringDecoder,
};
