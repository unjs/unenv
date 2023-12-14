import { writeFileSync, mkdirSync } from "node:fs";
import { execSync } from "node:child_process";
import { env, nodeless, vercel } from "../src";
import {
  RuntimeTestResult,
  analyzeRuntimeTestResult,
  genRuntimeTest,
  resolveTmp,
} from "./_utils";

async function main() {
  const _env = env(nodeless, vercel);

  const outDir = "vercel/output";
  const funcDir = `${outDir}/functions/__test.func`;

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
        name: "vercel-edge-test",
        private: true,
        scripts: {
          build: "mkdir -p .vercel && cp -vr output .vercel",
        },
      },
      null,
      2,
    ),
  );

  await execSync(`bunx vercel --prod`, {
    cwd: resolveTmp("vercel"),
    stdio: "inherit",
  });

  const deployURL = "https://unenv.vercel.app/";

  const result = (await fetch("https://unenv.vercel.app/").then((r) =>
    r.json(),
  )) as RuntimeTestResult;

  analyzeRuntimeTestResult(result);
}

// eslint-disable-next-line unicorn/prefer-top-level-await
main();
