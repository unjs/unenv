import noop from "../../mock/noop";
import type diagnostics_channel from "node:diagnostics_channel";

const channels: Record<string | symbol, diagnostics_channel.Channel> = {};

export class Channel<StoreType, ContextType>
  implements diagnostics_channel.Channel<StoreType, ContextType>
{
  readonly __unenv__ = true;

  name: diagnostics_channel.Channel["name"];
  get hasSubscribers() {
    return this._subscribers.length > 0;
  }
  _subscribers: diagnostics_channel.ChannelListener[];

  constructor(name: diagnostics_channel.Channel["name"]) {
    this.name = name;
    this._subscribers = [];

    channels[name] = this;
  }

  subscribe(onMessage: diagnostics_channel.ChannelListener) {
    this._subscribers.push(onMessage);
  }

  unsubscribe(onMessage: diagnostics_channel.ChannelListener) {
    const index = this._subscribers.indexOf(onMessage);
    if (index === -1) return false;

    this._subscribers.splice(index, 1);
    return true;
  }

  publish(message: unknown): void {
    for (const subscriber of this._subscribers) {
      subscriber(message, this.name);
    }
  }

  bindStore = noop;
  unbindStore = noop;
  runStores = noop;
}

export const channel: typeof diagnostics_channel.channel = function (name) {
  if (name in channels) {
    return channels[name];
  }
  return new Channel(name);
};

export const hasSubscribers: typeof diagnostics_channel.hasSubscribers =
  function (name) {
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
  return (channel(name) as Channel<unknown, {}>).unsubscribe(onMessage);
};

class TracingChannel<StoreType = unknown, ContextType extends object = {}>
  implements diagnostics_channel.TracingChannel<StoreType, ContextType>
{
  readonly __unenv__ = true;

  asyncEnd: Channel<StoreType, ContextType> = new Channel("asyncEnd");
  asyncStart: Channel<StoreType, ContextType> = new Channel("asyncStart");
  end: Channel<StoreType, ContextType> = new Channel("end");
  error: Channel<StoreType, ContextType> = new Channel("error");
  start: Channel<StoreType, ContextType> = new Channel("start");

  constructor(
    nameOrChannels:
      | string
      | diagnostics_channel.TracingChannelCollection<StoreType, ContextType>,
  ) {
    if (typeof nameOrChannels === "string") {
      this.asyncEnd = new Channel<StoreType, ContextType>(
        `trace:${nameOrChannels}:asyncEnd`,
      );
      this.asyncStart = new Channel<StoreType, ContextType>(
        `trace:${nameOrChannels}:asyncStart`,
      );
      this.end = new Channel<StoreType, ContextType>(
        `trace:${nameOrChannels}:end`,
      );
      this.error = new Channel<StoreType, ContextType>(
        `trace:${nameOrChannels}:error`,
      );
      this.start = new Channel<StoreType, ContextType>(
        `trace:${nameOrChannels}:start`,
      );
    } else {
      this.asyncStart = nameOrChannels.asyncStart as Channel<
        StoreType,
        ContextType
      >;
      this.asyncEnd = nameOrChannels.asyncEnd as Channel<
        StoreType,
        ContextType
      >;
      this.end = nameOrChannels.end as Channel<StoreType, ContextType>;
      this.error = nameOrChannels.error as Channel<StoreType, ContextType>;
      this.start = nameOrChannels.start as Channel<StoreType, ContextType>;
    }
  }

  subscribe(
    handlers: diagnostics_channel.TracingChannelSubscribers<ContextType>,
  ): void {
    this.asyncEnd?.subscribe(
      handlers.asyncEnd as diagnostics_channel.ChannelListener,
    );
    this.asyncStart?.subscribe(
      handlers.asyncStart as diagnostics_channel.ChannelListener,
    );
    this.end?.subscribe(handlers.end as diagnostics_channel.ChannelListener);
    this.error?.subscribe(
      handlers.error as diagnostics_channel.ChannelListener,
    );
    this.start?.subscribe(
      handlers.start as diagnostics_channel.ChannelListener,
    );
  }

  unsubscribe(
    handlers: diagnostics_channel.TracingChannelSubscribers<ContextType>,
  ): void {
    this.asyncEnd?.unsubscribe(
      handlers.asyncEnd as diagnostics_channel.ChannelListener,
    );
    this.asyncStart?.unsubscribe(
      handlers.asyncStart as diagnostics_channel.ChannelListener,
    );
    this.end?.unsubscribe(handlers.end as diagnostics_channel.ChannelListener);
    this.error?.unsubscribe(
      handlers.error as diagnostics_channel.ChannelListener,
    );
    this.start?.unsubscribe(
      handlers.start as diagnostics_channel.ChannelListener,
    );
  }

  traceSync = noop;
  tracePromise = noop;
  traceCallback = noop;
}

const tracingChannel: typeof diagnostics_channel.tracingChannel = function <
  StoreType = unknown,
  ContextType extends object = {},
>(
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
