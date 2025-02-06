import { NodeBuiltinModules } from "../utils";
import type { Preset } from "../types";
import { version } from "../../package.json";

export default {
  meta: {
    name: "unenv:node",
    version,
  },

  alias: {
    "node-fetch": "unenv/npm/node-fetch",
    "cross-fetch": "unenv/npm/cross-fetch",
    "cross-fetch/polyfill": "unenv/mock/empty",
    "isomorphic-fetch": "unenv/mock/empty",
  },

  polyfill: [],

  external: [...NodeBuiltinModules],
} as Preset;
