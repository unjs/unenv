// Source: https://github.com/nodejs/node/blob//v22.7.0/test/parallel/test-querystring-multichar-separator.js

import assert from "node:assert";

import qs from "../../src/runtime/node/querystring.ts";

function check(actual, expected) {
  assert.ok(!(actual instanceof Object));
  assert.deepStrictEqual(
    Object.keys(actual).sort(),
    Object.keys(expected).sort(),
  );
  for (const key of Object.keys(expected)) {
    assert.deepStrictEqual(actual[key], expected[key]);
  }
}

check(qs.parse("foo=>bar&&bar=>baz", "&&", "=>"), { foo: "bar", bar: "baz" });

check(
  qs.stringify({ foo: "bar", bar: "baz" }, "&&", "=>"),
  "foo=>bar&&bar=>baz",
);

check(qs.parse("foo==>bar, bar==>baz", ", ", "==>"), {
  foo: "bar",
  bar: "baz",
});

check(
  qs.stringify({ foo: "bar", bar: "baz" }, ", ", "==>"),
  "foo==>bar, bar==>baz",
);
