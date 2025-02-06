// https://nodejs.org/api/https.html
import type nodeHttps from "node:https";
import { notImplemented, notImplementedClass } from "../_internal/utils.ts";
import mock from "../mock/proxy.ts";

export const Server: typeof nodeHttps.Server =
  /*@__PURE__*/ notImplementedClass("https.Server");

export const Agent: typeof nodeHttps.Agent = mock.__createMock__("https.Agent");
export const globalAgent: typeof nodeHttps.globalAgent = new Agent();

export const get =
  /*@__PURE__*/ notImplemented<typeof nodeHttps.get>("https.get");

export const createServer =
  /*@__PURE__*/ notImplemented<typeof nodeHttps.createServer>(
    "https.createServer",
  );

export const request =
  /*@__PURE__*/ notImplemented<typeof nodeHttps.request>("https.request");

export default {
  Server,
  Agent,
  globalAgent,
  get,
  createServer,
  request,
} satisfies typeof nodeHttps;
