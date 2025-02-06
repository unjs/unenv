import type os from "node:os";
import { notImplemented } from "../_internal/utils.ts";
import { constants } from "./internal/os/constants.ts";

export { constants } from "./internal/os/constants.ts";

const NUM_CPUS = 8;

export const availableParallelism: typeof os.availableParallelism = () =>
  NUM_CPUS;

export const arch: typeof os.arch = () => "";
export const machine: typeof os.machine = () => "";
export const endianness: typeof os.endianness = () => "LE";
export const cpus: typeof os.cpus = () => {
  const info: os.CpuInfo = {
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

export const getPriority: typeof os.getPriority = () => 0;
export const setPriority: typeof os.setPriority =
  /*@__PURE__*/ notImplemented<typeof os.setPriority>("os.setPriority");

export const homedir: typeof os.homedir = () => "/";
export const tmpdir: typeof os.tmpdir = () => "/tmp";
export const devNull: typeof os.devNull = "/dev/null";

export const freemem: typeof os.freemem = () => 0;
export const totalmem: typeof os.totalmem = () => 0;
export const loadavg: typeof os.loadavg = () => [0, 0, 0];
export const uptime: typeof os.uptime = () => 0;

export const hostname: typeof os.hostname = () => "";
export const networkInterfaces: typeof os.networkInterfaces = () => {
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

export const platform: typeof os.platform = () => "linux";
export const type: typeof os.type = () => "Linux";
export const release: typeof os.release = () => "";
export const version: typeof os.version = () => "";

export const userInfo: typeof os.userInfo = (opts) => {
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

export const EOL: typeof os.EOL = "\n";

export default <typeof os>{
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
};
