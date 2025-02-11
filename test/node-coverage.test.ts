import { describe, expect, it } from "vitest";
import { x } from "tinyexec";

describe("node coverage", () => {
  it("collect and check", async () => {
    const { exitCode, stdout, stderr } = await x(
      "node",
      [
        "--disable-warning=ExperimentalWarning",
        "--experimental-strip-types",
        "./node-coverage.ts",
        "--json",
      ],
      {
        nodeOptions: {
          cwd: __dirname,
        },
      },
    );
    expect(exitCode).toBe(0);
    expect(stderr.replaceAll(/\(node:\d+\) /g, "")).toMatchInlineSnapshot(`
      "[DEP0040] DeprecationWarning: The \`punycode\` module is deprecated. Please use a userland alternative instead.
      (Use \`node --trace-deprecation ...\` to show where the warning was created)
      [DEP0025] DeprecationWarning: sys is deprecated. Use util instead.
      "
    `);
    const coverage = JSON.parse(stdout);
    for (const mod of coverage) {
      expect(mod.unsupportedExports, mod.name).length(0);
    }
  });
});
