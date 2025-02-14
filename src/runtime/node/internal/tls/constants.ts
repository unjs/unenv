import type nodeTls from "node:tls";

export const CLIENT_RENEG_LIMIT: typeof nodeTls.CLIENT_RENEG_LIMIT = 0;
export const CLIENT_RENEG_WINDOW: typeof nodeTls.CLIENT_RENEG_WINDOW = 0;
export const DEFAULT_CIPHERS: typeof nodeTls.DEFAULT_CIPHERS = "";
export const DEFAULT_ECDH_CURVE: typeof nodeTls.DEFAULT_ECDH_CURVE = "";
export const DEFAULT_MAX_VERSION: typeof nodeTls.DEFAULT_MAX_VERSION =
  "TLSv1.3";
export const DEFAULT_MIN_VERSION: typeof nodeTls.DEFAULT_MIN_VERSION =
  "TLSv1.2";
