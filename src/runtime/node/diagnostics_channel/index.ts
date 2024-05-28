import type diagnostics_channel from "node:diagnostics_channel";
import { Channel, getChannels } from "./channel";
import { TracingChannel } from "./tracing-channel";

export { Channel } from "./channel";

export const channel: typeof diagnostics_channel.channel = function (name) {
  const channels = getChannels();
  if (name in channels) {
    return channels[name];
  }
  return new Channel(name);
};

export const hasSubscribers: typeof diagnostics_channel.hasSubscribers =
  function (name) {
    const channels = getChannels();
    const channel = channels[name];
    return channel && channel.hasSubscribers;
  };

export const subscribe: typeof diagnostics_channel.subscribe = function (
  name,
  onMessage,
) {
  channel(name).subscribe(onMessage);
};

export const unsubscribe: typeof diagnostics_channel.unsubscribe = function (
  name,
  onMessage,
) {
  return (channel(name) as Channel<unknown, object>).unsubscribe(onMessage);
};

export const tracingChannel: typeof diagnostics_channel.tracingChannel =
  function <StoreType = unknown, ContextType extends object = object>(
    name:
      | string
      | diagnostics_channel.TracingChannelCollection<StoreType, ContextType>,
  ) {
    return new TracingChannel<StoreType, ContextType>(name);
  };

// TracingChannel is incorrectly exposed on the `diagnostics_channel` type. In addition, its type
// takes a constructur with no arguments, whereas the node impelmentation takes a name (matching `tracingChannel`)
export default <Omit<typeof diagnostics_channel, "TracingChannel">>{
  Channel,
  channel,
  hasSubscribers,
  subscribe,
  tracingChannel,
  unsubscribe,
};
