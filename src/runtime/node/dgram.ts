import noop from "../mock/noop.ts";
import type dgram from "node:dgram";
import { Socket } from "./internal/dgram/socket.ts";

export { Socket } from "./internal/dgram/socket.ts";

export const _createSocketHandle = noop;

export const createSocket: typeof dgram.createSocket = function () {
  return new Socket();
};

export default <typeof dgram>{
  Socket,
  _createSocketHandle,
  createSocket,
};
