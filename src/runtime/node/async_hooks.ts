// https://nodejs.org/api/events.html
import type asyncHooks from "node:async_hooks";

import { AsyncLocalStorage } from "./internal/async_hooks/async-local-storage";
import { AsyncResource } from "./internal/async_hooks/async-resource";

import * as asyncHook from "./internal/async_hooks/async-hook";

export { AsyncLocalStorage } from "./internal/async_hooks/async-local-storage";
export { AsyncResource } from "./internal/async_hooks/async-resource";

export * from "./internal/async_hooks/async-hook";

export default {
  AsyncLocalStorage,
  AsyncResource,
  ...asyncHook,
} satisfies typeof asyncHooks;
