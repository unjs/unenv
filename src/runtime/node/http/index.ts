// https://nodejs.org/api/http.html
import type http from "node:http";
import { notImplemented } from "../../_internal/utils";
import mock from "../../mock/proxy";
import * as consts from "./_consts";
import { IncomingMessage } from "./_request";
import { ServerResponse } from "./_response";

export * from "./_consts";
export * from "./_request";
export * from "./_response";

export const createServer: typeof http.createServer = notImplemented("http.createServer");
export const request: typeof http.request = notImplemented("http.request");
export const get: typeof http.get = notImplemented("http.get");

export const Server: typeof http.Server = mock.__createMock__("http.Server");
export const OutgoingMessage: typeof http.OutgoingMessage = mock.__createMock__("http.OutgoingMessage");
export const ClientRequest: typeof http.ClientRequest = mock.__createMock__("http.ClientRequest");
export const Agent: typeof http.Agent = mock.__createMock__("http.Agent");
export const globalAgent: typeof http.globalAgent = new Agent();

export default <typeof http> {
  ...consts,
  IncomingMessage: IncomingMessage as any as typeof http.IncomingMessage,
  ServerResponse: ServerResponse as any as typeof http.ServerResponse,
  createServer,
  request,
  get,
  Server,
  OutgoingMessage,
  ClientRequest,
  Agent,
  globalAgent
};
