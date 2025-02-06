/**
 * Copyright (c) Pooya Parsa <pooya@pi0.io>
 *
 * Please do not copy and paste the code, it is under development and planned to be released as an standalone package.
 */

import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { glob, mkdir, readFile, rm, writeFile } from "node:fs/promises";

import oxc from "oxc-transform";
import { rolldown } from "rolldown";

const rootDir = fileURLToPath(new URL("../", import.meta.url));
const distDir = join(rootDir, "dist");

await rm(distDir, { recursive: true, force: true });

const runtimeDir = join(rootDir, "src/runtime");
for await (const entryName of glob("**/*.ts", { cwd: runtimeDir })) {
  const entryPath = join(runtimeDir, entryName);
  const sourceText = await readFile(entryPath, "utf8");
  const transformed = oxc.transform(entryName, sourceText, {
    sourceType: "module",
    lang: "ts",
    typescript: { declaration: { stripInternal: true } },
  });
  const distPath = join(distDir, "runtime", entryName.replace(/\.ts$/, ".mjs"));
  await mkdir(dirname(distPath), { recursive: true });
  await writeFile(distPath, transformed.code, "utf8");
  await writeFile(
    distPath.replace(/\.mjs$/, ".d.mts"),
    transformed.declaration!,
    "utf8",
  );
  if (transformed.errors.length > 0) {
    console.error(
      `Errors while transforming ${entryPath}:` +
        "\n" +
        transformed.errors.map((err) => `  - ${err.message}`).join("\n"),
    );
  }
}

// rolldown({
//   cwd: projectDir,
// });
