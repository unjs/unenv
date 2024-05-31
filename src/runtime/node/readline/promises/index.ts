import type readline from "node:readline/promises";
import { Interface } from "../internal/promises/interface";
import { Readline } from "../internal/promises/readline";

export { Interface } from "../internal/promises/interface";
export { Readline } from "../internal/promises/readline";

export const createInterface: typeof readline.createInterface = () =>
  new Interface();

export default <typeof readline>{
  Interface,
  Readline,
  createInterface,
};
