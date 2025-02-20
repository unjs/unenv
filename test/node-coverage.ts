import { builtinModules } from "node:module";
import { colorize } from "consola/utils";
import { mkdir, writeFile } from "node:fs/promises";

const modulesCoverage = [] as {
  name: string;
  supportedExports: string[];
  unsupportedExports: string[];
  extraExports: string[];
}[];

for (const module of builtinModules) {
  if (module.startsWith("_")) {
    continue;
  }
  try {
    const nodeMod = await import(`node:${module}`);
    const unenvMod = await import(`../src/runtime/node/${module}.ts`);

    const supportedExports = [] as string[];
    let unsupportedExports = [] as string[];
    let extraExports = [] as string[];

    // Make sure named exports are covered
    for (const exportName of Object.getOwnPropertyNames(nodeMod)) {
      if (exportName in unenvMod) {
        supportedExports.push(exportName);
      } else {
        unsupportedExports.push(exportName);
      }
    }

    // Make sure no extra named exports are added
    for (const exportName of Object.getOwnPropertyNames(unenvMod)) {
      if (
        !(exportName in nodeMod) &&
        // Allow matching default and named exports in mixed CJS/ESM conditions
        !(exportName in nodeMod.default)
      ) {
        extraExports.push(exportName);
      }
    }

    // Make sure default export keys are covered
    for (const defExportName of Object.getOwnPropertyNames(nodeMod.default)) {
      if (
        defExportName === "default" ||
        ["name", "length", "prototype"].includes(defExportName) /* fn props */
      ) {
        continue;
      }
      if (!(defExportName in unenvMod.default)) {
        unsupportedExports.push(`default.${defExportName}`);
      }
    }

    // Make sure no extra default export keys are added
    for (const defExportName of Object.getOwnPropertyNames(unenvMod.default)) {
      if (
        defExportName === "default" ||
        ["name", "length", "prototype"].includes(defExportName) /* fn props */
      ) {
        continue;
      }
      if (
        !(defExportName in nodeMod.default) &&
        // Allow matching default and named exports in mixed CJS/ESM conditions
        !(defExportName in nodeMod)
      ) {
        extraExports.push(`default.${defExportName}`);
      }
    }

    if (module === "constants") {
      // TODO: Should we remove this always?
      const osConstants = [
        // not availablein macos
        "O_SYMLINK",
        "SIGINFO",
        // macos specific
        "O_DIRECT",
        "O_NOATIME",
      ];
      const isOsSpecific = (name) =>
        osConstants.some((c) => name === c || name === `default.${c}`);
      unsupportedExports = unsupportedExports.filter(
        (name) => !isOsSpecific(name),
      );
      extraExports = unsupportedExports.filter((name) => !isOsSpecific(name));
    }

    modulesCoverage.push({
      name: module,
      supportedExports,
      unsupportedExports,
      extraExports,
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
  const extraNames =
    module.extraExports.length > 3
      ? module.extraExports.slice(0, 3).join(", ") +
        `, and ${module.extraExports.length - 3} more...`
      : module.extraExports.join(", ");
  const extra = extraNames ? colorize("yellow", ` (extra: ${extraNames})`) : "";
  console.log(
    `${colorize(supported ? (unsupported ? "yellow" : "green") : "red", `node:${module.name}`.padEnd(25))} ${status.padEnd(20)}${missing}${extra}`,
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
