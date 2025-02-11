import { describe, expect, it } from "vitest";
import noop from "../src/runtime/mock/noop";
import empty from "../src/runtime/mock/empty";
import proxy from "../src/runtime/mock/proxy";

describe("mock utils", () => {
  describe("noop", () => {
    it("noop", () => {
      expect(noop()).toBeUndefined();
    });
  });

  describe("empty", () => {
    it("empty", () => {
      expect(Object.keys(empty)).toHaveLength(0);
      expect(empty.__unenv__).toBe(true);
      expect(Object.isFrozen(empty)).toBe(true);
      expect(Object.getPrototypeOf(empty)).toBe(null);
    });
  });

  describe("proxy", () => {
    it("nesting", () => {
      const p = new proxy.foo.bar();
      expect(p.__unenv__).toBe(true);
    });

    it("calling", () => {
      const p = proxy();
      expect(p.caller).toBe(null);
      expect(proxy().__unenv__).toBe(true);
    });

    it("overrides", () => {
      const p = proxy.__createMock__("foo", { a: 1 });
      expect(p.a).toBe(1);
    });

    describe("promises", () => {
      it(".then", async () => {
        const p = proxy();
        const resolved = await p.then(() => true);
        expect(resolved).toBe(true);
      });

      it(".catch", async () => {
        const p = proxy();
        let caught = false;
        const res = await p
          .catch(() => {
            caught = true;
          })
          .then(() => true);
        expect(res).toBe(true);
        expect(caught).toBe(false);
      });

      it(".finally", async () => {
        const p = proxy();
        let finallyCalled = false;
        await p.finally(() => {
          finallyCalled = true;
        });
        expect(finallyCalled).toBe(true);
      });
    });
  });
});
