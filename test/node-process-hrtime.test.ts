import { afterEach, describe, expect, it, vi } from "vitest";

import { hrtime } from "../src/runtime/node/internal/process/hrtime";

describe("process.hrtime", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("reports [seconds, nanoseconds] since the epoch", () => {
    vi.useFakeTimers();
    vi.setSystemTime(1_000_100);

    expect(hrtime()).toEqual([1000, 100_000_000]);
  });

  it("measures the elapsed time from a start tuple", () => {
    vi.useFakeTimers();
    vi.setSystemTime(1_000_100);
    const startTime = hrtime();

    vi.setSystemTime(1_000_600);
    expect(hrtime(startTime)).toEqual([0, 500_000_000]);
  });

  it("borrows a second when the nanosecond part wraps", () => {
    vi.useFakeTimers();
    vi.setSystemTime(1_000_900);
    const startTime = hrtime();

    vi.setSystemTime(1_001_100);
    expect(hrtime(startTime)).toEqual([0, 200_000_000]);
  });
});
