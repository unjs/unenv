import type nodeStreamPromises from "node:stream/promises";
import { notImplemented } from "../../_internal/utils.ts";

export const finished = /*@__PURE__*/ notImplemented(
  "stream.promises.finished",
);
export const pipeline = /*@__PURE__*/ notImplemented(
  "stream.promises.pipeline",
);

export default {
  finished,
  pipeline,
} satisfies typeof nodeStreamPromises;
