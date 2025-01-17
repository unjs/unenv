import type tty from "node:tty";
import { Socket } from "node:net";

export class ReadStream extends Socket implements tty.ReadStream {
  fd: number;
  constructor(fd: number) {
    super();
    this.fd = fd;
  }
  isRaw = false;
  setRawMode(mode: boolean) {
    this.isRaw = mode;
    return this;
  }
  isTTY = false;
}
