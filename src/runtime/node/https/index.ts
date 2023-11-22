// https://nodejs.org/api/https.html
import type nodeHttps from "node:https";
import { notImplemented, notImplementedClass } from "../../_internal/utils";

export const Server: typeof nodeHttps.Server =
  notImplementedClass("https.Server");

export const Agent: typeof nodeHttps.Agent = notImplementedClass("https.Agent");

export const globalAgent = undefined as any as typeof nodeHttps.globalAgent;

export const get: typeof nodeHttps.get = notImplemented("https.get");

export const createServer: typeof nodeHttps.createServer =
  notImplemented("https.createServer");

export const request: typeof nodeHttps.request =
  notImplemented("https.request");

export default <typeof nodeHttps>{
  Server,
  Agent,
  globalAgent,
  get,
  createServer,
  request,
};
