import type os from "node:os";
import { notImplemented } from "../../_internal/utils";
import mock from "../../mock/proxy";

export const arch: typeof os.arch = notImplemented("os.arch");
export const availableParallelism: typeof os.availableParallelism =
  notImplemented("os.availableParallelism");
export const cpus: typeof os.cpus = notImplemented("os.cpus");
export const endianness: typeof os.endianness = notImplemented("os.endianness");
export const freemem: typeof os.freemem = notImplemented("os.freemem");
export const getPriority: typeof os.getPriority =
  notImplemented("os.getPriority");
export const homedir: typeof os.homedir = notImplemented("os.homedir");
export const hostname: typeof os.hostname = notImplemented("os.hostname");
export const loadavg: typeof os.loadavg = notImplemented("os.loadavg");
export const machine: typeof os.machine = notImplemented("os.machine");
export const networkInterfaces: typeof os.networkInterfaces = notImplemented(
  "os.networkInterfaces",
);
export const platform: typeof os.platform = notImplemented("os.platform");
export const release: typeof os.release = notImplemented("os.release");
export const setPriority: typeof os.setPriority =
  notImplemented("os.setPriority");
export const tmpdir: typeof os.tmpdir = notImplemented("os.tmpdir");
export const totalmem: typeof os.totalmem = notImplemented("os.totalmem");
export const type: typeof os.type = notImplemented("os.type");
export const uptime: typeof os.uptime = notImplemented("os.uptime");
export const userInfo: typeof os.userInfo = notImplemented("os.userInfo");
export const version: typeof os.version = notImplemented("os.version");

export const constants: typeof os.constants =
  mock.__createMock__("os.constants");
export const devNull: typeof os.devNull = "/dev/null";
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
