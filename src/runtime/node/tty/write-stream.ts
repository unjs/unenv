import type tty from "node:tty";
import { Socket } from "node:net";

export class WriteStream extends Socket implements tty.WriteStream {
  clearLine(dir: tty.Direction, callback?: (() => void) | undefined) {
    return false;
  }
  clearScreenDown(callback?: (() => void) | undefined) {
    return false;
  }
  cursorTo(
    x: number,
    y?: number | undefined,
    callback?: (() => void) | undefined,
  ): boolean;
  cursorTo(x: number, callback: () => void): boolean;
  cursorTo(x: unknown, y?: unknown, callback?: unknown): boolean {
    return false;
  }
  moveCursor(dx: number, dy: number, callback?: (() => void) | undefined) {
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
    return [0, 0];
  }
  columns = 0;
  rows = 0;
  isTTY = false;
}
