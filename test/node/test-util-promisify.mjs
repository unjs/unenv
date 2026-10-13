import assert from "node:assert/strict";
import test from "node:test";
import { setTimeout } from "node:timers";
import { promisify as nodePromisify } from "node:util";
import { promisify } from "../../src/runtime/node/util.ts";

test("promisify honors globally registered custom implementations", async () => {
  function operation(value, callback) {
    callback(null, `callback:${value}`);
  }
  operation[Symbol.for("nodejs.util.promisify.custom")] = async (value) =>
    `custom:${value}`;

  assert.equal(await promisify(operation)("input"), "custom:input");
  assert.equal(promisify(operation), nodePromisify(operation));
});

test("promisify honors custom implementations on Node.js functions", async () => {
  assert.equal(await promisify(setTimeout)(0, "done"), "done");
});

test("custom implementations registered through unenv work with Node.js", async () => {
  function operation(value, callback) {
    callback(null, `callback:${value}`);
  }
  operation[promisify.custom] = async (value) => `custom:${value}`;

  assert.equal(await nodePromisify(operation)("input"), "custom:input");
});

test("promisify still supports ordinary callbacks", async () => {
  function operation(value, callback) {
    callback(null, value);
  }

  assert.equal(await promisify(operation)("input"), "input");
});
