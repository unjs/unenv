// https://nodejs.org/api/events.html
import type asyncHooks from "node:async_hooks";

import { AsyncLocalStorage } from "./internal/async_hooks/async-local-storage.ts";
import { AsyncResource } from "./internal/async_hooks/async-resource.ts";

import * as asyncHook from "./internal/async_hooks/async-hook.ts";

export { AsyncLocalStorage } from "./internal/async_hooks/async-local-storage.ts";
export { AsyncResource } from "./internal/async_hooks/async-resource.ts";

export * from "./internal/async_hooks/async-hook.ts";

export default {
  AsyncLocalStorage,
  AsyncResource,
  ...asyncHook,
} satisfies typeof asyncHooks;
