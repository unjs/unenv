import assert from "node:assert";

import { hrtime } from "../../src/runtime/node/internal/process/hrtime.ts";

const originalNow = Date.now;
const mockNow = (ms) => {
  Date.now = () => ms;
};

try {
  mockNow(1_000_100);
  const start = hrtime();
  assert.deepStrictEqual(start, [1000, 100_000_000]);

  // Same second
  mockNow(1_000_600);
  assert.deepStrictEqual(hrtime(start), [0, 500_000_000]);

  // Across a second boundary with a smaller nanosecond part
  mockNow(1_002_050);
  assert.deepStrictEqual(hrtime(start), [1, 950_000_000]);

  // Zero elapsed time
  mockNow(1_000_100);
  assert.deepStrictEqual(hrtime(start), [0, 0]);
} finally {
  Date.now = originalNow;
}
