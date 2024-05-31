import type readline from "node:readline";
import type { Abortable } from "node:events";
import { EventEmitter } from "node:events";

// eslint-disable-next-line unicorn/prefer-event-target
export class Interface extends EventEmitter implements readline.Interface {
  terminal = false;
  line = "";
  cursor = 0;

  getPrompt() {
    return "";
  }
  setPrompt(prompt: string): void {}
  prompt(preserveCursor?: boolean | undefined): void {}
  question(query: string, callback: (answer: string) => void): void;
  question(
    query: string,
    options: Abortable,
    callback: (answer: string) => void,
  ): void;
  question(query: unknown, options: unknown, callback?: unknown): void {
    callback && typeof callback === "function" && callback("");
  }

  resume() {
    return this;
  }
  close() {}
  write(data: string | Buffer, key?: readline.Key | undefined): void;
  write(data: string | Buffer | null | undefined, key: readline.Key): void;
  write(data: unknown, key?: unknown): void {}
  getCursorPos(): readline.CursorPos {
    return {
      rows: 0,
      cols: 0,
    };
  }
  pause() {
    return this;
  }

  async *[Symbol.asyncIterator](): AsyncIterableIterator<string> {
    yield "";
  }
}
