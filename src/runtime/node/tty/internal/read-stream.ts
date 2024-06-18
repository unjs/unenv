import type tty from "node:tty";
import { Socket } from "../../net";

export class ReadStream extends Socket implements tty.ReadStream {
  isRaw = false;
  setRawMode(mode: boolean) {
    this.isRaw = mode;
    return this;
  }
  isTTY = false;
}
