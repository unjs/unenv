import noop from "../../mock/noop";
import mock from "../../mock/proxy";
import { notImplemented, notImplementedAsync } from "../../_internal/utils";
import type dns from "node:dns";
import * as constants from "./constants";
import promises from "./promises";
export * from "./constants";

export const Resolver: typeof dns.Resolver =
  mock.__createMock__("dns.Resolver");
export const getDefaultResultOrder: typeof dns.getDefaultResultOrder = () =>
  "verbatim";
export const getServers: typeof dns.getServers = () => [];
export const lookup: typeof dns.lookup = notImplementedAsync("dns.lookup");
export const lookupService: typeof dns.lookupService =
  notImplementedAsync("dns.lookupService");
export const resolve: typeof dns.resolve = notImplementedAsync("dns.resolve");
export const resolve4: typeof dns.resolve4 =
  notImplementedAsync("dns.resolve4");
export const resolve6: typeof dns.resolve6 =
  notImplementedAsync("dns.resolve6");
export const resolveAny: typeof dns.resolveAny =
  notImplementedAsync("dns.resolveAny");
export const resolveCaa: typeof dns.resolveCaa =
  notImplementedAsync("dns.resolveCaa");
export const resolveCname: typeof dns.resolveCname =
  notImplementedAsync("dns.resolveCname");
export const resolveMx: typeof dns.resolveMx =
  notImplementedAsync("dns.resolveMx");
export const resolveNaptr: typeof dns.resolveNaptr =
  notImplementedAsync("dns.resolveNaptr");
export const resolveNs: typeof dns.resolveNs =
  notImplementedAsync("dns.resolveNs");
export const resolvePtr: typeof dns.resolvePtr =
  notImplementedAsync("dns.resolvePtr");
export const resolveSoa: typeof dns.resolveSoa =
  notImplementedAsync("dns.resolveSoa");
export const resolveSrv: typeof dns.resolveSrv =
  notImplementedAsync("dns.resolveSrv");
export const resolveTxt: typeof dns.resolveTxt =
  notImplementedAsync("dns.resolveTxt");

export const reverse: typeof dns.reverse = notImplemented("dns.reverse");
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
