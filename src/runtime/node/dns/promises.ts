import noop from "../../mock/noop.ts";
import {
  notImplemented,
  notImplementedAsync,
  notImplementedClass,
} from "../../_internal/utils.ts";
import type nodeDnsPromises from "node:dns/promises";

// prettier-ignore
import {
  NODATA, FORMERR, SERVFAIL, NOTFOUND, NOTIMP, REFUSED, BADQUERY, BADNAME, BADFAMILY, BADRESP, CONNREFUSED, TIMEOUT, EOF, FILE, NOMEM, DESTRUCTION, BADSTR, BADFLAGS, NONAME, BADHINTS, NOTINITIALIZED, LOADIPHLPAPI, ADDRGETNETWORKPARAMS, CANCELLED
} from "../internal/dns/constants.ts";

// prettier-ignore
export {
  NODATA, FORMERR, SERVFAIL, NOTFOUND, NOTIMP, REFUSED, BADQUERY, BADNAME, BADFAMILY, BADRESP, CONNREFUSED, TIMEOUT, EOF, FILE, NOMEM, DESTRUCTION, BADSTR, BADFLAGS, NONAME, BADHINTS, NOTINITIALIZED, LOADIPHLPAPI, ADDRGETNETWORKPARAMS, CANCELLED
} from "../internal/dns/constants.ts";

export const Resolver: typeof nodeDnsPromises.Resolver =
  /*@__PURE__*/ notImplementedClass("dns.Resolver");

export const getDefaultResultOrder: typeof nodeDnsPromises.getDefaultResultOrder =
  () => "verbatim";

export const getServers: typeof nodeDnsPromises.getServers = () => [];

export const lookup: typeof nodeDnsPromises.lookup =
  /*@__PURE__*/ notImplementedAsync("dns.lookup");

export const lookupService: typeof nodeDnsPromises.lookupService =
  /*@__PURE__*/ notImplementedAsync("dns.lookupService");

export const resolve: typeof nodeDnsPromises.resolve =
  /*@__PURE__*/ notImplementedAsync("dns.resolve");

export const resolve4: typeof nodeDnsPromises.resolve4 =
  /*@__PURE__*/ notImplementedAsync("dns.resolve4");

export const resolve6: typeof nodeDnsPromises.resolve6 =
  /*@__PURE__*/ notImplementedAsync("dns.resolve6");

export const resolveAny: typeof nodeDnsPromises.resolveAny =
  /*@__PURE__*/ notImplementedAsync("dns.resolveAny");

export const resolveCaa: typeof nodeDnsPromises.resolveCaa =
  /*@__PURE__*/ notImplementedAsync("dns.resolveCaa");

export const resolveCname: typeof nodeDnsPromises.resolveCname =
  /*@__PURE__*/ notImplementedAsync("dns.resolveCname");

export const resolveMx: typeof nodeDnsPromises.resolveMx =
  /*@__PURE__*/ notImplementedAsync("dns.resolveMx");

export const resolveNaptr: typeof nodeDnsPromises.resolveNaptr =
  /*@__PURE__*/ notImplementedAsync("dns.resolveNaptr");

export const resolveNs: typeof nodeDnsPromises.resolveNs =
  /*@__PURE__*/ notImplementedAsync("dns.resolveNs");

export const resolvePtr: typeof nodeDnsPromises.resolvePtr =
  /*@__PURE__*/ notImplementedAsync("dns.resolvePtr");

export const resolveSoa: typeof nodeDnsPromises.resolveSoa =
  /*@__PURE__*/ notImplementedAsync("dns.resolveSoa");

export const resolveSrv: typeof nodeDnsPromises.resolveSrv =
  /*@__PURE__*/ notImplementedAsync("dns.resolveSrv");

export const resolveTxt: typeof nodeDnsPromises.resolveTxt =
  /*@__PURE__*/ notImplementedAsync("dns.resolveTxt");

export const reverse: typeof nodeDnsPromises.reverse =
  /*@__PURE__*/ notImplemented("dns.reverse");

export const setDefaultResultOrder: typeof nodeDnsPromises.setDefaultResultOrder =
  noop;

export const setServers: typeof nodeDnsPromises.setServers = noop;

// prettier-ignore
export default {
  NODATA, FORMERR, SERVFAIL, NOTFOUND, NOTIMP, REFUSED, BADQUERY, BADNAME, BADFAMILY, BADRESP, CONNREFUSED, TIMEOUT, EOF, FILE, NOMEM, DESTRUCTION, BADSTR, BADFLAGS, NONAME, BADHINTS, NOTINITIALIZED, LOADIPHLPAPI, ADDRGETNETWORKPARAMS, CANCELLED,
  Resolver,
  getDefaultResultOrder,
  getServers,
  lookup,
  lookupService,
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
} satisfies typeof nodeDnsPromises;
