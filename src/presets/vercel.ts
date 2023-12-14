import type { Preset } from "../types";

// https://vercel.com/docs/functions/edge-functions/edge-runtime#compatible-node.js-modules
// Last checked: 2023-12-14
const vercelNodeCompatModules = [
  "async_hooks",
  "events",
  "buffer",
  "assert",
  "util",
];

const vercelPreset: Preset = {
  alias: {
    ...Object.fromEntries(vercelNodeCompatModules.map((p) => [p, `node:${p}`])),
    ...Object.fromEntries(
      vercelNodeCompatModules.map((p) => [`node:${p}`, `node:${p}`]),
    ),
  },
  inject: {},
  polyfill: [],
  external: vercelNodeCompatModules.map((p) => `node:${p}`),
};

export default vercelPreset;
