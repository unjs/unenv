// https://nodejs.org/api/util.html
import type nodeUtil from "node:util";
import { notImplemented } from "../_internal/utils.ts";
import inherits from "../npm/inherits.ts";
import * as legacyTypes from "./internal/util/legacy-types.ts";
import * as logUtils from "./internal/util/log.ts";
import types from "./util/types.ts";
import { promisify } from "./internal/util/promisify.ts";
import * as mime from "./internal/util/mime.ts";

export * from "./internal/util/mime.ts";
export * from "./internal/util/legacy-types.ts";
export * from "./internal/util/log.ts";

export { default as inherits } from "../npm/inherits.ts";
export { promisify } from "./internal/util/promisify.ts";
export { default as types } from "./util/types.ts";

// @ts-ignore
export const TextDecoder: typeof nodeUtil.TextDecoder = globalThis.TextDecoder;

// @ts-ignore
export const TextEncoder: typeof nodeUtil.TextEncoder = globalThis.TextEncoder;

export const deprecate: typeof nodeUtil.deprecate = (fn) => fn;

export const _errnoException = /*@__PURE__*/ notImplemented(
  "util._errnoException",
);
export const _exceptionWithHostPort = /*@__PURE__*/ notImplemented(
  "util._exceptionWithHostPort",
);
export const _extend = /*@__PURE__*/ notImplemented("util._extend");

export const aborted =
  /*@__PURE__*/ notImplemented<typeof nodeUtil.aborted>("util.aborted");
export const callbackify =
  /*@__PURE__*/ notImplemented<typeof nodeUtil.callbackify>("util.callbackify");
export const getSystemErrorMap = /*@__PURE__*/ notImplemented<
  typeof nodeUtil.getSystemErrorMap
>("util.getSystemErrorMap");
export const getSystemErrorName = /*@__PURE__*/ notImplemented<
  typeof nodeUtil.getSystemErrorName
>("util.getSystemErrorName");
export const toUSVString =
  /*@__PURE__*/ notImplemented<typeof nodeUtil.toUSVString>("util.toUSVString");
export const stripVTControlCharacters = /*@__PURE__*/ notImplemented<
  typeof nodeUtil.stripVTControlCharacters
>("util.stripVTControlCharacters");

export const transferableAbortController = /*@__PURE__*/ notImplemented<
  typeof nodeUtil.transferableAbortController
>("util.transferableAbortController");
export const transferableAbortSignal = /*@__PURE__*/ notImplemented<
  typeof nodeUtil.transferableAbortSignal
>("util.transferableAbortSignal");
export const parseArgs =
  /*@__PURE__*/ notImplemented<typeof nodeUtil.parseArgs>("util.parseArgs");

export const parseEnv =
  /*@__PURE__*/ notImplemented<typeof nodeUtil.parseEnv>("util.parseEnv");

export const styleText =
  /*@__PURE__*/ notImplemented<typeof nodeUtil.styleText>("util.styleText");

/** @deprecated */
export const getCallSite = /*@__PURE__*/ notImplemented("util.getCallSite");

export const getCallSites =
  /*@__PURE__*/ notImplemented<typeof nodeUtil.getCallSites>(
    "util.getCallSites",
  );

export const getSystemErrorMessage = /*@__PURE__*/ notImplemented<
  typeof nodeUtil.getSystemErrorMessage
>("util.getSystemErrorMessage");

export default {
  _errnoException,
  _exceptionWithHostPort,
  _extend,
  aborted,
  callbackify,
  deprecate,
  getCallSite,
  getCallSites,
  getSystemErrorMessage,
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
} as /* TODO: use satisfies */ typeof nodeUtil;
