import { writeFileSync, mkdirSync } from "node:fs";
import { env, nodeless, cloudflare } from "../src";
import {
  RuntimeTestResult,
  analyzeRuntimeTestResult,
  genRuntimeTest,
  resolveTmp,
} from "./_utils";

async function main() {
  const _env = env(nodeless, cloudflare);

  const testCode = `
${genRuntimeTest(_env)}
export default {
  async fetch(request, env, ctx) {
    return new Response(JSON.stringify(await testRuntime(), null, 2), {
      headers: { "content-type": "application/json" }
    });
  },
};
`;

  mkdirSync(resolveTmp("."), { recursive: true });

  writeFileSync(resolveTmp("cloudflare.mjs"), testCode);

  const worker = await import("wrangler").then((w) =>
    w.unstable_dev(resolveTmp("cloudflare.mjs"), {
      compatibilityFlags: ["nodejs_compat"],
    }),
  );

  const result = (await worker
    .fetch("/")
    .then((r) => r.json())) as RuntimeTestResult;
  await worker.stop();

  analyzeRuntimeTestResult(result);
}

// eslint-disable-next-line unicorn/prefer-top-level-await
main();
