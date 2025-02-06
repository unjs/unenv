import noop from "../mock/noop.ts";
import mock from "../mock/proxy.ts";
import { notImplemented, notImplementedAsync } from "../_internal/utils.ts";
import type dns from "node:dns";
import promises from "./dns/promises.ts";
import * as constants from "./internal/dns/constants.ts";

export * from "./internal/dns/constants.ts";
export * as promises from "./dns/promises.ts";

export const Resolver: typeof dns.Resolver =
  mock.__createMock__("dns.Resolver");
export const getDefaultResultOrder: typeof dns.getDefaultResultOrder = () =>
  "verbatim";
export const getServers: typeof dns.getServers = () => [];
export const lookup: typeof dns.lookup =
  /*@__PURE__*/ notImplementedAsync("dns.lookup");
export const lookupService: typeof dns.lookupService =
  /*@__PURE__*/ notImplementedAsync("dns.lookupService");
export const resolve: typeof dns.resolve =
  /*@__PURE__*/ notImplementedAsync("dns.resolve");
export const resolve4: typeof dns.resolve4 =
  /*@__PURE__*/ notImplementedAsync("dns.resolve4");
export const resolve6: typeof dns.resolve6 =
  /*@__PURE__*/ notImplementedAsync("dns.resolve6");
export const resolveAny: typeof dns.resolveAny =
  /*@__PURE__*/ notImplementedAsync("dns.resolveAny");
export const resolveCaa: typeof dns.resolveCaa =
  /*@__PURE__*/ notImplementedAsync("dns.resolveCaa");
export const resolveCname: typeof dns.resolveCname =
  /*@__PURE__*/ notImplementedAsync("dns.resolveCname");
export const resolveMx: typeof dns.resolveMx =
  /*@__PURE__*/ notImplementedAsync("dns.resolveMx");
export const resolveNaptr: typeof dns.resolveNaptr =
  /*@__PURE__*/ notImplementedAsync("dns.resolveNaptr");
export const resolveNs: typeof dns.resolveNs =
  /*@__PURE__*/ notImplementedAsync("dns.resolveNs");
export const resolvePtr: typeof dns.resolvePtr =
  /*@__PURE__*/ notImplementedAsync("dns.resolvePtr");
export const resolveSoa: typeof dns.resolveSoa =
  /*@__PURE__*/ notImplementedAsync("dns.resolveSoa");
export const resolveSrv: typeof dns.resolveSrv =
  /*@__PURE__*/ notImplementedAsync("dns.resolveSrv");
export const resolveTxt: typeof dns.resolveTxt =
  /*@__PURE__*/ notImplementedAsync("dns.resolveTxt");

export const reverse: typeof dns.reverse =
  /*@__PURE__*/ notImplemented("dns.reverse");
export const setDefaultResultOrder: typeof dns.setDefaultResultOrder = noop;
export const setServers: typeof dns.setServers = noop;

export default <typeof dns>{
  ...constants,
  Resolver,
  getDefaultResultOrder,
  getServers,
  lookup,
  lookupService,
  promises,
  resolve,
  resolve4,
  resolve6,
  resolveAny,
  resolveCaa,
  resolveCname,
  resolveMx,
  resolveNaptr,
  resolveNs,
  resolvePtr,
  resolveSoa,
  resolveSrv,
  resolveTxt,
  reverse,
  setDefaultResultOrder,
  setServers,
};
