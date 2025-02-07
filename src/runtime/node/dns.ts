import noop from "../mock/noop.ts";
import mock from "../mock/proxy.ts";
import { notImplemented, notImplementedAsync } from "../_internal/utils.ts";
import type nodeDns from "node:dns";
import promises from "./dns/promises.ts";
import * as constants from "./internal/dns/constants.ts";

export * from "./internal/dns/constants.ts";
export * as promises from "./dns/promises.ts";

export const Resolver: typeof nodeDns.Resolver =
  mock.__createMock__("dns.Resolver");
export const getDefaultResultOrder: typeof nodeDns.getDefaultResultOrder = () =>
  "verbatim";
export const getServers: typeof nodeDns.getServers = () => [];
export const lookup: typeof nodeDns.lookup =
  /*@__PURE__*/ notImplementedAsync("dns.lookup");
export const lookupService: typeof nodeDns.lookupService =
  /*@__PURE__*/ notImplementedAsync("dns.lookupService");
export const resolve: typeof nodeDns.resolve =
  /*@__PURE__*/ notImplementedAsync("dns.resolve");
export const resolve4: typeof nodeDns.resolve4 =
  /*@__PURE__*/ notImplementedAsync("dns.resolve4");
export const resolve6: typeof nodeDns.resolve6 =
  /*@__PURE__*/ notImplementedAsync("dns.resolve6");
export const resolveAny: typeof nodeDns.resolveAny =
  /*@__PURE__*/ notImplementedAsync("dns.resolveAny");
export const resolveCaa: typeof nodeDns.resolveCaa =
  /*@__PURE__*/ notImplementedAsync("dns.resolveCaa");
export const resolveCname: typeof nodeDns.resolveCname =
  /*@__PURE__*/ notImplementedAsync("dns.resolveCname");
export const resolveMx: typeof nodeDns.resolveMx =
  /*@__PURE__*/ notImplementedAsync("dns.resolveMx");
export const resolveNaptr: typeof nodeDns.resolveNaptr =
  /*@__PURE__*/ notImplementedAsync("dns.resolveNaptr");
export const resolveNs: typeof nodeDns.resolveNs =
  /*@__PURE__*/ notImplementedAsync("dns.resolveNs");
export const resolvePtr: typeof nodeDns.resolvePtr =
  /*@__PURE__*/ notImplementedAsync("dns.resolvePtr");
export const resolveSoa: typeof nodeDns.resolveSoa =
  /*@__PURE__*/ notImplementedAsync("dns.resolveSoa");
export const resolveSrv: typeof nodeDns.resolveSrv =
  /*@__PURE__*/ notImplementedAsync("dns.resolveSrv");
export const resolveTxt: typeof nodeDns.resolveTxt =
  /*@__PURE__*/ notImplementedAsync("dns.resolveTxt");

export const reverse: typeof nodeDns.reverse =
  /*@__PURE__*/ notImplemented("dns.reverse");
export const setDefaultResultOrder: typeof nodeDns.setDefaultResultOrder = noop;
export const setServers: typeof nodeDns.setServers = noop;

export default {
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
} satisfies typeof nodeDns;
