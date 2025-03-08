// https://nodejs.org/api/readline.html#readlineclearlinestream-dir-callback
import type nodeReadline from "node:readline";
import noop from "../mock/noop.ts";
import promises from "node:readline/promises";
import { Interface } from "./internal/readline/interface.ts";

export { promises };

export { Interface } from "./internal/readline/interface.ts";

export const clearLine: typeof nodeReadline.clearLine = () => false;
export const clearScreenDown: typeof nodeReadline.clearScreenDown = () => false;
export const createInterface: typeof nodeReadline.createInterface = () =>
  new Interface();
export const cursorTo: typeof nodeReadline.cursorTo = () => false;
export const emitKeypressEvents: typeof nodeReadline.emitKeypressEvents = noop;
export const moveCursor: typeof nodeReadline.moveCursor = () => false;

export default {
  clearLine,
  clearScreenDown,
  createInterface,
  cursorTo,
  emitKeypressEvents,
  moveCursor,
  // @ts-expect-error
  Interface,
  promises,
} satisfies typeof nodeReadline;
