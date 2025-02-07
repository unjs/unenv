import type inspectorPromises from "node:inspector/promises";
import mock from "../../mock/proxy.ts";
import { notImplemented, notImplementedClass } from "../../_internal/utils.ts";

export const console: Console = /*@__PURE__*/ mock.__createMock__(
  "inspectorPromises.console",
);

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
  console,
  Network,
  open,
  Session,
  url,
  waitForDebugger,
} satisfies typeof inspectorPromises;
