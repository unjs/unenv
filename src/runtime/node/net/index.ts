// https://nodejs.org/api/net.html
import type net from "node:net";
import { notImplemented } from "../../_internal/utils";
import * as socket from "./socket";

export * from "./socket";

export const createServer = notImplemented(
  "net.createServer"
) as typeof net.createServer;

export const connect = notImplemented("net.connect") as typeof net.connect;

export const createConnection = notImplemented(
  "net.createConnection"
) as typeof net.createConnection;

export default <typeof net>{
  ...socket,
  createServer,
  connect,
  createConnection,
};
