import type wasi from "node:wasi";
import { notImplementedClass } from "../../_internal/utils";

const WASI: typeof wasi.WASI = notImplementedClass("wasi.WASI");

export default <typeof wasi>{
  WASI,
};
