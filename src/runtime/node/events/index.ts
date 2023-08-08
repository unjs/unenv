// https://nodejs.org/api/events.html
import type nodeEvents from "node:events";

// @ts-ignore
import { EventEmitter as _EventEmitter, once as _once } from "./_events";

export const EventEmitter: typeof nodeEvents.EventEmitter =
  (globalThis as any).EventEmitter || _EventEmitter;

export const once: typeof nodeEvents.once =
  _once as any as typeof nodeEvents.once;

export default <typeof nodeEvents>{
  EventEmitter,
  once,
};
