import type tty from "node:tty";
import { ReadStream } from "./read-stream";
import { WriteStream } from "./write-stream";

export { ReadStream } from "./read-stream";
export { WriteStream } from "./write-stream";

export const isatty: typeof tty.isatty = function () {
  return false;
};

export default <typeof tty>{
  ReadStream,
  WriteStream,
  isatty,
};
