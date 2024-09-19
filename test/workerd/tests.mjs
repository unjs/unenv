import assert from "node:assert";
import process from "node:process";

globalThis.process = process;

// ---- node:crypto ----

export const crypto_getRandomValues = {
  async test() {
    const crypto = await import("unenv/runtime/node/crypto");

    const array = new Uint32Array(10);
    crypto.getRandomValues(array);
    assert.strictEqual(array.length, 10);
    assert(array.every((v) => v >= 0 && v <= 0xff_ff_ff_ff));
  },
};

// ---- node:url ----

export const url_parse = {
  async test() {
    const url = await import("unenv/runtime/node/url");

    assert.throws(
      () => {
        url.parse("http://[127.0.0.1\u0000c8763]:8000/");
      },
      { code: "ERR_INVALID_URL", input: "http://[127.0.0.1\u0000c8763]:8000/" },
    );
  },
};
