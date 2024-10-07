// Source: https://github.com/nodejs/node/blob//v22.7.0/test/parallel/test-url-parse-query.js

import assert from "node:assert";

import url from "../../src/runtime/node/url/index.ts";

function createWithNoPrototype(properties = []) {
  const noProto = { __proto__: null };
  for (const property of properties) {
    noProto[property.key] = property.value;
  }
  return noProto;
}

function check(actual, expected) {
  assert.notStrictEqual(Object.getPrototypeOf(actual), Object.prototype);
  assert.deepStrictEqual(
    Object.keys(actual).sort(),
    Object.keys(expected).sort(),
  );
  for (const key of Object.keys(expected)) {
    assert.deepStrictEqual(actual[key], expected[key]);
  }
}

const parseTestsWithQueryString = {
  "/foo/bar?baz=quux#frag": {
    href: "/foo/bar?baz=quux#frag",
    hash: "#frag",
    search: "?baz=quux",
    query: createWithNoPrototype([{ key: "baz", value: "quux" }]),
    pathname: "/foo/bar",
    path: "/foo/bar?baz=quux",
  },
  "http://example.com": {
    href: "http://example.com/",
    protocol: "http:",
    slashes: true,
    host: "example.com",
    hostname: "example.com",
    query: createWithNoPrototype(),
    search: null,
    pathname: "/",
    path: "/",
  },
  "/example": {
    protocol: null,
    slashes: null,
    auth: undefined,
    host: null,
    port: null,
    hostname: null,
    hash: null,
    search: null,
    query: createWithNoPrototype(),
    pathname: "/example",
    path: "/example",
    href: "/example",
  },
  "/example?query=value": {
    protocol: null,
    slashes: null,
    auth: undefined,
    host: null,
    port: null,
    hostname: null,
    hash: null,
    search: "?query=value",
    query: createWithNoPrototype([{ key: "query", value: "value" }]),
    pathname: "/example",
    path: "/example?query=value",
    href: "/example?query=value",
  },
};
for (const u in parseTestsWithQueryString) {
  const actual = url.parse(u, true);
  const expected = Object.assign(new url.Url(), parseTestsWithQueryString[u]);
  for (const i in actual) {
    if (actual[i] === null && expected[i] === undefined) {
      expected[i] = null;
    }
  }

  const properties = Object.keys(actual).sort();
  assert.deepStrictEqual(properties, Object.keys(expected).sort());
  for (const property of properties) {
    if (property === "query") {
      check(actual[property], expected[property]);
    } else {
      assert.deepStrictEqual(actual[property], expected[property]);
    }
  }
}
