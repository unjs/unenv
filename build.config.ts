import { defineBuildConfig } from "unbuild";

export default defineBuildConfig({
  declaration: true,
  rollup: {
    emitCJS: true
  },
  entries: [
    "src/index",
    { input: "src/runtime/", outDir: "runtime", format: "esm" },
    { input: "src/runtime/", outDir: "runtime", format: "cjs", ext: "cjs", declaration: false }
  ]
});
