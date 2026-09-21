import { describe, expect, it } from "vitest";
import { build } from "esbuild";
import { EventEmitter } from "../src/runtime/node/events";

describe("node:events", () => {
  it("EventEmitter emits and listens to events", () => {
    const ee = new EventEmitter();
    let called = false;
    ee.on("test", () => {
      called = true;
    });
    ee.emit("test");
    expect(called).toBe(true);
  });

  it("evaluates without error when bundled below ES2018 (#565)", async () => {
    const res = await build({
      entryPoints: ["src/runtime/node/events.ts"],
      bundle: true,
      target: "es2015",
      format: "esm",
      write: false,
      external: ["node:*"],
    });

    const dataUrl =
      "data:text/javascript;base64," +
      Buffer.from(res.outputFiles[0].text).toString("base64");
    const mod = await import(dataUrl);
    expect(typeof mod.EventEmitter).toBe("function");
  });
});
