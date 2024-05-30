import type wasi from "node:wasi";
import { WASI } from "./wasi";
export { WASI } from "./wasi";

export default <typeof wasi>{
  WASI,
};
