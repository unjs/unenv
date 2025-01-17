import type vm from "node:vm";

// Actual values in Node are Symbols
// See https://github.com/nodejs/node/blob/92c7dde/lib/vm.js#L66
export const USE_MAIN_CONTEXT_DEFAULT_LOADER: typeof vm.constants.USE_MAIN_CONTEXT_DEFAULT_LOADER = 0;
export const DONT_CONTEXTIFY: typeof vm.constants.DONT_CONTEXTIFY = 1;
