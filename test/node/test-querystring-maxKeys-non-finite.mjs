// Source: https://github.com/nodejs/node/blob//v22.7.0/test/parallel/test-querystring-maxKeys-non-finite.js

// This test was originally written to test a regression
// that was introduced by
// https://github.com/nodejs/node/pull/2288#issuecomment-179543894

import assert from "node:assert";

import qs from "../../src/runtime/node/querystring/index.ts";

// Taken from express-js/body-parser
// https://github.com/expressjs/body-parser/blob/ed25264fb494cf0c8bc992b8257092cd4f694d5e/test/urlencoded.js#L636-L651
function createManyParams(count) {
  let str = "";

  if (count === 0) {
    return str;
  }

  str += "0=0";

  for (let i = 1; i < count; i++) {
    const n = i.toString(36);
    str += `&${n}=${n}`;
  }

  return str;
}

const count = 10_000;
const originalMaxLength = 1000;
const params = createManyParams(count);

// thealphanerd
// 27def4f introduced a change to parse that would cause Infinity
// to be passed to String.prototype.split as an argument for limit
// In this instance split will always return an empty array
// this test confirms that the output of parse is the expected length
// when passed Infinity as the argument for maxKeys
const resultInfinity = qs.parse(params, undefined, undefined, {
  maxKeys: Infinity,
});
const resultNaN = qs.parse(params, undefined, undefined, {
  maxKeys: Number.NaN,
});
const resultInfinityString = qs.parse(params, undefined, undefined, {
  maxKeys: "Infinity",
});
const resultNaNString = qs.parse(params, undefined, undefined, {
  maxKeys: "NaN",
});

// Non Finite maxKeys should return the length of input
assert.strictEqual(Object.keys(resultInfinity).length, count);
assert.strictEqual(Object.keys(resultNaN).length, count);
// Strings maxKeys should return the maxLength
// defined by parses internals
assert.strictEqual(Object.keys(resultInfinityString).length, originalMaxLength);
assert.strictEqual(Object.keys(resultNaNString).length, originalMaxLength);
