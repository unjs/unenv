import type * as streamConsumers from "node:stream/consumers";
import { notImplemented } from "../../_internal/utils";

export const arrayBuffer = /*@__PURE__*/ notImplemented(
  "stream.consumers.arrayBuffer",
);
export const blob = /*@__PURE__*/ notImplemented("stream.consumers.blob");
export const buffer = /*@__PURE__*/ notImplemented("stream.consumers.buffer");
export const text = /*@__PURE__*/ notImplemented("stream.consumers.text");
export const json = /*@__PURE__*/ notImplemented("stream.consumers.json");

export default <typeof streamConsumers>{
  arrayBuffer,
  blob,
  buffer,
  text,
  json,
};
