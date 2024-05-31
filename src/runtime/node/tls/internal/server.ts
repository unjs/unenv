import type tls from "node:tls";
import { createNotImplementedError } from "../../../_internal/utils";
import { Server as _Server } from "node:net";

export class Server extends _Server implements tls.Server {
  addContext(hostname: string, context: tls.SecureContextOptions) {}
  setSecureContext(options: tls.SecureContextOptions) {}
  setTicketKeys(_keys: Buffer) {
    throw createNotImplementedError("Server.setTicketKeys");
  }
  getTicketKeys(): Buffer {
    throw createNotImplementedError("Server.getTicketKeys");
  }
}
