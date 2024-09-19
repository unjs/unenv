import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import watcher from "@parcel/watcher";
import workerd from "workerd";
import { createModuleServer } from "./_server.mjs";

// Dirs
const testsDir = fileURLToPath(new URL(".", import.meta.url));
const srcDir = fileURLToPath(new URL("../../src", import.meta.url));

// Print versions
console.log(
  `Workerd: ${workerd.version} (compatibility date: ${workerd.compatibilityDate})`,
);

// Start module server
await createModuleServer(8888);

// Run tests once
runTests();

// Start watcher
const watchDirs = [srcDir, testsDir];
console.log(
  `Watching for changes:\n${watchDirs.map((d) => ` - ${d}`).join("\n")}`,
);
for (const dir of watchDirs) {
  watcher.subscribe(dir, () => {
    console.clear();
    runTests();
  });
}

// Workerd runner
function runTests() {
  try {
    console.log(`Running tests...`);
    const workerdBin = workerd.default;
    spawn(workerdBin, ["test", "--experimental", "_config.capnp"], {
      cwd: testsDir,
      stdio: "inherit",
    });
  } catch (error) {
    console.error(error.stdout);
  }
}
