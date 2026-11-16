import { describe, expect, it } from "vitest";
import { existsSync } from "node:fs";
import { defineEnv } from "../src";

describe("npm shims", () => {
  it("resolves all npmShims paths", () => {
    const { env } = defineEnv({ npmShims: true, resolve: true });
    for (const [from, to] of Object.entries(env.alias)) {
      expect(existsSync(to), `Alias: ${from} ~> ${to}`).toBe(true);
    }
  });

  it("safer-buffer", async () => {
    const { env } = defineEnv({ npmShims: true });
    expect(env.alias["safer-buffer"]).toBe("unenv/npm/safer-buffer");

    const { default: safer, Buffer } = await import(
      "../src/runtime/npm/safer-buffer"
    );
    expect(safer.Buffer).toBe(Buffer);
    expect(safer.Buffer.from("unenv").toString("hex")).toBe("756e656e76");
    expect(safer.Buffer.alloc(3, 1)).toEqual(Buffer.from([1, 1, 1]));
    expect(safer.constants.MAX_LENGTH).toBe(safer.kMaxLength);
  });
});
