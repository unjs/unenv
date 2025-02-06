import type fsp from "node:fs/promises";
import { notImplemented } from "../../../_internal/utils.ts";

export { constants } from "./constants.ts";

export const access = notImplemented<typeof fsp.access>("fs.access");
export const copyFile = notImplemented<typeof fsp.copyFile>("fs.copyFile");
export const cp = notImplemented<typeof fsp.cp>("fs.cp");
export const open = notImplemented<typeof fsp.open>("fs.open");
export const opendir = notImplemented<typeof fsp.opendir>("fs.opendir");
export const rename = notImplemented<typeof fsp.rename>("fs.rename");
export const truncate = notImplemented<typeof fsp.truncate>("fs.truncate");
export const rm = notImplemented<typeof fsp.rm>("fs.rm");
export const rmdir = notImplemented<typeof fsp.rmdir>("fs.rmdir");
export const mkdir = notImplemented<typeof fsp.mkdir>(
  "fs.mkdir",
) as typeof fsp.mkdir;
export const readdir = notImplemented<typeof fsp.readdir>(
  "fs.readdir",
) as unknown as typeof fsp.readdir;
export const readlink = notImplemented<typeof fsp.readlink>(
  "fs.readlink",
) as typeof fsp.readlink;
export const symlink = notImplemented<typeof fsp.symlink>("fs.symlink");
export const lstat = notImplemented<typeof fsp.lstat>(
  "fs.lstat",
) as typeof fsp.lstat;
export const stat = notImplemented<typeof fsp.stat>(
  "fs.stat",
) as typeof fsp.stat;
export const link = notImplemented<typeof fsp.link>("fs.link");
export const unlink = notImplemented<typeof fsp.unlink>("fs.unlink");
export const chmod = notImplemented<typeof fsp.chmod>("fs.chmod");
export const lchmod = notImplemented<typeof fsp.lchmod>("fs.lchmod");
export const lchown = notImplemented<typeof fsp.lchown>("fs.lchown");
export const chown = notImplemented<typeof fsp.chown>("fs.chown");
export const utimes = notImplemented<typeof fsp.utimes>("fs.utimes");
export const lutimes = notImplemented<typeof fsp.lutimes>("fs.lutimes");
export const realpath = notImplemented<typeof fsp.realpath>(
  "fs.realpath",
) as typeof fsp.realpath;
export const mkdtemp = notImplemented<typeof fsp.mkdtemp>(
  "fs.mkdtemp",
) as typeof fsp.mkdtemp;
export const writeFile = notImplemented<typeof fsp.writeFile>("fs.writeFile");
export const appendFile =
  notImplemented<typeof fsp.appendFile>("fs.appendFile");
export const readFile = notImplemented<typeof fsp.readFile>(
  "fs.readFile",
) as typeof fsp.readFile;
export const watch = notImplemented<typeof fsp.watch>(
  "fs.watch",
) as typeof fsp.watch;
export const statfs = notImplemented<typeof fsp.statfs>(
  "fs.statfs",
) as typeof fsp.statfs;
export const glob = notImplemented<typeof fsp.glob>("fs.glob");

export default <typeof fsp>{};
