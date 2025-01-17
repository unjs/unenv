import type tty from "node:tty";
import { ReadStream } from "./internal/tty/read-stream";
import { WriteStream } from "./internal/tty/write-stream";

export { ReadStream } from "./internal/tty/read-stream";
export { WriteStream } from "./internal/tty/write-stream";

export const isatty: typeof tty.isatty = function () {
  return false;
};

export default <typeof tty>{
  ReadStream,
  WriteStream,
  isatty,
};
