import { createNotImplementedError } from "../../../_internal/utils";
import type diagnostics_channel from "node:diagnostics_channel";

const channels: Record<string | symbol, diagnostics_channel.Channel> = {};
export const getChannels = () => channels;

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

    const channels = getChannels();
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

  bindStore() {
    throw createNotImplementedError("Channel.bindStore");
  }

  unbindStore() {
    throw createNotImplementedError("Channel.unbindStore");
  }

  runStores() {
    throw createNotImplementedError("Channel.runStores");
  }
}
