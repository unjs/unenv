// https://nodejs.org/api/readline.html#readlineclearlinestream-dir-callback
import type readline from "node:readline";
import noop from "../mock/noop.ts";
import promises from "./readline/promises.ts";
import { Interface } from "./internal/readline/interface.ts";

export * as promises from "./readline/promises.ts";
export { Interface } from "./internal/readline/interface.ts";

export const clearLine: typeof readline.clearLine = () => false;
export const clearScreenDown: typeof readline.clearScreenDown = () => false;
export const createInterface: typeof readline.createInterface = () =>
  new Interface();
export const cursorTo: typeof readline.cursorTo = () => false;
export const emitKeypressEvents: typeof readline.emitKeypressEvents = noop;
export const moveCursor: typeof readline.moveCursor = () => false;

export default {
  Interface,
  Readline: Interface,
  clearLine,
  clearScreenDown,
  createInterface,
  cursorTo,
  emitKeypressEvents,
  moveCursor,
  promises,
} as /* TODO: use satisfies */ typeof readline;
