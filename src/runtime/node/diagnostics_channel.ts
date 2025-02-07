import type nodeDiagnosticsChannel from "node:diagnostics_channel";
import {
  Channel,
  getChannels,
} from "./internal/diagnostics_channel/channel.ts";
import { TracingChannel } from "./internal/diagnostics_channel/tracing-channel.ts";

export { Channel } from "./internal/diagnostics_channel/channel.ts";

export const channel: typeof nodeDiagnosticsChannel.channel = function (name) {
  const channels = getChannels();
  if (name in channels) {
    return channels[name];
  }
  return new Channel(name);
};

export const hasSubscribers: typeof nodeDiagnosticsChannel.hasSubscribers =
  function (name) {
    const channels = getChannels();
    const channel = channels[name];
    return channel && channel.hasSubscribers;
  };

export const subscribe: typeof nodeDiagnosticsChannel.subscribe = function (
  name,
  onMessage,
) {
  channel(name).subscribe(onMessage);
};

export const unsubscribe: typeof nodeDiagnosticsChannel.unsubscribe = function (
  name,
  onMessage,
) {
  return (channel(name) as Channel<unknown, object>).unsubscribe(onMessage);
};

export const tracingChannel: typeof nodeDiagnosticsChannel.tracingChannel =
  function <StoreType = unknown, ContextType extends object = object>(
    name:
      | string
      | nodeDiagnosticsChannel.TracingChannelCollection<StoreType, ContextType>,
  ) {
    return new TracingChannel<StoreType, ContextType>(name);
  };

// TracingChannel is incorrectly exposed on the `diagnostics_channel` type. In addition, its type
// takes a constructor with no arguments, whereas the node implementation takes a name (matching `tracingChannel`)
export default {
  Channel,
  channel,
  hasSubscribers,
  subscribe,
  tracingChannel,
  unsubscribe,
} satisfies Omit<typeof nodeDiagnosticsChannel, "TracingChannel">;
