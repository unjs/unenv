import type nodeTty from "node:tty";

export class WriteStream implements Partial<nodeTty.WriteStream> {
  fd: number;
  columns = 80;
  rows = 24;
  isTTY = false;

  constructor(fd: number) {
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

  write(buffer: Uint8Array | string, cb?: (err?: Error) => void): boolean;
  write(
    str: Uint8Array | string,
    encoding?: BufferEncoding,
    cb?: (err?: Error) => void,
  ): boolean;
  write(str: unknown, encoding?: unknown, cb?: unknown): boolean {
    if (str instanceof Uint8Array) {
      str = new TextDecoder().decode(str);
    }
    try {
      console.log(str);
    } catch {}
    cb && typeof cb === "function" && cb();
    return false;
  }
}
