import { createNotImplementedError } from "../../_internal/utils";
import type tls from "node:tls";
import { Socket } from "node:net";

export class TLSSocket extends Socket implements tls.TLSSocket {
  authorized = false;
  authorizationError: Error = new Error(
    "[unenv] TLSSocket.authorizationError is not implemented yet!",
  );
  // @ts-ignore
  encrypted = true;
  alpnProtocol = null;
  // @ts-ignore
  exportKeyingMaterial() {
    throw createNotImplementedError("TLSSocket.exportKeyingMaterial");
  }
  // @ts-ignore
  getCipher() {
    throw createNotImplementedError("TLSSocket.getCipher");
  }
  // @ts-ignore
  getPeerCertificate() {
    throw createNotImplementedError("TLSSocket.getPeerCertificate");
  }
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
    if (typeof callback === "function") {
      callback(null);
    }
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
