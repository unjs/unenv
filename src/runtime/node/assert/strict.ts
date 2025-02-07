import type nodeAssert from "node:assert";

import {
  AssertionError,
  CallTracker,
  strict,
  fail,
  ok,
  throws,
  rejects,
  doesNotThrow,
  doesNotReject,
  ifError,
  match,
  doesNotMatch,
  notDeepStrictEqual,
  notDeepStrictEqual as notDeepEqual,
  strictEqual,
  strictEqual as equal,
  notStrictEqual,
  notStrictEqual as notEqual,
  deepStrictEqual,
  deepStrictEqual as deepEqual,
  partialDeepStrictEqual,
} from "../assert.ts";

export {
  AssertionError,
  CallTracker,
  strict,
  fail,
  ok,
  throws,
  rejects,
  doesNotThrow,
  doesNotReject,
  ifError,
  match,
  doesNotMatch,
  notDeepStrictEqual,
  notDeepStrictEqual as notDeepEqual,
  strictEqual,
  strictEqual as equal,
  notStrictEqual,
  notStrictEqual as notEqual,
  deepStrictEqual,
  deepStrictEqual as deepEqual,
  partialDeepStrictEqual,
} from "../assert.ts";

export default Object.assign(ok, {
  AssertionError,
  CallTracker,
  strict,
  fail,
  ok,
  throws,
  rejects,
  doesNotThrow,
  doesNotReject,
  ifError,
  match,
  doesNotMatch,
  notDeepStrictEqual,
  notDeepEqual,
  strictEqual,
  equal,
  notStrictEqual,
  notEqual,
  deepStrictEqual,
  deepEqual,
  partialDeepStrictEqual,
}) as typeof nodeAssert.strict; // TODO: utils are strict by default so should be typed as strict!
