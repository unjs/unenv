import { describe, expect, it } from "vitest";
import { defineEnv } from "../src";
import { builtinModules } from "node:module";

describe("defineEnv", () => {
  it("default behavior", () => {
    const { env } = defineEnv();
    expect(env).toMatchObject({
      alias: {},
      external: [],
      inject: {},
      polyfill: [],
    });
  });

  describe("nodeCompat", () => {
    it("has aliases for all builtinModules", () => {
      const { env } = defineEnv({ nodeCompat: true });
      for (const id of builtinModules) {
        expect(env.alias[id]).toBeDefined();
      }
    });
  });
});
