import type tls from "node:tls";
// Relative net import required, see https://github.com/unjs/unenv/issues/353
import { Socket } from "../../net";
import { createNotImplementedError } from "../../../_internal/utils";

export class TLSSocket extends Socket implements tls.TLSSocket {
  authorized = false;
  encrypted = true as const;
  alpnProtocol = null;
  authorizationError: Error = new Error(
    "[unenv] TLSSocket.authorizationError is not implemented yet!",
  );
  exportKeyingMaterial(): Buffer {
    throw createNotImplementedError("TLSSocket.exportKeyingMaterial");
  }
  getCipher(): tls.CipherNameAndProtocol {
    throw createNotImplementedError("TLSSocket.getCipher");
  }
  getPeerCertificate(detailed: true): tls.DetailedPeerCertificate;
  getPeerCertificate(detailed?: false): tls.PeerCertificate;
  getPeerCertificate(
    detailed?: boolean,
  ): tls.PeerCertificate | tls.DetailedPeerCertificate;
  getPeerCertificate(
    _detailed?: boolean,
  ): tls.PeerCertificate | tls.DetailedPeerCertificate {
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
