import type tty from "node:tty";
// Relative net import required, see https://github.com/unjs/unenv/issues/353
import { Socket } from "../../net";

export class ReadStream extends Socket implements tty.ReadStream {
  isRaw = false;
  setRawMode(mode: boolean) {
    this.isRaw = mode;
    return this;
  }
  isTTY = false;
}
