import type tls from "node:tls";

export class SecureContext implements tls.SecureContext {
  context = {};
}
