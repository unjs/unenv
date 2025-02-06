// Source: https://github.com/nodejs/node/blob//v22.7.0/test/parallel/test-url-format-invalid-input.js

import assert from "node:assert";

import url from "../../src/runtime/node/url.ts";

const throwsObjsAndReportTypes = [
  undefined,
  null,
  true,
  false,
  0,
  function () {},
  Symbol("foo"),
];

for (const urlObject of throwsObjsAndReportTypes) {
  assert.throws(
    () => {
      url.format(urlObject);
    },
    {
      code: "ERR_INVALID_ARG_TYPE",
      name: "TypeError",
      message:
        'The "urlObject" argument must be of type Object or string. Received ' +
        (urlObject ? urlObject.toString() : urlObject),
    },
  );
}
assert.strictEqual(url.format(""), "");
assert.strictEqual(url.format({}), "");
