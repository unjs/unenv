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

// --- node:buffer

export const buffer_implements = {
  async test() {
    const Buffer = await import("unenv/runtime/node/buffer");
    assert.ok(Buffer.isAscii("hello world"));
    assert.ok(Buffer.isUtf8("Yağız"));
    assert.strictEqual(Buffer.btoa("hello"), "aGVsbG8=");
    assert.strictEqual(Buffer.atob("aGVsbG8="), "hello");
    {
      const dest = Buffer.transcode(
        Buffer.from([
          0x74, 0x00, 0x1b, 0x01, 0x73, 0x00, 0x74, 0x00, 0x20, 0x00, 0x15,
          0x26,
        ]),
        "ucs2",
        "utf8",
      );
      assert.strictEqual(
        dest.toString(),
        Buffer.from("těst ☕", "utf8").toString(),
      );
    }
    assert.ok(new Buffer.File([], "file"));
    assert.ok(new Buffer.Blob([]));
  },
};
