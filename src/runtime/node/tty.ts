import type tty from "node:tty";
import { ReadStream } from "./internal/tty/read-stream.ts";
import { WriteStream } from "./internal/tty/write-stream.ts";

export { ReadStream } from "./internal/tty/read-stream.ts";
export { WriteStream } from "./internal/tty/write-stream.ts";

export const isatty: typeof tty.isatty = function () {
  return false;
};

export default {
  ReadStream,
  WriteStream,
  isatty,
} satisfies typeof tty;
