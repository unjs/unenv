import type nodeTty from "node:tty";
import { Socket } from "node:net";

export class WriteStream extends Socket implements nodeTty.WriteStream {
  fd: number;
  constructor(fd: number) {
    super();
    this.fd = fd;
  }
  clearLine(dir: nodeTty.Direction, callback?: (() => void) | undefined) {
    callback && callback();
    return false;
  }
  clearScreenDown(callback?: (() => void) | undefined) {
    callback && callback();
    return false;
  }
  cursorTo(
    x: number,
    y?: number | undefined,
    callback?: (() => void) | undefined,
  ): boolean;
  cursorTo(x: number, callback: () => void): boolean;
  cursorTo(x: unknown, y?: unknown, callback?: unknown): boolean {
    callback && typeof callback === "function" && callback();
    return false;
  }
  moveCursor(dx: number, dy: number, callback?: (() => void) | undefined) {
    callback && callback();
    return false;
  }
  getColorDepth(env?: object | undefined): number {
    return 1;
  }
  hasColors(count?: number | undefined): boolean;
  hasColors(env?: object | undefined): boolean;
  hasColors(count: number, env?: object | undefined): boolean;
  hasColors(count?: unknown, env?: unknown): boolean {
    return false;
  }
  getWindowSize(): [number, number] {
    return [this.columns, this.rows];
  }
  columns = 80;
  rows = 24;
  isTTY = false;
}
