// https://nodejs.org/api/http.html
import type nodeHttp from "node:http";
import { notImplemented, notImplementedClass } from "../_internal/utils.ts";
import mock from "../mock/proxy.ts";
import * as consts from "./internal/http/consts.ts";
import { IncomingMessage } from "./internal/http/request.ts";
import { ServerResponse } from "./internal/http/response.ts";

export * from "./internal/http/consts.ts";
export * from "./internal/http/request.ts";
export * from "./internal/http/response.ts";

export const createServer =
  /*@__PURE__*/ notImplemented<typeof nodeHttp.createServer>(
    "http.createServer",
  );
export const request =
  /*@__PURE__*/ notImplemented<typeof nodeHttp.request>("http.request");
export const get =
  /*@__PURE__*/ notImplemented<typeof nodeHttp.get>("http.get");

export const Server: typeof nodeHttp.Server =
  mock.__createMock__("http.Server");

export const OutgoingMessage: typeof nodeHttp.OutgoingMessage =
  mock.__createMock__("http.OutgoingMessage");

export const ClientRequest: typeof nodeHttp.ClientRequest =
  mock.__createMock__("http.ClientRequest");

export const Agent: typeof nodeHttp.Agent = mock.__createMock__("http.Agent");

export const globalAgent: typeof nodeHttp.globalAgent = new Agent();

export const validateHeaderName = /*@__PURE__*/ notImplemented<
  typeof nodeHttp.validateHeaderName
>("http.validateHeaderName");

export const validateHeaderValue = /*@__PURE__*/ notImplemented<
  typeof nodeHttp.validateHeaderValue
>("http.validateHeaderValue");

export const setMaxIdleHTTPParsers = /*@__PURE__*/ notImplemented<
  typeof nodeHttp.setMaxIdleHTTPParsers
>("http.setMaxIdleHTTPParsers");

export const _connectionListener = /*@__PURE__*/ notImplemented(
  "http._connectionListener",
);

export const WebSocket =
  globalThis.WebSocket ||
  /*@__PURE__*/ notImplementedClass<WebSocket>("WebSocket");

export const CloseEvent =
  globalThis.CloseEvent ||
  /*@__PURE__*/ notImplementedClass<CloseEvent>("CloseEvent");

export const MessageEvent =
  globalThis.MessageEvent ||
  /*@__PURE__*/ notImplementedClass<MessageEvent>("MessageEvent");

export default {
  ...consts,
  IncomingMessage: IncomingMessage as any as typeof nodeHttp.IncomingMessage,
  ServerResponse: ServerResponse as any as typeof nodeHttp.ServerResponse,
  WebSocket: WebSocket as any as typeof nodeHttp.WebSocket,
  CloseEvent: CloseEvent as any as typeof nodeHttp.CloseEvent,
  MessageEvent: MessageEvent as any as typeof nodeHttp.MessageEvent,
  createServer,
  request,
  get,
  Server,
  OutgoingMessage,
  ClientRequest,
  Agent,
  globalAgent,
  validateHeaderName,
  validateHeaderValue,
  setMaxIdleHTTPParsers,
  _connectionListener,
} as /* TODO: use satisfies */ typeof nodeHttp;
