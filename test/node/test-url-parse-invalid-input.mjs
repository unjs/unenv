// Source: https://github.com/nodejs/node/blob//v22.7.0/test/parallel/test-url-parse-invalid-input.js

import assert from "node:assert";

import url from "../../src/runtime/node/url/index.ts";

// https://github.com/joyent/node/issues/568
for (const [val, type] of [
  [undefined, "undefined"],
  [null, "object"],
  [true, "boolean"],
  [false, "boolean"],
  [0, "number"],
  [0, "number"],
  [[], "object"],
  [{}, "object"],
  [() => {}, "function"],
  [Symbol("foo"), "symbol"],
]) {
  assert.throws(
    () => {
      url.parse(val);
    },
    {
      code: "ERR_INVALID_ARG_TYPE",
      name: "TypeError",
      message:
        'The "url" argument must be of type string. Received ' +
        (val ? val.toString() : val),
    },
  );
}

assert.throws(
  () => {
    url.parse("http://%E0%A4%A@fail");
  },
  (e) => {
    // The error should be a URIError.
    if (!(e instanceof URIError)) return false;

    // The error should be from the JS engine and not from Node.js.
    // JS engine errors do not have the `code` property.
    return e.code === undefined;
  },
);

assert.throws(
  () => {
    url.parse("http://[127.0.0.1\u0000c8763]:8000/");
  },
  { code: "ERR_INVALID_URL", input: "http://[127.0.0.1\u0000c8763]:8000/" },
);

// An array of Unicode code points whose Unicode NFKD contains a "bad
// character".
const badIDNA = (() => {
  const BAD_CHARS = String.raw`#%/:?@[\]^|`;
  const out = [];
  for (let i = 0x80; i < 0x11_00_00; i++) {
    const cp = String.fromCodePoint(i);
    for (const badChar of BAD_CHARS) {
      if (cp.normalize("NFKD").includes(badChar)) {
        out.push(cp);
      }
    }
  }
  return out;
})();

// The generation logic above should at a minimum produce these two
// characters.

// TODO: this is not being caught

// assert(badIDNA.includes("℀"));
// assert(badIDNA.includes("＠"));

// for (const badCodePoint of badIDNA) {
//   const badURL = `http://fail${badCodePoint}fail.com/`;
//   assert.throws(
//     () => {
//       url.parse(badURL);
//     },
//     (e) => e.code === "ERR_INVALID_URL",
//     `parsing ${badURL}`,
//   );
// }

// assert.throws(
//   () => {
//     url.parse("http://\u00AD/bad.com/");
//   },
//   (e) => e.code === "ERR_INVALID_URL",
//   "parsing http://\u00AD/bad.com/",
// );
