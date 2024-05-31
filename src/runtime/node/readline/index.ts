// https://nodejs.org/api/readline.html#readlineclearlinestream-dir-callback
import type readline from "node:readline";
import noop from "../../mock/noop";
import promises from "./promises";
import { Interface } from "./interface";

export * as promises from "./promises";
export { Interface } from "./interface";

export const clearLine: typeof readline.clearLine = () => false;
export const clearScreenDown: typeof readline.clearScreenDown = () => false;
export const createInterface: typeof readline.createInterface = () =>
  new Interface();
export const cursorTo: typeof readline.cursorTo = () => false;
export const emitKeypressEvents: typeof readline.emitKeypressEvents = noop;
export const moveCursor: typeof readline.moveCursor = () => false;

export default <typeof readline>{
  Interface,
  Readline: Interface,
  clearLine,
  clearScreenDown,
  createInterface,
  cursorTo,
  emitKeypressEvents,
  moveCursor,
  promises,
};
