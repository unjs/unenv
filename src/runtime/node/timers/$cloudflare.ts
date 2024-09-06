import type timers from "node:timers";

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

globalThis.setImmediate = setImmediate;
globalThis.clearImmediate = clearImmediate;

export default <typeof timers>{
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
