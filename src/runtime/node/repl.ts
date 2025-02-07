import type nodeRepl from "node:repl";
import { builtinModules as _builtinModules } from "node:module";
import { notImplemented, notImplementedClass } from "../_internal/utils.ts";

export const writer =
  /*@__PURE__*/ notImplementedClass<typeof nodeRepl.writer>("repl.writer");

export const start =
  /*@__PURE__*/ notImplemented<typeof nodeRepl.start>("repl.start");

export const Recoverable =
  /*@__PURE__*/ notImplementedClass<typeof nodeRepl.Recoverable>(
    "repl.Recoverable",
  );

export const REPLServer =
  /*@__PURE__*/ notImplementedClass<typeof nodeRepl.REPLServer>(
    "repl.REPLServer",
  );

export const REPL_MODE_SLOPPY: unique symbol =
  /*@__PURE__*/ Symbol("repl-sloppy");

export const REPL_MODE_STRICT: unique symbol =
  /*@__PURE__*/ Symbol("repl-strict");

export const builtinModules = /*@__PURE__*/ _builtinModules.filter(
  (m) => m[0] !== "_",
);

export default {
  writer,
  start,
  Recoverable,
  REPLServer,
  builtinModules,
  // @ts-expect-error
  REPL_MODE_SLOPPY,
  // @ts-expect-error
  REPL_MODE_STRICT,
} satisfies typeof nodeRepl;
