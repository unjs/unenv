import type * as streamPromises from "node:stream/promises";
import { notImplemented } from "../../../_internal/utils";

export const finished = notImplemented("stream.promises.finished");
export const pipeline = notImplemented("stream.promises.pipeline");

export default <typeof streamPromises>{
  finished,
  pipeline,
};
