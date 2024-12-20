import { NodeBuiltinModules } from "../utils";
import type { Preset } from "../types";
import { version } from "../../package.json";

export default {
  meta: {
    name: "unenv:node",
    version,
  },

  alias: {
    "node-fetch": "unenv/runtime/npm/node-fetch",
    "cross-fetch": "unenv/runtime/npm/cross-fetch",
    "cross-fetch/polyfill": "unenv/runtime/mock/empty",
    "isomorphic-fetch": "unenv/runtime/mock/empty",
  },

  polyfill: [],

  external: [...NodeBuiltinModules],
} as Preset;
