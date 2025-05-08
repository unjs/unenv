import type * as nodeSqlite from "node:sqlite";
import { notImplementedClass } from "../_internal/utils.ts";

export const DatabaseSync: typeof nodeSqlite.DatabaseSync =
  /*@__PURE__*/ notImplementedClass("sqlite.DatabaseSync");

export const StatementSync: typeof nodeSqlite.StatementSync =
  /*@__PURE__*/ notImplementedClass("sqlite.StatementSync");

export const constants = {} as typeof nodeSqlite.constants;

export default {
  DatabaseSync,
  StatementSync,
  constants,
} satisfies typeof nodeSqlite;
