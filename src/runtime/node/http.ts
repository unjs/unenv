// https://nodejs.org/api/http.html
import type http from "node:http";
import { notImplemented, notImplementedClass } from "../_internal/utils";
import mock from "../mock/proxy";
import * as consts from "./internal/http/consts";
import { IncomingMessage } from "./internal/http/request";
import { ServerResponse } from "./internal/http/response";

export * from "./internal/http/consts";
export * from "./internal/http/request";
export * from "./internal/http/response";

export const createServer =
  notImplemented<typeof http.createServer>("http.createServer");
export const request = notImplemented<typeof http.request>("http.request");
export const get = notImplemented<typeof http.get>("http.get");

export const Server: typeof http.Server = mock.__createMock__("http.Server");

export const OutgoingMessage: typeof http.OutgoingMessage = mock.__createMock__(
  "http.OutgoingMessage",
);

export const ClientRequest: typeof http.ClientRequest =
  mock.__createMock__("http.ClientRequest");

export const Agent: typeof http.Agent = mock.__createMock__("http.Agent");

export const globalAgent: typeof http.globalAgent = new Agent();

export const validateHeaderName = notImplemented<
  typeof http.validateHeaderName
>("http.validateHeaderName");

export const validateHeaderValue = notImplemented<
  typeof http.validateHeaderValue
>("http.validateHeaderValue");

export const setMaxIdleHTTPParsers = notImplemented<
  typeof http.setMaxIdleHTTPParsers
>("http.setMaxIdleHTTPParsers");

export const _connectionListener = /*@__PURE__*/ notImplemented(
  "http._connectionListener",
);

export const WebSocket =
  globalThis.WebSocket || notImplementedClass<WebSocket>("WebSocket");

export const CloseEvent =
  globalThis.CloseEvent || notImplementedClass<CloseEvent>("CloseEvent");

export const MessageEvent =
  globalThis.MessageEvent || notImplementedClass<MessageEvent>("MessageEvent");

export default <typeof http>{
  ...consts,
  IncomingMessage: IncomingMessage as any as typeof http.IncomingMessage,
  ServerResponse: ServerResponse as any as typeof http.ServerResponse,
  WebSocket: WebSocket as any as typeof http.WebSocket,
  CloseEvent: CloseEvent as any as typeof http.CloseEvent,
  MessageEvent: MessageEvent as any as typeof http.MessageEvent,
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
};
