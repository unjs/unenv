import type nodeTls from "node:tls";
import { createNotImplementedError } from "../../../_internal/utils.ts";
import { Server as _Server } from "node:net";

export class Server extends _Server implements nodeTls.Server {
  constructor(
    arg1?: nodeTls.TlsOptions | ((socket: nodeTls.TLSSocket) => void),
    arg2?: (socket: nodeTls.TLSSocket) => void,
  ) {
    super(arg1 as any, arg2 as any);
  }

  addContext(hostname: string, context: nodeTls.SecureContextOptions) {}
  setSecureContext(options: nodeTls.SecureContextOptions) {}
  setTicketKeys(_keys: Buffer) {
    throw createNotImplementedError("Server.setTicketKeys");
  }
  getTicketKeys(): Buffer {
    throw createNotImplementedError("Server.getTicketKeys");
  }
}
