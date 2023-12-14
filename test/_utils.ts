import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";
import type { Environment } from "../src";

export function diff(a: string[] = [], b: string[] = []) {
  return a.filter((v) => !b.includes(v));
}

export type RuntimeTestResult = {
  nodeModules: Record<string, "<unenv>" | string[]>;
};

export function genRuntimeTest(env: Environment) {
  return `
  async function testRuntime() {
    const nodeModules = { ${Object.entries(env.alias)
      .filter(([id]) => id.startsWith("node:"))
      .map(([id, alias]) => {
        if (!alias.startsWith("node:")) {
          return `"${id}": "<unenv>",`;
        }
        return `"${id}": Object.keys(await import("${id}")),`;
      })
      .join("\n")}
    };
    return { nodeModules }
  }
`;
}

export function analyzeRuntimeTestResult(result: RuntimeTestResult) {
  const _require = createRequire(import.meta.url);

  const output: string[] = [];
  output.push("Feature | Status | Details");
  output.push("--- | --- | ---");

  for (const [name, _exports] of Object.entries(result.nodeModules)) {
    if (_exports === "<unenv>") {
      output.push(`${name} | ℹ️ unenv | Using unenv`);
      continue;
    }
    const nodeExports = Object.keys(_require(name));
    const diffExports = diff(nodeExports, _exports);
    if (diffExports.length > 0) {
      output.push(
        `${name} | ⚠️ partial | Missing: ${
          diffExports.length > 10
            ? `**${diffExports.length}** exports!!`
            : diffExports.map((i) => `\`${i}\``).join(", ")
        }`,
      );
    } else {
      output.push(`${name} | ✅ full | -`);
    }
  }

  console.log(output.join("\n"));
}

export function resolveTmp(path: string = "") {
  return fileURLToPath(new URL(`.tmp/${path}`, import.meta.url));
}
