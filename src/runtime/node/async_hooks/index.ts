// https://nodejs.org/api/events.html
import type asyncHooks from "node:async_hooks";
import { AsyncLocalStorage } from "./_async-local-storage";
import { AsyncResource } from "./_async-resource";

import * as asyncHook from "./_async_hook";

export * from "./_async_hook";

export default <typeof asyncHooks>{
  AsyncLocalStorage,
  AsyncResource,
  ...asyncHook,
};
