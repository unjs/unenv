// https://nodejs.org/api/util.html
import type util from "node:util";
import { notImplemented } from "../../_internal/utils";
import inherits from "../../npm/inherits";
import * as legacyTypes from "./internal/legacy-types";
import * as logUtils from "./internal/log";
import types from "./types";
import { promisify } from "./internal/promisify";
import * as mime from "./internal/mime";

export * from "./internal/mime";
export * from "./internal/legacy-types";
export * from "./internal/log";

export { default as inherits } from "../../npm/inherits";
export { promisify } from "./internal/promisify";
export { default as types } from "./types";

// @ts-ignore
export const TextDecoder: typeof util.TextDecoder = globalThis.TextDecoder;

// @ts-ignore
export const TextEncoder: typeof util.TextEncoder = globalThis.TextEncoder;

export const deprecate: typeof util.deprecate = (fn) => fn;

export const _errnoException = notImplemented("util._errnoException");
export const _exceptionWithHostPort = notImplemented(
  "util._exceptionWithHostPort",
);
export const _extend = notImplemented("util._extend");

export const aborted = notImplemented<typeof util.aborted>("util.aborted");
export const callbackify =
  notImplemented<typeof util.callbackify>("util.callbackify");
export const getSystemErrorMap = notImplemented<typeof util.getSystemErrorMap>(
  "util.getSystemErrorMap",
);
export const getSystemErrorName = notImplemented<
  typeof util.getSystemErrorName
>("util.getSystemErrorName");
export const toUSVString =
  notImplemented<typeof util.toUSVString>("util.toUSVString");
export const stripVTControlCharacters = notImplemented<
  typeof util.stripVTControlCharacters
>("util.stripVTControlCharacters");

export const transferableAbortController = notImplemented<
  typeof util.transferableAbortController
>("util.transferableAbortController");
export const transferableAbortSignal = notImplemented<
  typeof util.transferableAbortSignal
>("util.transferableAbortSignal");
export const parseArgs =
  notImplemented<typeof util.parseArgs>("util.parseArgs");

export const parseEnv = notImplemented<typeof util.parseEnv>("util.parseEnv");

export const styleText =
  notImplemented<typeof util.styleText>("util.styleText");

export const getCallSite =
  notImplemented<typeof util.getCallSite>("util.getCallSites");

export default <typeof util>{
  _errnoException,
  _exceptionWithHostPort,
  _extend,
  aborted,
  callbackify,
  deprecate,
  getCallSite,
  getSystemErrorMap,
  getSystemErrorName,
  inherits,
  promisify,
  stripVTControlCharacters,
  toUSVString,
  TextDecoder,
  TextEncoder,
  types,
  transferableAbortController,
  transferableAbortSignal,
  parseArgs,
  parseEnv,
  styleText,
  ...mime,
  ...logUtils,
  ...legacyTypes,
};
