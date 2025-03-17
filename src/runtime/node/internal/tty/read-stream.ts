import type nodeTty from "node:tty";
import { Socket } from "node:net";

export class ReadStream implements Partial<nodeTty.ReadStream> {
  fd: number;
  isRaw = false;
  isTTY = false;

  constructor(fd: number) {
    this.fd = fd;
  }

  setRawMode(mode: boolean) {
    this.isRaw = mode;
    return this as unknown as nodeTty.ReadStream;
  }
}
