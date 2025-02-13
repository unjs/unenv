// https://nodejs.org/api/events.html
import type nodeAsyncHooks from "node:async_hooks";

import { AsyncLocalStorage } from "./internal/async_hooks/async-local-storage.ts";
import { AsyncResource } from "./internal/async_hooks/async-resource.ts";

import {
  asyncWrapProviders,
  createHook,
  executionAsyncId,
  executionAsyncResource,
  triggerAsyncId,
} from "./internal/async_hooks/async-hook.ts";

export { AsyncLocalStorage } from "./internal/async_hooks/async-local-storage.ts";
export { AsyncResource } from "./internal/async_hooks/async-resource.ts";

export * from "./internal/async_hooks/async-hook.ts";

export default {
  // @ts-expect-error
  asyncWrapProviders,
  AsyncLocalStorage,
  AsyncResource,
  createHook,
  executionAsyncId,
  executionAsyncResource,
  triggerAsyncId,
} satisfies typeof nodeAsyncHooks;
