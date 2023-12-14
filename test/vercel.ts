import { writeFileSync, mkdirSync } from "node:fs";
import { execSync } from "node:child_process";
import { env, nodeless, vercel } from "../src";
import { genRuntimeTest, resolveTmp } from "./_utils";

async function main() {
  const _env = env(nodeless, vercel);

  const outDir = "vercel/vercel_out";
  const funcDir = `${outDir}/output/functions/__test.func`;

  mkdirSync(resolveTmp(funcDir), { recursive: true });

  const testCode = `
${genRuntimeTest(_env)}
export default async function handleEvent(request, event) {
  const url = new URL(request.url);
  const result = await testRuntime();
  return new Response(JSON.stringify(result, null, 2), {
    headers: {
      "content-type": "application/json; charset=UTF-8",
    },
  });
}
  `;

  writeFileSync(resolveTmp(`${funcDir}/index.mjs`), testCode);

  writeFileSync(
    resolveTmp(`${funcDir}/.vc-config.json`),
    JSON.stringify(
      {
        runtime: "edge",
        entrypoint: "index.mjs",
      },
      null,
      2,
    ),
  );

  writeFileSync(
    resolveTmp(`${outDir}/config.json`),
    JSON.stringify(
      {
        version: 3,
        overrides: {},
        routes: [
          {
            src: "/(.*)",
            dest: "/__test",
          },
        ],
      },
      null,
      2,
    ),
  );

  writeFileSync(
    resolveTmp(`vercel/package.json`),
    JSON.stringify(
      {
        private: true,
        scripts: {
          build: "cp -vr vercel_out/* .vercel",
        },
      },
      null,
      2,
    ),
  );

  // mkdirSync(resolveTmp(`${outDir}/static`), { recursive: true });
  // writeFileSync(resolveTmp(`${outDir}/static/test.txt`), "hello world");

  await execSync(`bunx vercel`, {
    cwd: resolveTmp("vercel"),
    stdio: "inherit",
  });

  // analyzeRuntimeTestResult(result);
}

// eslint-disable-next-line unicorn/prefer-top-level-await
main();
