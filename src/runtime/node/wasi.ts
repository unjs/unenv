import type wasi from "node:wasi";
import { notImplementedClass } from "../_internal/utils";

export const WASI: typeof wasi.WASI =
  /*@__PURE__*/ notImplementedClass("wasi.WASI");

export default {
  WASI,
} satisfies typeof wasi;
