import type * as streamConsumers from "node:stream/consumers";
import { notImplemented } from "../../../_internal/utils";

export const arrayBuffer = notImplemented("stream.consumers.arrayBuffer");
export const blob = notImplemented("stream.consumers.blob");
export const buffer = notImplemented("stream.consumers.buffer");
export const text = notImplemented("stream.consumers.text");
export const json = notImplemented("stream.consumers.json");

export default <typeof streamConsumers>{
  arrayBuffer,
  blob,
  buffer,
  text,
  json,
};
