import { createNotImplementedError } from "../../../_internal/utils.ts";
import type nodeDiagnosticsChannel from "node:diagnostics_channel";

const channels: Record<string | symbol, nodeDiagnosticsChannel.Channel> = {};
export const getChannels = () => channels;

export class Channel<StoreType, ContextType>
  implements nodeDiagnosticsChannel.Channel<StoreType, ContextType>
{
  readonly __unenv__ = true;

  name: nodeDiagnosticsChannel.Channel["name"];

  get hasSubscribers() {
    return this._subscribers.length > 0;
  }

  _subscribers: nodeDiagnosticsChannel.ChannelListener[];

  constructor(name: nodeDiagnosticsChannel.Channel["name"]) {
    this.name = name;
    this._subscribers = [];

    const channels = getChannels();
    channels[name] = this;
  }

  subscribe(onMessage: nodeDiagnosticsChannel.ChannelListener) {
    this._subscribers.push(onMessage);
  }

  unsubscribe(onMessage: nodeDiagnosticsChannel.ChannelListener) {
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
