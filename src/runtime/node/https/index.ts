// https://nodejs.org/api/https.html
import type nodeHttps from "node:https";
import { notImplemented, notImplementedClass } from "../../_internal/utils";
import mock from "../../mock/proxy";

export const Server: typeof nodeHttps.Server =
  notImplementedClass("https.Server");

export const Agent: typeof nodeHttps.Agent = notImplementedClass("https.Agent");

export const globalAgent =
  (undefined as any as typeof nodeHttps.globalAgent) ||
  mock.__createMock__("https.globalAgent");

export const get = notImplemented<typeof nodeHttps.get>("https.get");

export const createServer =
  notImplemented<typeof nodeHttps.createServer>("https.createServer");

export const request =
  notImplemented<typeof nodeHttps.request>("https.request");

export default <typeof nodeHttps>{
  Server,
  Agent,
  globalAgent,
  get,
  createServer,
  request,
};
