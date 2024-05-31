import noop from "../../mock/noop";
import type dgram from "node:dgram";
import { Socket } from "./internal/socket";

export { Socket } from "./internal/socket";

export const _createSocketHandle = noop;

export const createSocket: typeof dgram.createSocket = function () {
  return new Socket();
};

export default <typeof dgram>{
  Socket,
  _createSocketHandle,
  createSocket,
};
