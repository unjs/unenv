import { writeFileSync, mkdirSync, readFile, readFileSync } from "node:fs";
import { execSync } from "node:child_process";
import { createRequire } from "node:module";
import consola from "consola";
import { colors } from "consola/utils";
import { env, nodeless, deno } from "../src";

const denoConfig = env(nodeless, deno);

const testCode = `
const nodeImports = { ${Object.entries(denoConfig.alias)
  .filter(([id]) => id.startsWith("node:"))
  .map(([id, alias]) => {
    if (!alias.startsWith("node:")) {
      return `"${id}": "<unenv>",`;
    }
    return `"${id}": Object.keys(await import("${id}")),`;
  })
  .join("\n")}
};

const support = {
  nodeImports
}

await Deno.writeFile(".tmp/deno-support.json", new TextEncoder().encode(JSON.stringify(support, null, 2)));
`;

mkdirSync(new URL(".tmp", import.meta.url), { recursive: true });

writeFileSync(new URL(".tmp/deno-test.mjs", import.meta.url), testCode);

execSync("deno run -A .tmp/deno-test.mjs", {
  cwd: new URL(".", import.meta.url),
  stdio: "inherit",
});

const { nodeImports } = JSON.parse(
  readFileSync(new URL(".tmp/deno-support.json", import.meta.url), "utf8"),
) as { nodeImports: Record<string, "<unenv>" | string[]> };

const _require = createRequire(import.meta.url);

const output: string[] = [];
output.push("Feature | Status | Details");
output.push("--- | --- | ---");

for (const [name, denoExports] of Object.entries(nodeImports)) {
  if (denoExports === "<unenv>") {
    output.push(`${name} | ℹ️ | Using unenv`);
    continue;
  }
  const nodeExports = Object.keys(_require(name));
  const diffExports = diff(nodeExports, denoExports);
  if (diffExports.length > 0) {
    output.push(
      `${name} | ⚠️ Partial support | Missing: ${
        diffExports.length > 10
          ? `${diffExports.length} exports`
          : diffExports.map((i) => `\`${i}\``).join(", ")
      }`,
    );
  } else {
    output.push(`${name} | ✅ Full support | -`);
  }
}

console.log(output.join("\n"));

function diff(a: string[] = [], b: string[] = []) {
  return a.filter((v) => !b.includes(v));
}
