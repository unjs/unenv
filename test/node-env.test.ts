import { describe, expect, it } from "vitest";
import { env } from "../src/runtime/node/internal/process/env";

describe("process.env polyfill", () => {
  it("env.TEST", () => {
    expect(env.TEST).toBe("true");
  });

  it("env.CUSTOM", () => {
    env.CUSTOM = "true";
    expect(env.CUSTOM).toBe("true");
  });

  it("Object.keys(env)", () => {
    expect(Object.keys(env)).toContain("TEST");
    expect(Object.keys(env)).toContain("CUSTOM");
  });

  it("Object.entries(env)", () => {
    expect(Object.entries(env)).toContainEqual(["TEST", "true"]);
  });
});
