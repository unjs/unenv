import type dns from "node:dns";

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

export const ADDRCONFIG: typeof dns.ADDRCONFIG = 0;
export const ALL: typeof dns.ALL = 0;
export const V4MAPPED: typeof dns.V4MAPPED = 2048;

export const ADDRGETNETWORKPARAMS =
  "EADDRGETNETWORKPARAMS" as typeof dns.ADDRGETNETWORKPARAMS;
export const BADFAMILY = "EBADFAMILY" as typeof dns.BADFAMILY;
export const BADFLAGS = "EBADFLAGS" as typeof dns.BADFLAGS;
export const BADHINTS = "EBADHINTS" as typeof dns.BADHINTS;
export const BADNAME = "EBADNAME" as typeof dns.BADNAME;
export const BADQUERY = "EBADQUERY" as typeof dns.BADQUERY;
export const BADRESP = "EBADRESP" as typeof dns.BADRESP;
export const BADSTR = "EBADSTR" as typeof dns.BADSTR;
export const CANCELLED = "ECANCELLED" as typeof dns.CANCELLED;
export const CONNREFUSED = "ECONNREFUSED" as typeof dns.CONNREFUSED;
export const DESTRUCTION = "EDESTRUCTION" as typeof dns.DESTRUCTION;
export const EOF = "EEOF" as typeof dns.EOF;
export const FILE = "EFILE" as typeof dns.FILE;
export const FORMERR = "EFORMERR" as typeof dns.FORMERR;
export const LOADIPHLPAPI = "ELOADIPHLPAPI" as typeof dns.LOADIPHLPAPI;
export const NODATA = "ENODATA" as typeof dns.NODATA;
export const NOMEM = "ENOMEM" as typeof dns.NOMEM;
export const NONAME = "ENONAME" as typeof dns.NONAME;
export const NOTFOUND = "ENOTFOUND" as typeof dns.NOTFOUND;
export const NOTIMP = "ENOTIMP" as typeof dns.NOTIMP;
export const NOTINITIALIZED = "ENOTINITIALIZED" as typeof dns.NOTINITIALIZED;
export const REFUSED = "EREFUSED" as typeof dns.REFUSED;
export const SERVFAIL = "ESERVFAIL" as typeof dns.SERVFAIL;
export const TIMEOUT = "ETIMEOUT" as typeof dns.TIMEOUT;
