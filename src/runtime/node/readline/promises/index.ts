import type readline from "node:readline/promises";
import { Interface } from "./interface";
import { Readline } from "./readline";

export { Interface } from "./interface";
export { Readline } from "./readline";

export const createInterface: typeof readline.createInterface = () =>
  new Interface();

export default <typeof readline>{
  Interface,
  Readline,
  createInterface,
};
