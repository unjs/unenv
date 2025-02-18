import noop from "../mock/noop.ts";
import {
  notImplemented,
  notImplementedAsync,
  notImplementedClass,
} from "../_internal/utils.ts";
import type nodeDns from "node:dns";

import promises from "node:dns/promises";

export { promises };

export const Resolver: typeof nodeDns.Resolver =
  /*@__PURE__*/ notImplementedClass("dns.Resolver");

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

// prettier-ignore
import {
  NODATA, FORMERR, SERVFAIL, NOTFOUND, NOTIMP, REFUSED, BADQUERY, BADNAME, BADFAMILY, BADRESP, CONNREFUSED, TIMEOUT, EOF, FILE, NOMEM, DESTRUCTION, BADSTR, BADFLAGS, NONAME, BADHINTS, NOTINITIALIZED, LOADIPHLPAPI, ADDRGETNETWORKPARAMS, CANCELLED, ADDRCONFIG, ALL, V4MAPPED
} from "./internal/dns/constants.ts";

// prettier-ignore
export {
  NODATA, FORMERR, SERVFAIL, NOTFOUND, NOTIMP, REFUSED, BADQUERY, BADNAME, BADFAMILY, BADRESP, CONNREFUSED, TIMEOUT, EOF, FILE, NOMEM, DESTRUCTION, BADSTR, BADFLAGS, NONAME, BADHINTS, NOTINITIALIZED, LOADIPHLPAPI, ADDRGETNETWORKPARAMS, CANCELLED, ADDRCONFIG, ALL, V4MAPPED
} from "./internal/dns/constants.ts";

// prettier-ignore
export default {
  NODATA, FORMERR, SERVFAIL, NOTFOUND, NOTIMP, REFUSED, BADQUERY, BADNAME, BADFAMILY, BADRESP, CONNREFUSED, TIMEOUT, EOF, FILE, NOMEM, DESTRUCTION, BADSTR, BADFLAGS, NONAME, BADHINTS, NOTINITIALIZED, LOADIPHLPAPI, ADDRGETNETWORKPARAMS, CANCELLED, ADDRCONFIG, ALL, V4MAPPED,
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
