import type nodeTls from "node:tls";
import { Socket } from "node:net";
import { createNotImplementedError } from "../../../_internal/utils.ts";

export class TLSSocket extends Socket implements nodeTls.TLSSocket {
  authorized = false;
  encrypted = true as const;
  alpnProtocol = null;
  authorizationError: Error = new Error(
    "[unenv] TLSSocket.authorizationError is not implemented yet!",
  );
  exportKeyingMaterial(): Buffer {
    throw createNotImplementedError("TLSSocket.exportKeyingMaterial");
  }
  getCipher(): nodeTls.CipherNameAndProtocol {
    throw createNotImplementedError("TLSSocket.getCipher");
  }
  getPeerCertificate(detailed: true): nodeTls.DetailedPeerCertificate;
  getPeerCertificate(detailed?: false): nodeTls.PeerCertificate;
  getPeerCertificate(
    detailed?: boolean,
  ): nodeTls.PeerCertificate | nodeTls.DetailedPeerCertificate;
  getPeerCertificate(
    _detailed?: boolean,
  ): nodeTls.PeerCertificate | nodeTls.DetailedPeerCertificate {
    throw createNotImplementedError("TLSSocket.getPeerCertificate");
  }
  getCertificate() {
    return null;
  }
  getEphemeralKeyInfo() {
    return null;
  }
  getFinished(): undefined {}
  getPeerFinished(): undefined {}
  getProtocol() {
    return null;
  }
  getSession(): undefined {}
  getSharedSigalgs() {
    return [];
  }
  getTLSTicket(): undefined {}
  isSessionReused() {
    return false;
  }
  renegotiate(
    options: {
      rejectUnauthorized?: boolean | undefined;
      requestCert?: boolean | undefined;
    },
    callback: (err: Error | null) => void,
  ): undefined {
    if (typeof callback === "function") {
      callback(null);
    }
  }
  setMaxSendFragment(size: number) {
    return false;
  }
  disableRenegotiation() {}
  enableTrace() {}
  getPeerX509Certificate(): undefined {}
  getX509Certificate(): undefined {}
}
