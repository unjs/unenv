import { describe, expect, it } from "vitest";
import { x } from "tinyexec";

describe("tests in workerd", () => {
  it("run", async () => {
    const { exitCode, stderr } = await x("node", ["./workerd/main.mjs"], {
      nodeOptions: {
        cwd: __dirname,
      },
    });
    expect(exitCode).toBe(0);
    expect(stderr.replaceAll(/\(node:\d+\) |^.+: debug: | \(.+\)$/gm, ""))
      .toMatchInlineSnapshot(`
        "[ TEST ] tests:crypto_getRandomValues
        [ PASS ] tests:crypto_getRandomValues
        [ TEST ] tests:unenv_polyfills_buffer
        [ PASS ] tests:unenv_polyfills_buffer
        [ TEST ] tests:unenv_polyfills_path
        [ PASS ] tests:unenv_polyfills_path
        [ TEST ] tests:url_parse
        [DeprecationWarning] [unenv] [node:url] DEP0169: \`url.parse()\` behavior is not standardized and prone to errors that have security implications. Use the WHATWG URL API instead. CVEs are not issued for \`url.parse()\` vulnerabilities.
        [ PASS ] tests:url_parse
        [ TEST ] tests:workerd_dns
        [ PASS ] tests:workerd_dns
        [ TEST ] tests:workerd_implements_buffer
        [ PASS ] tests:workerd_implements_buffer
        [ TEST ] tests:workerd_modules
        [ PASS ] tests:workerd_modules
        [ TEST ] tests:workerd_net
        [ PASS ] tests:workerd_net
        [ TEST ] tests:workerd_path
        [ PASS ] tests:workerd_path
        [ TEST ] tests:workerd_timers
        [ PASS ] tests:workerd_timers
        "
      `);
  });
});
