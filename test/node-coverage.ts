import { builtinModules } from "node:module";
import { colorize } from "consola/utils";
import { mkdir, writeFile } from "node:fs/promises";

const modulesCoverage = [] as {
  name: string;
  supportedExports: string[];
  unsupportedExports: string[];
}[];

for (const module of builtinModules) {
  if (module.startsWith("_")) {
    continue;
  }
  try {
    const nodeMod = await import(`node:${module}`);
    const unenvMod = await import(`../src/runtime/node/${module}.ts`);

    const supportedExports = [] as string[];
    const unsupportedExports = [] as string[];
    for (const exportName in nodeMod) {
      if (exportName in (unenvMod || {})) {
        supportedExports.push(exportName);
      } else {
        unsupportedExports.push(exportName);
      }
    }

    for (const defExportName in nodeMod) {
      if (defExportName === "default") {
        continue;
      }
      if (!(defExportName in (unenvMod.default || {}))) {
        unsupportedExports.push(`default.${defExportName}`);
      }
    }

    modulesCoverage.push({
      name: module,
      supportedExports,
      unsupportedExports,
    });
  } catch (error) {
    throw new Error(`Error while processing src/runtime/node/${module}.ts`, {
      cause: error,
    });
  }
}

if (process.argv.includes("--json")) {
  console.log(JSON.stringify(modulesCoverage, null, 2));
  process.exit(0); // eslint-disable-line unicorn/no-process-exit
}

for (const module of modulesCoverage) {
  const supported = module.supportedExports.length;
  const unsupported = module.unsupportedExports.length;
  const all = supported + module.unsupportedExports.length;
  const status =
    supported === 0
      ? colorize("bgRed", " MOCK ")
      : colorize(unsupported ? "bgYellow" : "bgGreen", ` ${supported}/${all} `);
  const missingNames =
    unsupported > 3
      ? module.unsupportedExports.slice(0, 3).join(", ") +
        `, and ${unsupported - 3} more...`
      : module.unsupportedExports.join(", ");
  const missing = missingNames
    ? colorize("gray", ` (missing: ${missingNames})`)
    : "";
  console.log(
    `${colorize(supported ? (unsupported ? "yellow" : "green") : "red", `node:${module.name}`.padEnd(25))} ${status.padEnd(20)} ${missing}`,
  );
}

const markdown = modulesCoverage
  .map((module) => {
    const statusIcon =
      module.supportedExports.length === 0 ||
      module.unsupportedExports.length > 0
        ? "🚧"
        : "✅";
    const comments =
      module.unsupportedExports.length > 0
        ? ` <!-- missing ${module.unsupportedExports.join(", ")} exports -->`
        : "";
    const url = `https://nodejs.org/api/${module.name.split("/")[0]}.html`;
    return `- ${statusIcon} [node:${module.name}](${url})${comments}`;
  })
  .join("\n");

await mkdir(new URL("../coverage", import.meta.url), { recursive: true });

await writeFile(
  new URL("../coverage/unenv.json", import.meta.url),
  JSON.stringify(modulesCoverage, null, 2),
);

await writeFile(new URL("../coverage/unenv.md", import.meta.url), markdown);
