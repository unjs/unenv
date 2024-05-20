import { notImplemented, notImplementedClass } from "../../../_internal/utils";
import type assert_strict from "node:assert/strict";

export const AssertionError: typeof assert_strict.AssertionError =
  notImplementedClass("assert_strict.AssertionError");
export const CallTracker: typeof assert_strict.CallTracker =
  notImplementedClass("assert_strict.CallTracker");
export const deepEqual: typeof assert_strict.deepEqual = notImplemented(
  "assert_strict.deepEqual",
);
export const deepStrictEqual: typeof assert_strict.deepStrictEqual =
  notImplemented("assert_strict.deepStrictEqual");
export const doesNotMatch: typeof assert_strict.doesNotMatch = notImplemented(
  "assert_strict.doesNotMatch",
);
export const doesNotReject: typeof assert_strict.doesNotReject = notImplemented(
  "assert_strict.doesNotReject",
);
export const doesNotThrow: typeof assert_strict.doesNotThrow = notImplemented(
  "assert_strict.doesNotThrow",
);
export const equal: typeof assert_strict.equal = notImplemented(
  "assert_strict.equal",
);
export const fail: typeof assert_strict.fail = () => {
  throw new Error(`[unenv] assert/strict.fail is not implemented yet!`);
};
export const ifError: typeof assert_strict.ifError = notImplemented(
  "assert_strict.ifError",
);
export const match: typeof assert_strict.match = notImplemented(
  "assert_strict.match",
);
export const notDeepEqual: typeof assert_strict.notDeepEqual = notImplemented(
  "assert_strict.notDeepEqual",
);
export const notDeepStrictEqual: typeof assert_strict.notDeepStrictEqual =
  notImplemented("assert_strict.notDeepStrictEqual");
export const notEqual: typeof assert_strict.notEqual = notImplemented(
  "assert_strict.notEqual",
);
export const notStrictEqual: typeof assert_strict.notStrictEqual =
  notImplemented("assert_strict.notStrictEqual");
export const ok: typeof assert_strict.ok = notImplemented("assert_strict.ok");
export const rejects: typeof assert_strict.rejects = notImplemented(
  "assert_strict.rejects",
);
export const strictEqual: typeof assert_strict.strictEqual = notImplemented(
  "assert_strict.strictEqual",
);
export const throws: typeof assert_strict.throws = notImplemented(
  "assert_strict.throws",
);

export default <typeof assert_strict>{
  AssertionError,
  CallTracker,
  deepEqual,
  deepStrictEqual,
  doesNotMatch,
  doesNotReject,
  doesNotThrow,
  equal,
  fail,
  ifError,
  match,
  notDeepEqual,
  notDeepStrictEqual,
  notEqual,
  notStrictEqual,
  ok,
  rejects,
  strictEqual,
  throws,
};
