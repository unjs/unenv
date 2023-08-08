// https://nodejs.org/api/string_decoder.html
import type stringDecoder from "node:string_decoder";
import { notImplementedClass } from "src/runtime/_internal/utils";

export const StringDecoder: typeof stringDecoder.StringDecoder =
  (globalThis as any).StringDecoder ||
  notImplementedClass("string_decoder.StringDecoder");

export default <typeof stringDecoder>{
  StringDecoder,
};
