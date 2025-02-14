import type nodeReadlinePromises from "node:readline/promises";
import type { Direction } from "node:readline";

export class Readline implements nodeReadlinePromises.Readline {
  clearLine(dir: Direction) {
    return this;
  }
  clearScreenDown() {
    return this;
  }
  commit(): Promise<void> {
    return Promise.resolve();
  }
  cursorTo(x: number, y?: number | undefined) {
    return this;
  }
  moveCursor(dx: number, dy: number) {
    return this;
  }
  rollback() {
    return this;
  }
}
