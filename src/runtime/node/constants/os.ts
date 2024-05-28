export const UV_UDP_REUSEADDR = 4;

// dlopen
export const RTLD_LAZY = 1;
export const RTLD_NOW = 2;
export const RTLD_GLOBAL = 8;
export const RTLD_LOCAL = 4;
export const RTLD_DEEPBIND = 16;

//errno
export const E2BIG = 7;
export const EACCES = 13;
export const EADDRINUSE = 48;
export const EADDRNOTAVAIL = 49;
export const EAFNOSUPPORT = 47;
export const EAGAIN = 35;
export const EALREADY = 37;
export const EBADF = 9;
export const EBADMSG = 94;
export const EBUSY = 16;
export const ECANCELED = 89;
export const ECHILD = 10;
export const ECONNABORTED = 53;
export const ECONNREFUSED = 61;
export const ECONNRESET = 54;
export const EDEADLK = 11;
export const EDESTADDRREQ = 39;
export const EDOM = 33;
export const EDQUOT = 69;
export const EEXIST = 17;
export const EFAULT = 14;
export const EFBIG = 27;
export const EHOSTUNREACH = 65;
export const EIDRM = 90;
export const EILSEQ = 92;
export const EINPROGRESS = 36;
export const EINTR = 4;
export const EINVAL = 22;
export const EIO = 5;
export const EISCONN = 56;
export const EISDIR = 21;
export const ELOOP = 62;
export const EMFILE = 24;
export const EMLINK = 31;
export const EMSGSIZE = 40;
export const EMULTIHOP = 95;
export const ENAMETOOLONG = 63;
export const ENETDOWN = 50;
export const ENETRESET = 52;
export const ENETUNREACH = 51;
export const ENFILE = 23;
export const ENOBUFS = 55;
export const ENODATA = 96;
export const ENODEV = 19;
export const ENOENT = 2;
export const ENOEXEC = 8;
export const ENOLCK = 77;
export const ENOLINK = 97;
export const ENOMEM = 12;
export const ENOMSG = 91;
export const ENOPROTOOPT = 42;
export const ENOSPC = 28;
export const ENOSR = 98;
export const ENOSTR = 99;
export const ENOSYS = 78;
export const ENOTCONN = 57;
export const ENOTDIR = 20;
export const ENOTEMPTY = 66;
export const ENOTSOCK = 38;
export const ENOTSUP = 45;
export const ENOTTY = 25;
export const ENXIO = 6;
export const EOPNOTSUPP = 102;
export const EOVERFLOW = 84;
export const EPERM = 1;
export const EPIPE = 32;
export const EPROTO = 100;
export const EPROTONOSUPPORT = 43;
export const EPROTOTYPE = 41;
export const ERANGE = 34;
export const EROFS = 30;
export const ESPIPE = 29;
export const ESRCH = 3;
export const ESTALE = 70;
export const ETIME = 101;
export const ETIMEDOUT = 60;
export const ETXTBSY = 26;
export const EWOULDBLOCK = 35;
export const EXDEV = 18;
export const WSAEINTR = 10_004;
export const WSAEBADF = 10_009;
export const WSAEACCES = 10_013;
export const WSAEFAULT = 10_014;
export const WSAEINVAL = 10_022;
export const WSAEMFILE = 10_024;
export const WSAEWOULDBLOCK = 10_035;
export const WSAEINPROGRESS = 10_036;
export const WSAEALREADY = 10_037;
export const WSAENOTSOCK = 10_038;
export const WSAEDESTADDRREQ = 10_039;
export const WSAEMSGSIZE = 10_040;
export const WSAEPROTOTYPE = 10_041;
export const WSAENOPROTOOPT = 10_042;
export const WSAEPROTONOSUPPORT = 10_043;
export const WSAESOCKTNOSUPPORT = 10_044;
export const WSAEOPNOTSUPP = 10_045;
export const WSAEPFNOSUPPORT = 10_046;
export const WSAEAFNOSUPPORT = 10_047;
export const WSAEADDRINUSE = 10_048;
export const WSAEADDRNOTAVAIL = 10_049;
export const WSAENETDOWN = 10_050;
export const WSAENETUNREACH = 10_051;
export const WSAENETRESET = 10_052;
export const WSAECONNABORTED = 10_053;
export const WSAECONNRESET = 10_054;
export const WSAENOBUFS = 10_055;
export const WSAEISCONN = 10_056;
export const WSAENOTCONN = 10_057;
export const WSAESHUTDOWN = 10_058;
export const WSAETOOMANYREFS = 10_059;
export const WSAETIMEDOUT = 10_060;
export const WSAECONNREFUSED = 10_061;
export const WSAELOOP = 10_062;
export const WSAENAMETOOLONG = 10_063;
export const WSAEHOSTDOWN = 10_064;
export const WSAEHOSTUNREACH = 10_065;
export const WSAENOTEMPTY = 10_066;
export const WSAEPROCLIM = 10_067;
export const WSAEUSERS = 10_068;
export const WSAEDQUOT = 10_069;
export const WSAESTALE = 10_070;
export const WSAEREMOTE = 10_071;
export const WSASYSNOTREADY = 10_091;
export const WSAVERNOTSUPPORTED = 10_092;
export const WSANOTINITIALISED = 10_093;
export const WSAEDISCON = 10_101;
export const WSAENOMORE = 10_102;
export const WSAECANCELLED = 10_103;
export const WSAEINVALIDPROCTABLE = 10_104;
export const WSAEINVALIDPROVIDER = 10_105;
export const WSAEPROVIDERFAILEDINIT = 10_106;
export const WSASYSCALLFAILURE = 10_107;
export const WSASERVICE_NOT_FOUND = 10_108;
export const WSATYPE_NOT_FOUND = 100_109;
export const WSA_E_NO_MORE = 10_110;
export const WSA_E_CANCELLED = 10_111;
export const WSAEREFUSED = 10_112;
// signals
export const SIGHUP = 1;
export const SIGINT = 2;
export const SIGQUIT = 3;
export const SIGILL = 4;
export const SIGTRAP = 5;
export const SIGABRT = 6;
export const SIGIOT = 6;
export const SIGBUS = 10;
export const SIGFPE = 8;
export const SIGKILL = 9;
export const SIGUSR1 = 30;
export const SIGSEGV = 11;
export const SIGUSR2 = 31;
export const SIGPIPE = 13;
export const SIGALRM = 14;
export const SIGTERM = 15;
export const SIGCHLD = 20;
export const SIGCONT = 19;
export const SIGSTOP = 17;
export const SIGTSTP = 18;
export const SIGTTIN = 21;
export const SIGTTOU = 22;
export const SIGURG = 16;
export const SIGXCPU = 24;
export const SIGXFSZ = 25;
export const SIGVTALRM = 26;
export const SIGPROF = 27;
export const SIGWINCH = 28;
export const SIGIO = 23;
export const SIGINFO = 29;
export const SIGSYS = 12;
export const SIGPOLL = 34;
export const SIGPWR = 29;
export const SIGBREAK = 21;
export const SIGSTKFLT = 16;
export const SIGUNUSED = 31;
export const SIGLOST = 29;
//priority
export const PRIORITY_LOW = 19;
export const PRIORITY_BELOW_NORMAL = 10;
export const PRIORITY_NORMAL = 0;
export const PRIORITY_ABOVE_NORMAL = -7;
export const PRIORITY_HIGH = -14;
export const PRIORITY_HIGHEST = -20;

