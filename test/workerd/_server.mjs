import { readFile } from "node:fs/promises";
import { createServer } from "node:http";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { build } from "esbuild";

const rootDir = fileURLToPath(new URL("../..", import.meta.url));

// Reference:
// https://github.com/cloudflare/workerd/pull/1423
// https://github.com/cloudflare/workerd/tree/main/samples/module_fallback

export async function createModuleServer(port = 8888) {
  const server = createServer(async (req, res) => {
    const resolveMethod = req.headers["x-resolve-method"];
    const url = new URL(req.url, "http://localhost");
    const referrer = url.searchParams.get("referrer");
    const specifier = url.searchParams.get("specifier");
    const rawSpecifier = url.searchParams.get("rawSpecifier");

    const nodeModule = specifier?.match(/node:(.*)/)?.[1];

    if (!nodeModule) {
      res.writeHead(404);
      return res.end();
    }

    // Load node module
    // prettier-ignore
    const sourceDir = join(rootDir, "src/runtime/node", nodeModule);
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
    server.listen(port, () => {
      resolve(server);
    });
  });
}

function mapSpecifier(specifier, parent) {
  if (parent) {
    return join(dirname(parent), specifier);
  }
  const nodeModule = specifier.match(/node:(.*)/)?.[1];
  if (!nodeModule) {
    return;
  }
  return join(rootDir, "runtime", "node", nodeModule, "index.mjs");
}
