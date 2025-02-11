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
    expect(stderr.replaceAll(/\(node:\d+\) /g, "")).toMatchInlineSnapshot(`
      "workerd/server/server.c++:4370: debug: [ TEST ] tests:crypto_getRandomValues
      workerd/server/server.c++:4378: debug: [ PASS ] tests:crypto_getRandomValues
      workerd/server/server.c++:4370: debug: [ TEST ] tests:unenv_polyfills_buffer
      workerd/server/server.c++:4378: debug: [ PASS ] tests:unenv_polyfills_buffer
      workerd/server/server.c++:4370: debug: [ TEST ] tests:unenv_polyfills_path
      workerd/server/server.c++:4378: debug: [ PASS ] tests:unenv_polyfills_path
      workerd/server/server.c++:4370: debug: [ TEST ] tests:url_parse
      [DeprecationWarning] [unenv] [node:url] DEP0169: \`url.parse()\` behavior is not standardized and prone to errors that have security implications. Use the WHATWG URL API instead. CVEs are not issued for \`url.parse()\` vulnerabilities.
      workerd/server/server.c++:4378: debug: [ PASS ] tests:url_parse
      workerd/server/server.c++:4370: debug: [ TEST ] tests:workerd_dns
      workerd/server/server.c++:4378: debug: [ PASS ] tests:workerd_dns
      workerd/server/server.c++:4370: debug: [ TEST ] tests:workerd_implements_buffer
      workerd/server/server.c++:4378: debug: [ PASS ] tests:workerd_implements_buffer
      workerd/server/server.c++:4370: debug: [ TEST ] tests:workerd_modules
      workerd/server/server.c++:4378: debug: [ PASS ] tests:workerd_modules
      workerd/server/server.c++:4370: debug: [ TEST ] tests:workerd_net
      workerd/server/server.c++:4378: debug: [ PASS ] tests:workerd_net
      workerd/server/server.c++:4370: debug: [ TEST ] tests:workerd_path
      workerd/server/server.c++:4378: debug: [ PASS ] tests:workerd_path
      workerd/server/server.c++:4370: debug: [ TEST ] tests:workerd_timers
      workerd/server/server.c++:4378: debug: [ PASS ] tests:workerd_timers
      "
    `);
  });
});
