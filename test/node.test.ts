import { describe, expect, it } from "vitest";
import { x } from "tinyexec";

describe("tests in node", () => {
  it("run", async () => {
    const { exitCode, stderr, stdout } = await x(
      "node",
      [
        "--disable-warning=ExperimentalWarning",
        "--experimental-strip-types",
        "--test",
        "./node/test-*",
      ],
      {
        nodeOptions: {
          cwd: __dirname,
        },
      },
    );
    expect(exitCode).toBe(0);
    expect(stderr).toBe("");
    expect(stdout).include("fail 0");
  });
});
