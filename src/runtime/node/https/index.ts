// https://nodejs.org/api/https.html
import type https from "node:https";
import { notImplemented, notImplementedClass } from "../../_internal/utils";
import mock from "../../mock/proxy";

export const Server: typeof https.Server =
  notImplementedClass("https.Server");

  export const Agent: typeof https.Agent = mock.__createMock__("https.Agent");
  export const globalAgent: typeof https.globalAgent = new Agent();

export const get = notImplemented<typeof https.get>("https.get");

export const createServer =
  notImplemented<typeof https.createServer>("https.createServer");

export const request =
  notImplemented<typeof https.request>("https.request");

export default <typeof https>{
  Server,
  Agent,
  globalAgent,
  get,
  createServer,
  request,
};
