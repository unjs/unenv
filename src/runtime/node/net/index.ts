// https://nodejs.org/api/net.html
import type net from "node:net";
import * as socket from "./socket";

export * from "./socket";

export default <typeof net>{
  ...socket,
};
