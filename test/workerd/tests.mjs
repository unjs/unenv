import assert from "node:assert";
import { createRequire } from "node:module";
import process from "node:process";

globalThis.process = process;

// ---- node:crypto ----

export const crypto_getRandomValues = {
  async test() {
    const crypto = await import("unenv/runtime/node/crypto");

    const array = new Uint32Array(10);
    crypto.getRandomValues(array);
    assert.strictEqual(array.length, 10);
    assert.ok(array.every((v) => v >= 0 && v <= 0xff_ff_ff_ff));

    assert.ok(crypto.randomBytes(10).every((v) => v >= 0 && v <= 0xff));
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

export const unenv_polyfills_buffer = {
  async test() {
    const buffer = await import("unenv/runtime/node/buffer");
    const Buffer = buffer.Buffer;
    assert.strictEqual(typeof buffer.isAscii, "function");
    assert.strictEqual(typeof buffer.isUtf8, "function");
    assert.strictEqual(buffer.btoa("hello"), "aGVsbG8=");
    assert.strictEqual(buffer.atob("aGVsbG8="), "hello");
    assert.strictEqual(typeof buffer.transcode, "function");
    assert.strictEqual(typeof buffer.File, "function");
    assert.strictEqual(typeof buffer.Blob, "function");
    assert.strictEqual(typeof buffer.INSPECT_MAX_BYTES, "number");
    assert.strictEqual(typeof buffer.resolveObjectURL, "function");
    assert.strictEqual(typeof Buffer.from, "function");
  },
};

export const workerd_implements_buffer = {
  async test() {
    const encoder = new TextEncoder();
    const buffer = await import("node:buffer");
    const Buffer = buffer.Buffer;
    assert.strictEqual(buffer.isAscii(encoder.encode("hello world")), true);
    assert.strictEqual(buffer.isUtf8(encoder.encode("Yağız")), true);
    assert.strictEqual(buffer.btoa("hello"), "aGVsbG8=");
    assert.strictEqual(buffer.atob("aGVsbG8="), "hello");
    {
      const dest = buffer.transcode(
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
    assert.ok(new buffer.File([], "file"));
    assert.ok(new buffer.Blob([]));
    assert.strictEqual(typeof buffer.INSPECT_MAX_BYTES, "number");
    assert.strictEqual(typeof buffer.resolveObjectURL, "function");
  },
};

// --- workerd modules

export const workerd_modules = {
  async test() {
    const require = createRequire("/");
    const modules = ["node:buffer", "node:sys"];
    for (const m of modules) {
      assert.strictEqual(await import(m), require(m));
    }
  },
};

// --- node:util

// TODO: pure js polyfills not working
// export const util_implements = {
//   async test() {
//     const { types } = await import("unenv/runtime/node/util");
//     assert.strictEqual(types.isExternal("hello world"), false);
//     assert.strictEqual(types.isAnyArrayBuffer(new ArrayBuffer(0)), true);
//   },
// };

// --- node:path

export const unenv_polyfills_path = {
  async test() {
    const pathWin32 = await import("unenv/runtime/node/path/win32");
    assert.strictEqual(typeof pathWin32.resolve, "function");
    // Note: unenv uses `unjs/pathe` which behavior differs from Node.js
    // See https://github.com/unjs/pathe
    assert.strictEqual(pathWin32.sep, "/");
    assert.strictEqual(pathWin32.delimiter, ":");
    const pathPosix = await import("unenv/runtime/node/path/posix");
    assert.strictEqual(typeof pathPosix.resolve, "function");
  },
};

export const workerd_path = {
  async test() {
    const pathWin32 = await import("node:path/win32");
    assert.strictEqual(pathWin32.sep, "\\");
    assert.strictEqual(pathWin32.delimiter, ";");
    const pathPosix = await import("node:path/posix");
    assert.strictEqual(pathPosix.sep, "/");
    assert.strictEqual(pathPosix.delimiter, ":");
  },
};

// --- node:dns

export const workerd_dns = {
  async test() {
    const dns = await import("node:dns");
    await new Promise((resolve, reject) => {
      dns.resolveTxt("nodejs.org", (error, results) => {
        if (error) {
          reject(error);
          return;
        }
        assert.ok(Array.isArray(results[0]));
        // TODO: check
        // assert.strictEqual(results.length, 1);
        // assert.ok(results[0][0].startsWith("v=spf1"));
        resolve(null);
      });
    });

    const dnsPromises = await import("node:dns/promises");
    const results = await dnsPromises.resolveCaa("google.com");
    assert.ok(Array.isArray(results));
    assert.strictEqual(results.length, 1);
    assert.strictEqual(typeof results[0].critical, "number");
    assert.strictEqual(results[0].critical, 0);
    assert.strictEqual(results[0].issue, "pki.goog");
  },
};

// --- node:timers

export const workerd_timers = {
  async test() {
    const timers = await import("node:timers");

    timers.clearTimeout(timers.setTimeout(() => null, 1000));
    timers.clearInterval(timers.setInterval(() => null, 1000));
    timers.clearImmediate(timers.setImmediate(() => null));

    timers.active(timers.setTimeout(() => null, 10));
    timers.active(undefined);

    timers.setImmediate(() => null);
  },
};

// --- node:net

export const workerd_net = {
  async test() {
    const net = await import("node:net");
    assert.strictEqual(typeof net.createConnection, "function");
    assert.throws(() => net.createServer(), /not implemented/);
  },
};
