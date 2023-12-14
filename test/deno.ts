import { writeFileSync, mkdirSync, readFileSync } from "node:fs";
import { execSync } from "node:child_process";
import { env, nodeless, deno } from "../src";
import {
  RuntimeTestResult,
  analyzeRuntimeTestResult,
  genRuntimeTest,
  resolveTmp,
} from "./_utils";

async function main() {
  const _env = env(nodeless, deno);

  const testCode = `
  ${genRuntimeTest(_env)}
  const result = await testRuntime();
  await Deno.writeFile("deno.json", new TextEncoder().encode(JSON.stringify(result, null, 2)));
  `;

  mkdirSync(resolveTmp(), { recursive: true });

  writeFileSync(resolveTmp("deno.mjs"), testCode);

  execSync("deno run -A deno.mjs", {
    cwd: resolveTmp(),
    stdio: "inherit",
  });

  const result = JSON.parse(
    readFileSync(resolveTmp("deno.json"), "utf8"),
  ) as RuntimeTestResult;

  analyzeRuntimeTestResult(result);
}

// eslint-disable-next-line unicorn/prefer-top-level-await
main();
