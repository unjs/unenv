#!/usr/bin/env node --disable-warning=ExperimentalWarning --experimental-strip-types

/**
 * Copyright (c) Pooya Parsa <pooya@pi0.io>
 *
 * Please do not copy and paste the code, it is under development and planned to be released as an standalone package.
 */

import { fileURLToPath } from "node:url";
import { dirname, join, relative } from "node:path";
import { glob, mkdir, readFile, rm, writeFile } from "node:fs/promises";

import oxcTransform from "oxc-transform";
import oxcParser from "oxc-parser";
import oxcResolver from "oxc-resolver";
import { rolldown } from "rolldown";
import { builtinModules } from "node:module";

import pkg from "../package.json" with { type: "json" };

const rootDir = fileURLToPath(new URL("../", import.meta.url));

const start = Date.now();

console.log(`Cleaning up dist/ ...`);
await rm(join(rootDir, "dist"), { recursive: true, force: true });

console.log(`Bundling src/index...`);
await rolldownBuild(rootDir, "src/index.ts", "dist/index.mjs");

console.log(`Building src/runtime...`);
await transformDir(rootDir, "src/runtime", "dist/runtime");

console.log(`Build finished in ${Date.now() - start}ms`);
process.exit(0);

/**
 * Transform all .ts modules in a directory using oxc-transform.
 */
async function transformDir(cwd: string, input: string, output: string) {
  const start = Date.now();
  const srcDir = join(cwd, input);
  const distDir = join(cwd, output);
  const promises: Promise<void>[] = [];
  for await (const entryName of glob("**/*.ts", { cwd: srcDir })) {
    promises.push(
      (async () => {
        const entryPath = join(srcDir, entryName);
        const transformed = await transformModule(entryPath);
        const entryDistPath = join(distDir, entryName.replace(/\.ts$/, ".mjs"));
        await mkdir(dirname(entryDistPath), { recursive: true });
        await writeFile(entryDistPath, transformed.code, "utf8");
        await writeFile(
          entryDistPath.replace(/\.mjs$/, ".d.mts"),
          transformed.declaration!,
          "utf8",
        );
      })(),
    );
  }
  await Promise.all(promises);
  console.log(
    `Transformed ${promises.length} files from ${input} into ${output} in ${Date.now() - start}ms`,
  );
}

/**
 * Transform a .ts module using oxc-transform.
 */
async function transformModule(entryPath: string) {
  let sourceText = await readFile(entryPath, "utf8");

  const sourceOptions = {
    lang: "ts",
    sourceType: "module",
  } as const;

  const parsed = oxcParser.parseSync(entryPath, sourceText, {
    ...sourceOptions,
  });

  if (parsed.errors.length > 0) {
    throw new Error(`Errors while parsing ${entryPath}:`, {
      cause: parsed.errors,
    });
  }

  // Rewrite relative imports
  const updatedStarts = new Set<number>();
  const rewriteSpecifier = (req: {
    value: string;
    start: number;
    end: number;
  }) => {
    const moduleId = req.value;
    if (!moduleId.startsWith(".")) {
      return;
    }
    if (updatedStarts.has(req.start)) {
      return; // prevent double rewritings
    }
    updatedStarts.add(req.start);
    const resolvedAbsolute = resolvePath(moduleId, entryPath);
    const newId = relative(
      dirname(entryPath),
      resolvedAbsolute.replace(/\.ts$/, ".mjs"),
    );
    parsed.magicString.remove(req.start, req.end);
    parsed.magicString.prependLeft(
      req.start,
      JSON.stringify(newId.startsWith(".") ? newId : `./${newId}`),
    );
  };

  for (const staticImport of parsed.module.staticImports) {
    rewriteSpecifier(staticImport.moduleRequest);
  }
  for (const staticExport of parsed.module.staticExports) {
    for (const staticExportEntry of staticExport.entries) {
      if (staticExportEntry.moduleRequest) {
        rewriteSpecifier(staticExportEntry.moduleRequest);
      }
    }
  }
  sourceText = parsed.magicString.toString();

  const transformed = oxcTransform.transform(entryPath, sourceText, {
    ...sourceOptions,
    cwd: dirname(entryPath),
    typescript: { declaration: { stripInternal: true } },
  });

  const transformErrors = transformed.errors.filter(
    (err) => !err.message.includes("--isolatedDeclarations"),
  );

  if (transformErrors.length > 0) {
    // console.log(sourceText);
    await writeFile(
      "build-dump.ts",
      `/** Error dump for ${entryPath} */\n\n` + sourceText,
      "utf8",
    );
    throw new Error(
      `Errors while transforming ${entryPath}: (hint: check build-dump.ts)`,
      {
        cause: transformErrors,
      },
    );
  }

  return transformed;
}

async function rolldownBuild(cwd: string, input: string, output: string) {
  const start = Date.now();
  const res = await rolldown({
    cwd,
    input: input,
    external: [
      ...builtinModules,
      ...builtinModules.map((m) => `node:${m}`),
      ...Object.keys(pkg.dependencies),
    ],
  });
  await res.write({ file: output });
  await res.close();
  console.log(`Bundled ${input} into ${output} in ${Date.now() - start}ms`);
}

function resolvePath(id: string, parent: string) {
  for (const suffix of ["", "/index"]) {
    for (const ext of ["", ".ts", ".mjs", ".cjs"]) {
      const resolved = oxcResolver.sync(
        dirname(parent),
        `${id}${suffix}${ext}`,
      ).path;
      if (resolved) {
        return resolved;
      }
    }
  }
  const error = new Error(`Cannot resolve "${id}" from "${parent}"`);
  Error.captureStackTrace?.(error, resolvePath);
  throw error;
}

function relativeWithDot(path: string) {
  return path.startsWith(".") ? path : `./${path}`;
}
