import { describe, expect, it } from "vitest";
import { defineEnv } from "../src";
import { builtinModules } from "node:module";
import { existsSync } from "node:fs";

describe("defineEnv", () => {
  it("defaults", () => {
    const { env } = defineEnv();
    expect(env).toMatchObject({
      alias: {},
      external: [],
      inject: {},
      polyfill: [],
    });
  });

  it("overrides", () => {
    const { env } = defineEnv({
      nodeCompat: true,
      overrides: { alias: { foo: "bar" } },
    });
    expect(env.alias.foo).toBe("bar");
  });

  describe("nodeCompat", () => {
    it("has aliases for all builtinModules", () => {
      const { env } = defineEnv({ nodeCompat: true });
      for (const id of builtinModules) {
        expect(env.alias[id]).toBeDefined();
      }
    });
  });

  describe("resolvePath", () => {
    it("resolves all nodeCompat paths", () => {
      const { env } = defineEnv({ nodeCompat: true, resolve: true });
      for (const path of Object.values(env.alias)) {
        if (path.startsWith("node:")) {
          continue; // recursive
        }
        expect(existsSync(path)).toBe(true);
      }
      for (const path of env.polyfill) {
        expect(existsSync(path)).toBe(true);
      }
      for (const inject of Object.values(env.inject)) {
        expect(existsSync(Array.isArray(inject) ? inject[0] : inject)).toBe(
          true,
        );
      }
    });
  });
});
