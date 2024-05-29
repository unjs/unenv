import { notImplemented } from "../../_internal/utils";
import type tls from "node:tls";
import { Socket } from "node:net";

export class TLSSocket extends Socket implements tls.TLSSocket {
  exportKeyingMaterial = notImplemented("TLSSocket.exportKeyingMaterial ");
  getCipher = notImplemented("TLSSocket.getCipher");
  getPeerCertificate = notImplemented("TLSSocket.getPeerCertificate");

  authorized = false;
  authorizationError: Error = new Error(
    "[unenv] TLSSocket.authorizationError is not implemented yet!",
  );
  // eslint-disable-next-line @typescript-eslint/prefer-as-const
  encrypted: true = true;
  alpnProtocol = null;
  getCertificate() {
    return null;
  }
  getEphemeralKeyInfo() {
    return null;
  }
  getFinished() {
    return undefined;
  }
  getPeerFinished() {
    return undefined;
  }
  getProtocol() {
    return null;
  }
  getSession() {
    return undefined;
  }
  getSharedSigalgs() {
    return [];
  }
  getTLSTicket() {
    return undefined;
  }
  isSessionReused() {
    return false;
  }
  renegotiate(
    options: {
      rejectUnauthorized?: boolean | undefined;
      requestCert?: boolean | undefined;
    },
    callback: (err: Error | null) => void,
  ) {
    return undefined;
  }
  setMaxSendFragment(size: number) {
    return false;
  }
  disableRenegotiation() {}
  enableTrace() {}
  getPeerX509Certificate() {
    return undefined;
  }
  getX509Certificate() {
    return undefined;
  }
}
