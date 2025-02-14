import type nodeDns from "node:dns";

/*
All of these constant definitions should be of the form:

  export const CONNREFUSED: typeof dns.CONNREFUSED = "ECONNREFUSED";

However, there's currently a but in `@types/node` where all dns error code types are incorrect.
PR to fix: https://github.com/DefinitelyTyped/DefinitelyTyped/pull/69673

When this change is released and the version of @types/node is bumped, revert back to this:

  export const ADDRGETNETWORKPARAMS: typeof dns.ADDRGETNETWORKPARAMS =
    "ADDRGETNETWORKPARAMS";
  export const BADFAMILY: typeof dns.BADFAMILY = "BADFAMILY";
  export const BADFLAGS: typeof dns.BADFLAGS = "BADFLAGS";
  export const BADHINTS: typeof dns.BADHINTS = "BADHINTS";
  export const BADNAME: typeof dns.BADNAME = "BADNAME";
  export const BADQUERY: typeof dns.BADQUERY = "BADQUERY";
  export const BADRESP: typeof dns.BADRESP = "BADRESP";
  export const BADSTR: typeof dns.BADSTR = "BADSTR";
  export const CANCELLED: typeof dns.CANCELLED = "CANCELLED";
  export const CONNREFUSED: typeof dns.CONNREFUSED = "TIMEOUT";
  export const DESTRUCTION: typeof dns.DESTRUCTION = "DESTRUCTION";
  export const EOF: typeof dns.EOF = "EOF";
  export const FILE: typeof dns.FILE = "FILE";
  export const FORMERR: typeof dns.FORMERR = "FORMERR";
  export const LOADIPHLPAPI: typeof dns.LOADIPHLPAPI = "LOADIPHLPAPI";
  export const NODATA: typeof dns.NODATA = "NODATA";
  export const NOMEM: typeof dns.NOMEM = "NOMEM";
  export const NONAME: typeof dns.NONAME = "NONAME";
  export const NOTFOUND: typeof dns.NOTFOUND = "NOTFOUND";
  export const NOTIMP: typeof dns.NOTIMP = "NOTIMP";
  export const NOTINITIALIZED: typeof dns.NOTINITIALIZED = "NOTINITIALIZED";
  export const REFUSED: typeof dns.REFUSED = "REFUSED";
  export const SERVFAIL: typeof dns.SERVFAIL = "SERVFAIL";
  export const TIMEOUT: typeof dns.TIMEOUT = "TIMEOUT";
*/

export const ADDRCONFIG: typeof nodeDns.ADDRCONFIG = 0;
export const ALL: typeof nodeDns.ALL = 0;
export const V4MAPPED: typeof nodeDns.V4MAPPED = 2048;

export const ADDRGETNETWORKPARAMS =
  "EADDRGETNETWORKPARAMS" as typeof nodeDns.ADDRGETNETWORKPARAMS;
export const BADFAMILY = "EBADFAMILY" as typeof nodeDns.BADFAMILY;
export const BADFLAGS = "EBADFLAGS" as typeof nodeDns.BADFLAGS;
export const BADHINTS = "EBADHINTS" as typeof nodeDns.BADHINTS;
export const BADNAME = "EBADNAME" as typeof nodeDns.BADNAME;
export const BADQUERY = "EBADQUERY" as typeof nodeDns.BADQUERY;
export const BADRESP = "EBADRESP" as typeof nodeDns.BADRESP;
export const BADSTR = "EBADSTR" as typeof nodeDns.BADSTR;
export const CANCELLED = "ECANCELLED" as typeof nodeDns.CANCELLED;
export const CONNREFUSED = "ECONNREFUSED" as typeof nodeDns.CONNREFUSED;
export const DESTRUCTION = "EDESTRUCTION" as typeof nodeDns.DESTRUCTION;
export const EOF = "EEOF" as typeof nodeDns.EOF;
export const FILE = "EFILE" as typeof nodeDns.FILE;
export const FORMERR = "EFORMERR" as typeof nodeDns.FORMERR;
export const LOADIPHLPAPI = "ELOADIPHLPAPI" as typeof nodeDns.LOADIPHLPAPI;
export const NODATA = "ENODATA" as typeof nodeDns.NODATA;
export const NOMEM = "ENOMEM" as typeof nodeDns.NOMEM;
export const NONAME = "ENONAME" as typeof nodeDns.NONAME;
export const NOTFOUND = "ENOTFOUND" as typeof nodeDns.NOTFOUND;
export const NOTIMP = "ENOTIMP" as typeof nodeDns.NOTIMP;
export const NOTINITIALIZED =
  "ENOTINITIALIZED" as typeof nodeDns.NOTINITIALIZED;
export const REFUSED = "EREFUSED" as typeof nodeDns.REFUSED;
export const SERVFAIL = "ESERVFAIL" as typeof nodeDns.SERVFAIL;
export const TIMEOUT = "ETIMEOUT" as typeof nodeDns.TIMEOUT;
