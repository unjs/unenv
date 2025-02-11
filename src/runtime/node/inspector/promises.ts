import type inspectorPromises from "node:inspector/promises";
import { notImplemented, notImplementedClass } from "../../_internal/utils.ts";

import { console as inspectorConsole } from "../inspector.ts";

export { console } from "../inspector.ts";

export const Network = /*@__PURE__*/ notImplementedClass<
  typeof inspectorPromises.Network
>("inspectorPromises.Network");

export const Session = /*@__PURE__*/ notImplementedClass<
  typeof inspectorPromises.Session
>("inspectorPromises.Session");

export const url = /*@__PURE__*/ notImplemented<typeof inspectorPromises.url>(
  "inspectorPromises.url",
);

export const waitForDebugger = /*@__PURE__*/ notImplemented<
  typeof inspectorPromises.waitForDebugger
>("inspectorPromises.waitForDebugger");

export const open = /*@__PURE__*/ notImplemented<typeof inspectorPromises.open>(
  "inspectorPromises.open",
);

export const close = /*@__PURE__*/ notImplemented<
  typeof inspectorPromises.close
>("inspectorPromises.close");

export default {
  close,
  console: inspectorConsole,
  Network,
  open,
  Session,
  url,
  waitForDebugger,
} satisfies typeof inspectorPromises;
