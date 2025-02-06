// https://www.npmjs.com/package/whatwg-url
import { notImplemented } from "../_internal/utils.ts";

export const URL = globalThis.URL;
export const URLSearchParams = globalThis.URLSearchParams;

export const parseURL = notImplemented("whatwg-url.parseURL");
export const basicURLParse = notImplemented("whatwg-url.basicURLParse");
export const serializeURL = notImplemented("whatwg-url.serializeURL");
export const serializeHost = notImplemented("whatwg-url.serializeHost");
export const serializeInteger = notImplemented("whatwg-url.serializeInteger");
export const serializeURLOrigin = notImplemented(
  "whatwg-url.serializeURLOrigin",
);
export const setTheUsername = notImplemented("whatwg-url.setTheUsername");
export const setThePassword = notImplemented("whatwg-url.setThePassword");
export const cannotHaveAUsernamePasswordPort = notImplemented(
  "whatwg-url.cannotHaveAUsernamePasswordPort",
);
export const percentDecodeBytes = notImplemented(
  "whatwg-url.percentDecodeBytes",
);
export const percentDecodeString = notImplemented(
  "whatwg-url.percentDecodeString",
);
