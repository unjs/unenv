import type nodeTimers from "node:timers";

export {
  _unrefActive,
  active,
  clearInterval,
  clearTimeout,
  enroll,
  promises,
  setInterval,
  setTimeout,
  unenroll,
} from "./index";

// Always use the polyfill rather than the worked implementation.
//
// NOTE:
// `setImmediate` and `clearImmediate` must be function (re)exports.
// `export const setImmediate = ...` might cause esbuild to generate invalid code.
export {
  setImmediateFallback as setImmediate,
  clearImmediateFallback as clearImmediate,
} from "./internal/set-immediate";

import {
  _unrefActive,
  active,
  clearInterval,
  clearTimeout,
  enroll,
  promises,
  setInterval,
  setTimeout,
  unenroll,
} from "./index";

import {
  setImmediateFallback as setImmediate,
  clearImmediateFallback as clearImmediate,
} from "./internal/set-immediate";

export default <typeof nodeTimers>{
  _unrefActive,
  active,
  clearImmediate,
  clearInterval,
  clearTimeout,
  enroll,
  promises,
  setImmediate,
  setInterval,
  setTimeout,
  unenroll,
};
