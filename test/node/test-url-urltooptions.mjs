// Source: https://github.com/nodejs/node/blob//v22.7.0/test/parallel/test-url-urltooptions.js

import assert from "node:assert";

import url from "../../src/runtime/node/url.ts";

// Test urlToHttpOptions
const urlObj = new URL("http://user:pass@foo.bar.com:21/aaa/zzz?l=24#test");
const opts = url.urlToHttpOptions(urlObj);
assert.strictEqual(opts instanceof URL, false);
assert.strictEqual(opts.protocol, "http:");
assert.strictEqual(opts.auth, "user:pass");
assert.strictEqual(opts.hostname, "foo.bar.com");
assert.strictEqual(opts.port, 21);
assert.strictEqual(opts.path, "/aaa/zzz?l=24");
assert.strictEqual(opts.pathname, "/aaa/zzz");
assert.strictEqual(opts.search, "?l=24");
assert.strictEqual(opts.hash, "#test");

const { hostname } = url.urlToHttpOptions(new URL("http://[::1]:21"));
assert.strictEqual(hostname, "::1");

// If a WHATWG URL object is copied, it is possible that the resulting copy
// contains the Symbols that Node uses for brand checking, but not the data
// properties, which are getters. Verify that urlToHttpOptions() can handle
// such a case.
const copiedUrlObj = { ...urlObj };
const copiedOpts = url.urlToHttpOptions(copiedUrlObj);
assert.strictEqual(copiedOpts instanceof URL, false);
assert.strictEqual(copiedOpts.protocol, undefined);
assert.strictEqual(copiedOpts.auth, undefined);
assert.strictEqual(copiedOpts.hostname, undefined);
assert.strictEqual(copiedOpts.port, Number.NaN);
assert.strictEqual(copiedOpts.path, "");
assert.strictEqual(copiedOpts.pathname, undefined);
assert.strictEqual(copiedOpts.search, undefined);
assert.strictEqual(copiedOpts.hash, undefined);
assert.strictEqual(copiedOpts.href, undefined);
