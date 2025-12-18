import { describe, expect, it } from "vitest";
import { AsyncLocalStorage } from "../src/runtime/node/async_hooks";

describe("AsyncLocalStorage", () => {
  describe("run", () => {
    it("works with sync callback", () => {
      const store = new AsyncLocalStorage<{ value: string }>();
      const result = store.run(
        { value: "sync" },
        () => store.getStore()?.value,
      );
      expect(result).toBe("sync");
    });

    it("works with async callback", async () => {
      const store = new AsyncLocalStorage<{ value: string }>();
      const result = await store.run({ value: "async" }, async () => {
        await Promise.resolve();
        return store.getStore()?.value;
      });
      expect(result).toBe("async");
    });

    it("works with nested async", async () => {
      const store = new AsyncLocalStorage<{ value: string }>();
      const result = await store.run({ value: "outer" }, async () => {
        const inner = await store.run({ value: "inner" }, async () => {
          await Promise.resolve();
          return store.getStore()?.value;
        });
        expect(inner).toBe("inner");
        return store.getStore()?.value;
      });
      expect(result).toBe("outer");
    });

    it("restores store on sync throw", () => {
      const store = new AsyncLocalStorage<{ value: string }>();
      store.run({ value: "outer" }, () => {
        expect(() =>
          store.run({ value: "inner" }, () => {
            throw new Error("sync error");
          }),
        ).toThrow("sync error");
        expect(store.getStore()?.value).toBe("outer");
      });
    });

    it("restores store on async reject", async () => {
      const store = new AsyncLocalStorage<{ value: string }>();
      await store.run({ value: "outer" }, async () => {
        await expect(
          store.run({ value: "inner" }, async () => {
            await Promise.resolve();
            throw new Error("async error");
          }),
        ).rejects.toThrow("async error");
        expect(store.getStore()?.value).toBe("outer");
      });
    });

    it("works with thenable without finally", async () => {
      const store = new AsyncLocalStorage<{ value: string }>();
      /* eslint-disable unicorn/no-thenable */
      const thenable = {
        then: (resolve: (v: string) => void) => resolve("thenable"),
      };
      /* eslint-enable unicorn/no-thenable */
      const result = await store.run({ value: "test" }, () => thenable);
      expect(result).toBe("thenable");
    });
  });

  describe("exit", () => {
    it("clears store in sync callback", () => {
      const store = new AsyncLocalStorage<{ value: string }>();
      store.run({ value: "outer" }, () => {
        const result = store.exit(() => store.getStore());
        expect(result).toBeUndefined();
        expect(store.getStore()?.value).toBe("outer");
      });
    });

    it("clears store in async callback", async () => {
      const store = new AsyncLocalStorage<{ value: string }>();
      await store.run({ value: "outer" }, async () => {
        const result = await store.exit(async () => {
          await Promise.resolve();
          return store.getStore();
        });
        expect(result).toBeUndefined();
        expect(store.getStore()?.value).toBe("outer");
      });
    });
  });
});
