import { createNotImplementedError } from "../../../_internal/utils.ts";
import type diagnostics_channel from "node:diagnostics_channel";
import { Channel } from "./channel.ts";

export class TracingChannel<
  StoreType = unknown,
  ContextType extends object = object,
> implements diagnostics_channel.TracingChannel<StoreType, ContextType>
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

  traceSync() {
    throw createNotImplementedError("TracingChannel.traceSync");
  }

  tracePromise() {
    throw createNotImplementedError("TracingChannel.tracePromise");
  }

  traceCallback() {
    throw createNotImplementedError("TracingChannel.traceCallback");
  }
}
