import { dirname, join } from "node:path";
import { existsSync } from "node:fs";
import { mkdir, writeFile } from "node:fs/promises";
import { spawn } from "node:child_process";
import { createServer } from "node:http";
import { fileURLToPath } from "node:url";
import workerd from "workerd";

// CLI args
const watchMode = process.argv.includes("--watch");

// Dirs
export const testsDir = fileURLToPath(new URL(".", import.meta.url));
export const rootDir = fileURLToPath(new URL("../..", import.meta.url));
export const srcDir = join(rootDir, "src");

/**
 * Test runner main
 */
async function main() {
  // Print info
  console.log(
    `Workerd: ${workerd.version} (compatibility date: ${workerd.compatibilityDate})`,
  );

  // Start module server
  const server = await createModuleServer(8888);
  server.unref();

  // Run tests once
  if (runTests() === false) {
    // eslint-disable-next-line unicorn/no-process-exit
    process.exit(1);
  }

  // Start watcher
  if (watchMode) {
    const watcher = await import("@parcel/watcher").then((r) => r.default);
    const watchDirs = [srcDir, testsDir];
    console.log(
      `Watching for changes:\n${watchDirs.map((d) => ` - ${d}`).join("\n")}`,
    );
    for (const dir of watchDirs) {
      watcher.subscribe(
        dir,
        () => {
          console.clear();
          runTests();
        },
        { ignore: [".tmp"] },
      );
    }
  }
}

/**
 * Spawn workerd to run tests
 */
function runTests() {
  try {
    runTests.proc?.kill();
    runTests.proc = undefined;

    console.log(`Running tests...`);
    const workerdBin = workerd.default;
    runTests.proc = spawn(
      workerdBin,
      ["test", "--experimental", "config.capnp"],
      {
        cwd: testsDir,
        stdio: "inherit",
        env: {
          ...process.env,
          LLVM_SYMBOLIZER: findLLVMsymbolizer(),
        },
      },
    ).on("exit", (code) => {
      if (code !== 0) {
        throw new Error(`Test failure`);
      }
    });
  } catch (error) {
    if (error) {
      console.error(error.stdout || error);
    }
    return false;
  }
}

/**
 * Try to llvm-symbolizer binary in common locations
 */
function findLLVMsymbolizer() {
  if (process.env.LLVM_SYMBOLIZER) {
    return process.env.LLVM_SYMBOLIZER;
  }
  const paths = [
    "/opt/homebrew/opt/llvm/bin/llvm-symbolizer",
    "/usr/bin/llvm-symbolizer",
  ];
  for (const path of paths) {
    if (existsSync(path)) {
      return path;
    }
  }
  return "llvm-symbolizer";
}

/**
 * Create fallback module server
 *
 * Reference:
 * https://github.com/cloudflare/workerd/pull/1423
 * https://github.com/cloudflare/workerd/tree/main/samples/module_fallback
 */
async function createModuleServer(port = 8888) {
  // Unenv preset
  const { createJiti } = await import("jiti");
  const jiti = createJiti(import.meta.url);
  /** @type {import("../../src/index")} */
  const unenv = await jiti.import("../../src/index.ts");
  const preset = unenv.defineEnv({ nodeCompat: true });
  const alias = Object.fromEntries(
    Object.entries(preset.env.alias).map(([k, v]) => [
      k,
      v.replace("unenv/runtime", join(srcDir, "runtime")),
    ]),
  );

  // Use esbuild to bundle
  const { build } = await import("esbuild");

  const server = createServer(async (req, res) => {
    try {
      const resolveMethod = req.headers["x-resolve-method"];
      const url = new URL(req.url, "http://localhost");
      const referrer = url.searchParams.get("referrer");
      const specifier = url.searchParams.get("specifier");
      const rawSpecifier = url.searchParams.get("rawSpecifier");

      console.log(
        `[server] ${rawSpecifier} ${referrer ? `from ${referrer}` : ""}`,
      );

      // unenv/runtime/*
      const unenvPath = /^unenv\/runtime\/(.*)$/.exec(rawSpecifier)?.[1];
      if (!unenvPath) {
        res.writeHead(404);
        return res.end();
      }

      // Load node module
      // prettier-ignore
      const entryFile = join(srcDir, "runtime", unenvPath) + '.ts'

      const transpiled = await build({
        entryPoints: [entryFile],
        banner: {
          js: `/*\n * Raw specifier: ${rawSpecifier}\n * Source: ${entryFile}\n */\n`,
        },
        bundle: true,
        write: false,
        format: "esm",
        target: "esnext",
        platform: "node",
        sourcemap: "inline",
        alias,
      });

      const esModule = transpiled.outputFiles[0].text;

      if (process.env.DUMP_MODULES) {
        const dumpPath = join(testsDir, ".tmp", rawSpecifier + ".mjs");
        await mkdir(dirname(dumpPath), { recursive: true });
        await writeFile(dumpPath, esModule, "utf8");
      }

      res.end(JSON.stringify({ esModule }));
    } catch (error) {
      console.error("[server]", error);
      res.writeHead(500);
      res.end();
    }
  });

  return new Promise((resolve) => {
    server.listen({ port, host: "localhost" }, () => {
      console.log(
        `Module fallback server listening on http://localhost:${port}`,
      );
      resolve(server);
    });
  });
}

await main();
