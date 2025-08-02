import type nodeTty from "node:tty";
import { ReadStream } from "./internal/tty/read-stream.ts";
import { WriteStream } from "./internal/tty/write-stream.ts";

export { ReadStream } from "./internal/tty/read-stream.ts";
export { WriteStream } from "./internal/tty/write-stream.ts";

export const isatty: typeof nodeTty.isatty = function () {
  return false;
};

export default {
  ReadStream: ReadStream as unknown as typeof nodeTty.ReadStream,
  WriteStream: WriteStream as unknown as typeof nodeTty.WriteStream,
  isatty,
} satisfies typeof nodeTty;
