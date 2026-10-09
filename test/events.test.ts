import { describe, expect, it } from "vitest";
import { EventEmitter, on } from "../src/runtime/node/events";
import { build } from "esbuild";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "pathe";
import { execSync } from "node:child_process";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";

const _dirname = dirname(fileURLToPath(import.meta.url));

describe("events", () => {
  it("emits and receives events", () => {
    const ee = new EventEmitter();
    const calls: number[] = [];
    ee.on("test", (val: number) => {
      calls.push(val);
    });
    ee.emit("test", 1);
    ee.emit("test", 2);
    expect(calls).toEqual([1, 2]);
  });

  it("supports async iterator via on()", async () => {
    const ee = new EventEmitter();
    const iterator = on(ee, "data");

    expect(typeof iterator[Symbol.asyncIterator]).toBe("function");
    expect(iterator[Symbol.asyncIterator]()).toBe(iterator);
    expect(typeof iterator.next).toBe("function");
    expect(typeof iterator.return).toBe("function");
    expect(typeof iterator.throw).toBe("function");

    setTimeout(() => {
      ee.emit("data", "hello");
      ee.emit("data", "world");
    }, 10);

    const received: string[] = [];
    for await (const [val] of iterator) {
      received.push(val);
      if (received.length === 2) {
        break;
      }
    }

    expect(received).toEqual(["hello", "world"]);
  });

  it("can be bundled targeting below ES2018 without crashing on module evaluation", async () => {
    const tempDir = mkdtempSync(resolve(tmpdir(), "unenv-events-test-"));
    const entryFile = resolve(tempDir, "entry.mjs");
    const outFile = resolve(tempDir, "out.mjs");

    const eventsModulePath = resolve(
      _dirname,
      "../src/runtime/node/events.ts",
    ).replace(/\\/g, "/");

    writeFileSync(
      entryFile,
      `
import { EventEmitter, on } from "${eventsModulePath}";

async function run() {
  const ee = new EventEmitter();
  let received = null;
  const iterator = on(ee, "msg");

  if (typeof iterator[Symbol.asyncIterator] !== "function") {
    throw new Error("Missing Symbol.asyncIterator on iterator");
  }

  setTimeout(() => {
    ee.emit("msg", "success");
  }, 10);

  for await (const [val] of iterator) {
    received = val;
    break;
  }

  if (received !== "success") {
    throw new Error("Unexpected value: " + received);
  }

  console.log("ES2015_TEST_PASSED");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
`,
    );

    try {
      await build({
        entryPoints: [entryFile],
        bundle: true,
        target: "es2015",
        format: "esm",
        outfile: outFile,
        plugins: [
          {
            name: "external-node",
            setup(b) {
              b.onResolve({ filter: /^node:/ }, (args) => ({
                path: args.path,
                external: true,
              }));
            },
          },
        ],
      });

      const stdout = execSync(`"${process.execPath}" "${outFile}"`, {
        encoding: "utf8",
        timeout: 5000,
      });
      expect(stdout).toContain("ES2015_TEST_PASSED");
    } finally {
      rmSync(tempDir, { recursive: true, force: true });
    }
  });
});
