import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import createDebug from "../src/runtime/npm/debug";

// Tests for the `debug` package polyfill's namespace matching. Regression
// coverage for #546 — the previous implementation only enabled a debugger
// when DEBUG was `*` or startsWith() the namespace, so comma-separated lists
// (`worker1,worker2`) and wildcard patterns (`worker:*`) were silently
// dropped. The polyfill now mirrors the upstream `debug` package's
// glob-with-negation parsing.

describe("runtime/npm/debug namespace matching", () => {
  let consoleDebug: ReturnType<typeof vi.spyOn>;
  let originalDebugEnv: string | undefined;

  beforeEach(() => {
    originalDebugEnv = process.env.DEBUG;
    consoleDebug = vi.spyOn(console, "debug").mockImplementation(() => {});
  });

  afterEach(() => {
    if (originalDebugEnv === undefined) {
      delete process.env.DEBUG;
    } else {
      process.env.DEBUG = originalDebugEnv;
    }
    consoleDebug.mockRestore();
  });

  it("emits when DEBUG is '*'", () => {
    process.env.DEBUG = "*";
    createDebug("worker:db")("hello");
    expect(consoleDebug).toHaveBeenCalledWith("hello");
  });

  it("emits when DEBUG matches the namespace exactly", () => {
    process.env.DEBUG = "worker";
    createDebug("worker")("hello");
    expect(consoleDebug).toHaveBeenCalledWith("hello");
  });

  it("does not emit when DEBUG is unset", () => {
    delete process.env.DEBUG;
    createDebug("worker")("hello");
    expect(consoleDebug).not.toHaveBeenCalled();
  });

  it("supports comma-separated namespaces", () => {
    process.env.DEBUG = "worker1,worker2";
    createDebug("worker1")("a");
    createDebug("worker2")("b");
    createDebug("worker3")("c");
    expect(consoleDebug).toHaveBeenCalledTimes(2);
    expect(consoleDebug).toHaveBeenNthCalledWith(1, "a");
    expect(consoleDebug).toHaveBeenNthCalledWith(2, "b");
  });

  it("supports whitespace-separated namespaces", () => {
    process.env.DEBUG = "alpha  beta";
    createDebug("alpha")("a");
    createDebug("beta")("b");
    createDebug("gamma")("c");
    expect(consoleDebug).toHaveBeenCalledTimes(2);
  });

  it("supports namespace wildcards via *", () => {
    process.env.DEBUG = "worker:*";
    createDebug("worker:db")("a");
    createDebug("worker:queue")("b");
    createDebug("other")("c");
    expect(consoleDebug).toHaveBeenCalledTimes(2);
    expect(consoleDebug).toHaveBeenNthCalledWith(1, "a");
    expect(consoleDebug).toHaveBeenNthCalledWith(2, "b");
  });

  it("does not emit when the wildcard pattern excludes the namespace", () => {
    // `worker:*` must NOT match the bare `worker` namespace (anchor check).
    process.env.DEBUG = "worker:*";
    createDebug("worker")("hello");
    expect(consoleDebug).not.toHaveBeenCalled();
  });

  it("supports negation with leading '-'", () => {
    process.env.DEBUG = "worker:*,-worker:internal";
    createDebug("worker:db")("a");
    createDebug("worker:internal")("b");
    expect(consoleDebug).toHaveBeenCalledTimes(1);
    expect(consoleDebug).toHaveBeenCalledWith("a");
  });

  it("anchors patterns so a prefix doesn't accidentally match longer namespaces", () => {
    // The original impl used String#startsWith which would have falsely
    // matched `worker` when DEBUG was `work`. With proper anchoring the
    // shorter pattern can only match the shorter namespace.
    process.env.DEBUG = "work";
    createDebug("worker")("hello");
    expect(consoleDebug).not.toHaveBeenCalled();
  });

  it("re-reads DEBUG when it changes between calls", () => {
    process.env.DEBUG = "worker";
    const log = createDebug("worker");
    log("first");
    expect(consoleDebug).toHaveBeenCalledTimes(1);

    process.env.DEBUG = "other";
    log("second");
    expect(consoleDebug).toHaveBeenCalledTimes(1); // unchanged
  });
});

describe("runtime/npm/debug .extend", () => {
  it("joins with ':' by default to match the upstream debug package", () => {
    const child = createDebug("app").extend("worker");
    expect(child.namespace).toBe("app:worker");
  });

  it("honours a caller-supplied delimiter", () => {
    const child = createDebug("app").extend("worker", "/");
    expect(child.namespace).toBe("app/worker");
  });
});
