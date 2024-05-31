// https://nodejs.org/api/events.html
import type asyncHooks from "node:async_hooks";

import { AsyncLocalStorage } from "./internal/async-local-storage";
import { AsyncResource } from "./internal/async-resource";

import * as asyncHook from "./internal/async-hook";

export { AsyncLocalStorage } from "./internal/async-local-storage";
export { AsyncResource } from "./internal/async-resource";

export * from "./internal/async-hook";

export default <typeof asyncHooks>{
  AsyncLocalStorage,
  AsyncResource,
  ...asyncHook,
};
