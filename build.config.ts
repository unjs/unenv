import { defineBuildConfig } from "obuild/config";

import { join } from "node:path";
import { readFile, writeFile } from "node:fs/promises";

export default defineBuildConfig({
  entries: ["./src/runtime/", "./src/index.ts"],
  hooks: {
    start: async (ctx) => {
      const m = (await readFile(join(ctx.pkgDir, ".nvmrc"), "utf8")).match(
        /(?<version>\d+\.\d+\.\d+)/,
      );
      if (!m?.groups?.version) {
        throw new Error(".nvrmc does not contain a valid Node version");
      }
      await writeFile(
        join(ctx.pkgDir, "src/runtime/node/internal/process/node-version.ts"),
        `// Extracted from .nvmrc\nexport const NODE_VERSION = ${JSON.stringify(m.groups.version)};\n`,
        "utf8",
      );
    },
    rolldownConfig(config) {
      // (config.external as (string | RegExp)[]).push(/node_modules\/pathe/);
    },
  },
});
