import { join } from "node:path";
import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
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
    const watchDirs = [srcDir];
    console.log(
      `Watching for changes:\n${watchDirs.map((d) => ` - ${d}`).join("\n")}`,
    );
    for (const dir of watchDirs) {
      watcher.subscribe(dir, () => {
        console.clear();
        runTests();
      });
    }
  }
}

/**
 * Spawn workerd to run tests
 */
function runTests() {
  try {
    if (runTests.proc) {
      runTests.proc.kill();
      runTests.proc = undefined;
    }
    console.log(`Running tests...`);
    const workerdBin = workerd.default;
    runTests.proc = spawn(
      workerdBin,
      [
        "test",
        "--experimental",
        watchMode ? "--watch" : "",
        "config.capnp",
      ].filter(Boolean),
      {
        cwd: testsDir,
        stdio: "inherit",
        env: {
          ...process.env,
          LLVM_SYMBOLIZER: findLLVMsymbolizer(),
        },
      },
    );
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
  const { build } = await import("esbuild");

  const server = createServer(async (req, res) => {
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
    const sourceDir = join(srcDir, "runtime", unenvPath);
    const source = await readFile(join(sourceDir, "$cloudflare.ts"), "utf8")
      .catch(() => readFile(join(sourceDir, "index.ts"), "utf8"))
      .catch(() => undefined);

    if (!source) {
      res.writeHead(404);
      return res.end();
    }

    const transpiled = await build({
      entryPoints: [join(sourceDir, "index.ts")],
      bundle: true,
      write: false,
      format: "esm",
      target: "esnext",
      platform: "node",
      sourcemap: false,
    });

    res.end(
      JSON.stringify({
        // name: specifier,
        esModule: transpiled.outputFiles[0].text,
      }),
    );
  });

  return new Promise((resolve) => {
    server.listen({ port, host: "localhost" }, () => {
      console.log(`Module server listening on http://localhost:${port}`);
      resolve(server);
    });
  });
}

await main();
