import type nodeOs from "node:os";
import { notImplemented } from "../_internal/utils.ts";

import {
  UV_UDP_REUSEADDR,
  dlopen,
  errno,
  signals,
  priority,
} from "./internal/os/constants.ts";

export const constants = {
  UV_UDP_REUSEADDR,
  dlopen,
  errno,
  signals,
  priority,
} as unknown as typeof nodeOs.constants;

const NUM_CPUS = 8;

export const availableParallelism: typeof nodeOs.availableParallelism = () =>
  NUM_CPUS;

export const arch: typeof nodeOs.arch = () => "";
export const machine: typeof nodeOs.machine = () => "";
export const endianness: typeof nodeOs.endianness = () => "LE";
export const cpus: typeof nodeOs.cpus = () => {
  const info: nodeOs.CpuInfo = {
    model: "",
    speed: 0,
    times: {
      user: 0,
      nice: 0,
      sys: 0,
      idle: 0,
      irq: 0,
    },
  };
  return Array.from({ length: NUM_CPUS }, () => info);
};

export const getPriority: typeof nodeOs.getPriority = () => 0;
export const setPriority: typeof nodeOs.setPriority =
  /*@__PURE__*/ notImplemented<typeof nodeOs.setPriority>("os.setPriority");

export const homedir: typeof nodeOs.homedir = () => "/";
export const tmpdir: typeof nodeOs.tmpdir = () => "/tmp";
export const devNull: typeof nodeOs.devNull = "/dev/null";

export const freemem: typeof nodeOs.freemem = () => 0;
export const totalmem: typeof nodeOs.totalmem = () => 0;
export const loadavg: typeof nodeOs.loadavg = () => [0, 0, 0];
export const uptime: typeof nodeOs.uptime = () => 0;

export const hostname: typeof nodeOs.hostname = () => "";
export const networkInterfaces: typeof nodeOs.networkInterfaces = () => {
  return {
    lo0: [
      {
        address: "127.0.0.1",
        netmask: "255.0.0.0",
        family: "IPv4",
        mac: "00:00:00:00:00:00",
        internal: true,
        cidr: "127.0.0.1/8",
      },
      {
        address: "::1",
        netmask: "ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff",
        family: "IPv6",
        mac: "00:00:00:00:00:00",
        internal: true,
        cidr: "::1/128",
        scopeid: 0,
      },
      {
        address: "fe80::1",
        netmask: "ffff:ffff:ffff:ffff::",
        family: "IPv6",
        mac: "00:00:00:00:00:00",
        internal: true,
        cidr: "fe80::1/64",
        scopeid: 1,
      },
    ],
  };
};

export const platform: typeof nodeOs.platform = () => "linux";
export const type: typeof nodeOs.type = () => "Linux";
export const release: typeof nodeOs.release = () => "";
export const version: typeof nodeOs.version = () => "";

export const userInfo: typeof nodeOs.userInfo = (opts) => {
  const encode = (str: string) => {
    if (opts?.encoding) {
      const buff = Buffer.from(str);
      return opts.encoding === "buffer" ? buff : buff.toString(opts.encoding);
    }
    return str;
  };
  return {
    gid: 1000,
    uid: 1000,
    homedir: encode("/"),
    shell: encode("/bin/sh"),
    username: encode("root"),
  } as any;
};

export const EOL: typeof nodeOs.EOL = "\n";

export default {
  arch,
  availableParallelism,
  constants,
  cpus,
  EOL,
  endianness,
  devNull,
  freemem,
  getPriority,
  homedir,
  hostname,
  loadavg,
  machine,
  networkInterfaces,
  platform,
  release,
  setPriority,
  tmpdir,
  totalmem,
  type,
  uptime,
  userInfo,
  version,
} satisfies typeof nodeOs;
