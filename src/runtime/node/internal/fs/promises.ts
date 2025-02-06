import type fsp from "node:fs/promises";
import { notImplemented } from "../../../_internal/utils.ts";

export { constants } from "./constants.ts";

export const access =
  /*@__PURE__*/ notImplemented<typeof fsp.access>("fs.access");
export const copyFile =
  /*@__PURE__*/ notImplemented<typeof fsp.copyFile>("fs.copyFile");
export const cp = /*@__PURE__*/ notImplemented<typeof fsp.cp>("fs.cp");
export const open = /*@__PURE__*/ notImplemented<typeof fsp.open>("fs.open");
export const opendir =
  /*@__PURE__*/ notImplemented<typeof fsp.opendir>("fs.opendir");
export const rename =
  /*@__PURE__*/ notImplemented<typeof fsp.rename>("fs.rename");
export const truncate =
  /*@__PURE__*/ notImplemented<typeof fsp.truncate>("fs.truncate");
export const rm = /*@__PURE__*/ notImplemented<typeof fsp.rm>("fs.rm");
export const rmdir = /*@__PURE__*/ notImplemented<typeof fsp.rmdir>("fs.rmdir");
export const mkdir = /*@__PURE__*/ notImplemented<typeof fsp.mkdir>(
  "fs.mkdir",
) as typeof fsp.mkdir;
export const readdir = /*@__PURE__*/ notImplemented<typeof fsp.readdir>(
  "fs.readdir",
) as unknown as typeof fsp.readdir;
export const readlink = /*@__PURE__*/ notImplemented<typeof fsp.readlink>(
  "fs.readlink",
) as typeof fsp.readlink;
export const symlink =
  /*@__PURE__*/ notImplemented<typeof fsp.symlink>("fs.symlink");
export const lstat = /*@__PURE__*/ notImplemented<typeof fsp.lstat>(
  "fs.lstat",
) as typeof fsp.lstat;
export const stat = /*@__PURE__*/ notImplemented<typeof fsp.stat>(
  "fs.stat",
) as typeof fsp.stat;
export const link = /*@__PURE__*/ notImplemented<typeof fsp.link>("fs.link");
export const unlink =
  /*@__PURE__*/ notImplemented<typeof fsp.unlink>("fs.unlink");
export const chmod = /*@__PURE__*/ notImplemented<typeof fsp.chmod>("fs.chmod");
export const lchmod =
  /*@__PURE__*/ notImplemented<typeof fsp.lchmod>("fs.lchmod");
export const lchown =
  /*@__PURE__*/ notImplemented<typeof fsp.lchown>("fs.lchown");
export const chown = /*@__PURE__*/ notImplemented<typeof fsp.chown>("fs.chown");
export const utimes =
  /*@__PURE__*/ notImplemented<typeof fsp.utimes>("fs.utimes");
export const lutimes =
  /*@__PURE__*/ notImplemented<typeof fsp.lutimes>("fs.lutimes");
export const realpath = /*@__PURE__*/ notImplemented<typeof fsp.realpath>(
  "fs.realpath",
) as typeof fsp.realpath;
export const mkdtemp = /*@__PURE__*/ notImplemented<typeof fsp.mkdtemp>(
  "fs.mkdtemp",
) as typeof fsp.mkdtemp;
export const writeFile =
  /*@__PURE__*/ notImplemented<typeof fsp.writeFile>("fs.writeFile");
export const appendFile =
  /*@__PURE__*/ notImplemented<typeof fsp.appendFile>("fs.appendFile");
export const readFile = /*@__PURE__*/ notImplemented<typeof fsp.readFile>(
  "fs.readFile",
) as typeof fsp.readFile;
export const watch = /*@__PURE__*/ notImplemented<typeof fsp.watch>(
  "fs.watch",
) as typeof fsp.watch;
export const statfs = /*@__PURE__*/ notImplemented<typeof fsp.statfs>(
  "fs.statfs",
) as typeof fsp.statfs;
export const glob = /*@__PURE__*/ notImplemented<typeof fsp.glob>("fs.glob");

export default {} as typeof fsp;
