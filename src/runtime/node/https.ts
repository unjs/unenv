// https://nodejs.org/api/https.html
import type nodeHttps from "node:https";
import { notImplemented, notImplementedClass } from "../_internal/utils.ts";
import mock from "../mock/proxy.ts";

export const Server: typeof nodeHttps.Server =
  notImplementedClass("https.Server");

export const Agent: typeof nodeHttps.Agent = mock.__createMock__("https.Agent");
export const globalAgent: typeof nodeHttps.globalAgent = new Agent();

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
