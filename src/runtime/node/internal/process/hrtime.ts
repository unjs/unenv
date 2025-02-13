// https://nodejs.org/api/process.html#processhrtime
export const hrtime: NodeJS.Process["hrtime"] = /*@__PURE__*/ Object.assign(
  function hrtime(startTime?: [number, number] | undefined) {
    const now = Date.now();
    // millis to seconds
    const seconds = Math.trunc(now / 1000);
    // convert millis to nanos
    const nanos = (now % 1000) * 1_000_000;

    if (startTime) {
      let diffSeconds = seconds - startTime[0];
      let diffNanos = nanos - startTime[0];

      if (diffNanos < 0) {
        diffSeconds = diffSeconds - 1;
        diffNanos = 1_000_000_000 + diffNanos;
      }
      return [diffSeconds, diffNanos] as [number, number];
    }

    return [seconds, nanos] as [number, number];
  },
  {
    bigint: function bigint() {
      // Convert milliseconds to nanoseconds
      return BigInt(Date.now() * 1_000_000);
    },
  },
);
