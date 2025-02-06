import type * as streamPromises from "node:stream/promises";
import { notImplemented } from "../../_internal/utils.ts";

export const finished = /*@__PURE__*/ notImplemented(
  "stream.promises.finished",
);
export const pipeline = /*@__PURE__*/ notImplemented(
  "stream.promises.pipeline",
);

export default <typeof streamPromises>{
  finished,
  pipeline,
};
