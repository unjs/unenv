import type nodeTls from "node:tls";

export class SecureContext implements nodeTls.SecureContext {
  context = {};
}
