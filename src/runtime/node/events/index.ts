// https://nodejs.org/api/events.html
import type events from "node:events";

// @ts-ignore
import { EventEmitter as _EventEmitter, once as _once } from "./_events";

export const EventEmitter = _EventEmitter as any as typeof events.EventEmitter;
export const once = _once as any as typeof events.once;

export default <typeof events>{
  EventEmitter,
  once,
};
