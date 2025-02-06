import type readline from "node:readline/promises";
import { Interface } from "../internal/readline/promises/interface";
import { Readline } from "../internal/readline/promises/readline";

export { Interface } from "../internal/readline/promises/interface";
export { Readline } from "../internal/readline/promises/readline";

export const createInterface: typeof readline.createInterface = () =>
  new Interface();

export default <typeof readline>{
  Interface,
  Readline,
  createInterface,
};
