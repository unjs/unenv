import type tty from "node:tty";
import { ReadStream } from "./internal/read-stream";
import { WriteStream } from "./internal/write-stream";

export { ReadStream } from "./internal/read-stream";
export { WriteStream } from "./internal/write-stream";

export const isatty: typeof tty.isatty = function () {
  return false;
};

export default <typeof tty>{
  ReadStream,
  WriteStream,
  isatty,
};