export default {
  UV_UDP_REUSEADDR,
  dlopen: {
    RTLD_LAZY,
    RTLD_NOW,
    RTLD_GLOBAL,
    RTLD_LOCAL,
    RTLD_DEEPBIND,
  },
  errno: {
    E2BIG,
    EACCES,
    EADDRINUSE,
    EADDRNOTAVAIL,
    EAFNOSUPPORT,
    EAGAIN,
    EALREADY,
    EBADF,
    EBADMSG,
    EBUSY,
    ECANCELED,
    ECHILD,
    ECONNABORTED,
    ECONNREFUSED,
    ECONNRESET,
    EDEADLK,
    EDESTADDRREQ,
    EDOM,
    EDQUOT,
    EEXIST,
    EFAULT,
    EFBIG,
    EHOSTUNREACH,
    EIDRM,
    EILSEQ,
    EINPROGRESS,
    EINTR,
    EINVAL,
    EIO,
    EISCONN,
    EISDIR,
    ELOOP,
    EMFILE,
    EMLINK,
    EMSGSIZE,
    EMULTIHOP,
    ENAMETOOLONG,
    ENETDOWN,
    ENETRESET,
    ENETUNREACH,
    ENFILE,
    ENOBUFS,
    ENODATA,
    ENODEV,
    ENOENT,
    ENOEXEC,
    ENOLCK,
    ENOLINK,
    ENOMEM,
    ENOMSG,
    ENOPROTOOPT,
    ENOSPC,
    ENOSR,
    ENOSTR,
    ENOSYS,
    ENOTCONN,
    ENOTDIR,
    ENOTEMPTY,
    ENOTSOCK,
    ENOTSUP,
    ENOTTY,
    ENXIO,
    EOPNOTSUPP,
    EOVERFLOW,
    EPERM,
    EPIPE,
    EPROTO,
    EPROTONOSUPPORT,
    EPROTOTYPE,
    ERANGE,
    EROFS,
    ESPIPE,
    ESRCH,
    ESTALE,
    ETIME,
    ETIMEDOUT,
    ETXTBSY,
    EWOULDBLOCK,
    EXDEV,
    WSAEINTR,
    WSAEBADF,
    WSAEACCES,
    WSAEFAULT,
    WSAEINVAL,
    WSAEMFILE,
    WSAEWOULDBLOCK,
    WSAEINPROGRESS,
    WSAEALREADY,
    WSAENOTSOCK,
    WSAEDESTADDRREQ,
    WSAEMSGSIZE,
    WSAEPROTOTYPE,
    WSAENOPROTOOPT,
    WSAEPROTONOSUPPORT,
    WSAESOCKTNOSUPPORT,
    WSAEOPNOTSUPP,
    WSAEPFNOSUPPORT,
    WSAEAFNOSUPPORT,
    WSAEADDRINUSE,
    WSAEADDRNOTAVAIL,
    WSAENETDOWN,
    WSAENETUNREACH,
    WSAENETRESET,
    WSAECONNABORTED,
    WSAECONNRESET,
    WSAENOBUFS,
    WSAEISCONN,
    WSAENOTCONN,
    WSAESHUTDOWN,
    WSAETOOMANYREFS,
    WSAETIMEDOUT,
    WSAECONNREFUSED,
    WSAELOOP,
    WSAENAMETOOLONG,
    WSAEHOSTDOWN,
    WSAEHOSTUNREACH,
    WSAENOTEMPTY,
    WSAEPROCLIM,
    WSAEUSERS,
    WSAEDQUOT,
    WSAESTALE,
    WSAEREMOTE,
    WSASYSNOTREADY,
    WSAVERNOTSUPPORTED,
    WSANOTINITIALISED,
    WSAEDISCON,
    WSAENOMORE,
    WSAECANCELLED,
    WSAEINVALIDPROCTABLE,
    WSAEINVALIDPROVIDER,
    WSAEPROVIDERFAILEDINIT,
    WSASYSCALLFAILURE,
    WSASERVICE_NOT_FOUND,
    WSATYPE_NOT_FOUND,
    WSA_E_NO_MORE,
    WSA_E_CANCELLED,
    WSAEREFUSED,
  },
  signals: {
    SIGHUP,
    SIGINT,
    SIGQUIT,
    SIGILL,
    SIGTRAP,
    SIGABRT,
    SIGIOT,
    SIGBUS,
    SIGFPE,
    SIGKILL,
    SIGUSR1,
    SIGSEGV,
    SIGUSR2,
    SIGPIPE,
    SIGALRM,
    SIGTERM,
    SIGCHLD,
    SIGCONT,
    SIGSTOP,
    SIGTSTP,
    SIGTTIN,
    SIGTTOU,
    SIGURG,
    SIGXCPU,
    SIGXFSZ,
    SIGVTALRM,
    SIGPROF,
    SIGWINCH,
    SIGIO,
    SIGINFO,
    SIGSYS,
    SIGBREAK,
    SIGLOST,
    SIGPWR,
    SIGPOLL,
    SIGSTKFLT,
    SIGUNUSED,
  },
  priority: {
    PRIORITY_LOW,
    PRIORITY_BELOW_NORMAL,
    PRIORITY_NORMAL,
    PRIORITY_ABOVE_NORMAL,
    PRIORITY_HIGH,
    PRIORITY_HIGHEST,
  },
};
