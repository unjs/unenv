import type readline from "node:readline/promises";
import { Interface } from "../internal/readline/promises/interface.ts";
import { Readline } from "../internal/readline/promises/readline.ts";

export { Interface } from "../internal/readline/promises/interface.ts";
export { Readline } from "../internal/readline/promises/readline.ts";

export const createInterface: typeof readline.createInterface = () =>
  new Interface();

export default {
  Interface,
  Readline,
  createInterface,
} as typeof readline;
