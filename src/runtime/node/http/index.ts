// https://nodejs.org/api/http.html
import type nodeHttp from "node:http";
import { notImplemented, notImplementedClass } from "../../_internal/utils";
import mock from "../../mock/proxy";
import * as consts from "./internal/consts";
// Relative stream import required, see https://github.com/unjs/unenv/issues/353
import { Readable, Writable } from "../stream";
import { IncomingMessageFactory } from "./internal/request";
import { ServerResponseFactory } from "./internal/response";
export * from "./internal/consts";

export const createServer =
  notImplemented<typeof nodeHttp.createServer>("http.createServer");
export const request = notImplemented<typeof nodeHttp.request>("http.request");
export const get = notImplemented<typeof nodeHttp.get>("http.get");

export const Server: typeof nodeHttp.Server =
  mock.__createMock__("http.Server");

export const IncomingMessage = IncomingMessageFactory(Readable);
export const ServerResponse = ServerResponseFactory(Writable);

export const OutgoingMessage: typeof nodeHttp.OutgoingMessage =
  mock.__createMock__("http.OutgoingMessage");

export const ClientRequest: typeof nodeHttp.ClientRequest =
  mock.__createMock__("http.ClientRequest");

export const Agent: typeof nodeHttp.Agent = mock.__createMock__("http.Agent");

export const globalAgent: typeof nodeHttp.globalAgent = new Agent();

export const validateHeaderName = notImplemented<
  typeof nodeHttp.validateHeaderName
>("http.validateHeaderName");

export const validateHeaderValue = notImplemented<
  typeof nodeHttp.validateHeaderValue
>("http.validateHeaderValue");

export const setMaxIdleHTTPParsers = notImplemented<
  typeof nodeHttp.setMaxIdleHTTPParsers
>("http.setMaxIdleHTTPParsers");

export const _connectionListener = notImplemented("http._connectionListener");

export const WebSocket =
  globalThis.WebSocket || notImplementedClass<WebSocket>("WebSocket");

export const CloseEvent =
  globalThis.CloseEvent || notImplementedClass<CloseEvent>("CloseEvent");

export const MessageEvent =
  globalThis.MessageEvent || notImplementedClass<MessageEvent>("MessageEvent");

export default <typeof nodeHttp>{
  ...consts,
  IncomingMessage,
  ServerResponse,
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
};
