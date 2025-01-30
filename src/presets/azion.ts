import type { Preset } from "../types";
import { version } from "../../package.json";

const azionNodeCompatModules = [
  "fs/promises",
  "module",
  "process",
  "url",
  "async_hooks",
];
const hybridNodeCompatModules = ["fs"];

const azionPreset: Preset = {
  meta: {
    name: "unenv:azion",
    version,
  },
  alias: {
    ...Object.fromEntries(
      azionNodeCompatModules.flatMap((p) => [
        [p, p],
        [`node:${p}`, `node:${p}`],
      ]),
    ),

    
    ...Object.fromEntries(
      hybridNodeCompatModules.flatMap((m) => [
        [m, `unenv/runtime/node/${m}/$azion`],
        [`node:${m}`, `unenv/runtime/node/${m}/$azion`],
      ]),
    ),
  },
  inject: {},
  polyfill: [],
  external: azionNodeCompatModules.flatMap((p) => [p, `node:${p}`]),
};

export default azionPreset;
