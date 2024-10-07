import type tls from "node:tls";
import { createNotImplementedError } from "../../../_internal/utils";
import { Server as _Server } from "../../net";

export class Server extends _Server implements tls.Server {
  constructor(
    arg1?: tls.TlsOptions | ((socket: tls.TLSSocket) => void),
    arg2?: (socket: tls.TLSSocket) => void,
  ) {
    super(arg1 as any, arg2 as any);
  }

  addContext(hostname: string, context: tls.SecureContextOptions) {}
  setSecureContext(options: tls.SecureContextOptions) {}
  setTicketKeys(_keys: Buffer) {
    throw createNotImplementedError("Server.setTicketKeys");
  }
  getTicketKeys(): Buffer {
    throw createNotImplementedError("Server.getTicketKeys");
  }
}
