// https://nodejs.org/api/events.html
import type nodeEvents from "node:events";

import { _EventEmitter } from "./internal/events";

export {
  _EventEmitter as EventEmitter,
  EventEmitterAsyncResource,
  addAbortListener,
  getEventListeners,
  getMaxListeners,
  on,
  once,
} from "./internal/events";

export const usingDomains = _EventEmitter.usingDomains;
export const captureRejectionSymbol = _EventEmitter.captureRejectionSymbol;
export const captureRejections = false; // Coverage only
export const errorMonitor = _EventEmitter.errorMonitor;
export const defaultMaxListeners = _EventEmitter.defaultMaxListeners;
export const setMaxListeners = _EventEmitter.setMaxListeners;
export const listenerCount = _EventEmitter.listenerCount;
export const init = _EventEmitter.init;

export default _EventEmitter as typeof nodeEvents;
