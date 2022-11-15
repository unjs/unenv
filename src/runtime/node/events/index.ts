// https://nodejs.org/api/events.html
import type events from "node:events";

// @ts-ignore
import { EventEmitter as _EventEmitter } from "./_events";

export const EventEmitter = _EventEmitter as any as typeof events.EventEmitter;

export default <typeof events> {
  EventEmitter
};
