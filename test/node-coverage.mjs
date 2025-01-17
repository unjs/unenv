import { builtinModules } from "node:module";
import { colorize } from "consola/utils";

export async function makeCoverage() {
  const modulesCoverage = [];
  for (const module of builtinModules) {
    if (module.startsWith("_")) {
      continue;
    }
    try {
      const nodeMod = await import(`node:${module}`);
      const unenvMod = await import(`../runtime/node/${module}.mjs`);
      const supportedExports = [];
      const unsupportedExports = [];
      for (const exportName in nodeMod) {
        if (exportName in (unenvMod || {})) {
          supportedExports.push(exportName);
        } else {
          unsupportedExports.push(exportName);
        }
      }
      modulesCoverage.push({
        name: module,
        supportedExports,
        unsupportedExports,
      });
    } catch (error) {
      if (
        error.code !== "ERR_MODULE_NOT_FOUND" &&
        error.code !== "MODULE_NOT_FOUND"
      ) {
        throw error;
      }
      modulesCoverage.push({
        name: module,
        supportedExports: [],
        unsupportedExports: [],
      });
    }
  }
  return modulesCoverage;
}

async function printCoverage() {
  const modulesCoverage = await makeCoverage();
  for (const module of modulesCoverage) {
    const supported = module.supportedExports.length;
    const unsupported = module.unsupportedExports.length;
    const all = supported + module.unsupportedExports.length;
    const status =
      supported === 0
        ? colorize("bgRed", " MOCK ")
        : colorize(
            unsupported ? "bgYellow" : "bgGreen",
            ` ${supported}/${all} `,
          );
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
}

if (process.argv.some((arg) => import.meta.url.includes(arg))) {
  // eslint-disable-next-line unicorn/prefer-top-level-await
  printCoverage();
}
