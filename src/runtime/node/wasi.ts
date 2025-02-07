import type nodeWasi from "node:wasi";
import { notImplementedClass } from "../_internal/utils.ts";

export const WASI: typeof nodeWasi.WASI =
  /*@__PURE__*/ notImplementedClass("wasi.WASI");

export default {
  WASI,
} satisfies typeof nodeWasi;
