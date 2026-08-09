import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import createDebug from "../src/runtime/npm/debug";

describe("runtime/npm/debug namespace matching", () => {
  const originalDebugEnv = process.env.DEBUG;

  beforeEach(() => {
    vi.spyOn(console, "debug").mockImplementation(() => {});
  });

  afterEach(() => {
    if (originalDebugEnv === undefined) {
      delete process.env.DEBUG;
    } else {
      process.env.DEBUG = originalDebugEnv;
    }
    vi.restoreAllMocks();
  });

  it("supports comma- and whitespace-separated namespaces", () => {
    process.env.DEBUG = "worker1, worker2";

    createDebug("worker1")("one");
    createDebug("worker2")("two");
    createDebug("worker3")("three");

    expect(console.debug).toHaveBeenCalledTimes(2);
    expect(console.debug).toHaveBeenNthCalledWith(1, "one");
    expect(console.debug).toHaveBeenNthCalledWith(2, "two");
  });

  it("supports wildcards and namespace exclusions", () => {
    process.env.DEBUG = "worker:*,-worker:internal";

    createDebug("worker:queue")("queue");
    createDebug("worker:internal")("internal");
    createDebug("worker")("parent");

    expect(console.debug).toHaveBeenCalledOnce();
    expect(console.debug).toHaveBeenCalledWith("queue");
  });

  it("matches complete namespaces instead of prefixes", () => {
    process.env.DEBUG = "worker";

    createDebug("worker")("exact");
    createDebug("work")("prefix");

    expect(console.debug).toHaveBeenCalledOnce();
    expect(console.debug).toHaveBeenCalledWith("exact");
  });

  it("treats regular expression characters as literals", () => {
    process.env.DEBUG = "worker.v1";

    createDebug("worker.v1")("exact");
    createDebug("workerXv1")("pattern");

    expect(console.debug).toHaveBeenCalledOnce();
    expect(console.debug).toHaveBeenCalledWith("exact");
  });

  it("re-evaluates a debugger when DEBUG changes", () => {
    const log = createDebug("worker");
    process.env.DEBUG = "worker";
    log("enabled");

    process.env.DEBUG = "other";
    log("disabled");

    expect(console.debug).toHaveBeenCalledOnce();
    expect(console.debug).toHaveBeenCalledWith("enabled");
  });
});
