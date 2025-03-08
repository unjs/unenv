// https://nodejs.org/api/events.html
import type nodeEvents from "node:events";

import { _EventEmitter } from "./internal/events/events.ts";
import { notImplemented } from "../_internal/utils.ts";

export {
  _EventEmitter as EventEmitter,
  EventEmitterAsyncResource,
  addAbortListener,
  getEventListeners,
  getMaxListeners,
  on,
  once,
} from "./internal/events/events.ts";

export const usingDomains = false;

export const captureRejectionSymbol =
  /*@__PURE__*/ Symbol.for("nodejs.rejection");

export const captureRejections = false;

export const errorMonitor = /*@__PURE__*/ Symbol.for("events.errorMonitor");

export const defaultMaxListeners = 10;

export const setMaxListeners = /*@__PURE__*/ notImplemented(
  "node:events.setMaxListeners",
);

export const listenerCount = /*@__PURE__*/ notImplemented(
  "node:events.listenerCount",
);

export const init = /*@__PURE__*/ notImplemented("node:events.init");

export default _EventEmitter as typeof nodeEvents;
