import type readline from "node:readline/promises";
import type { Abortable } from "node:events";
import { Interface as _Interface } from "../interface.ts";

export class Interface extends _Interface implements readline.Interface {
  question(query: string): Promise<string>;
  question(query: string, options: Abortable): Promise<string>;
  question(query: unknown, options?: unknown): Promise<string> {
    return Promise.resolve("");
  }
}
