import type nodeFsPromises from "node:fs/promises";
import { notImplemented } from "../../../_internal/utils.ts";

export const access =
  /*@__PURE__*/ notImplemented<typeof nodeFsPromises.access>("fs.access");
export const copyFile =
  /*@__PURE__*/ notImplemented<typeof nodeFsPromises.copyFile>("fs.copyFile");
export const cp =
  /*@__PURE__*/ notImplemented<typeof nodeFsPromises.cp>("fs.cp");
export const open =
  /*@__PURE__*/ notImplemented<typeof nodeFsPromises.open>("fs.open");
export const opendir =
  /*@__PURE__*/ notImplemented<typeof nodeFsPromises.opendir>("fs.opendir");
export const rename =
  /*@__PURE__*/ notImplemented<typeof nodeFsPromises.rename>("fs.rename");
export const truncate =
  /*@__PURE__*/ notImplemented<typeof nodeFsPromises.truncate>("fs.truncate");
export const rm =
  /*@__PURE__*/ notImplemented<typeof nodeFsPromises.rm>("fs.rm");
export const rmdir =
  /*@__PURE__*/ notImplemented<typeof nodeFsPromises.rmdir>("fs.rmdir");
export const mkdir = /*@__PURE__*/ notImplemented<typeof nodeFsPromises.mkdir>(
  "fs.mkdir",
) as typeof nodeFsPromises.mkdir;
export const readdir = /*@__PURE__*/ notImplemented<
  typeof nodeFsPromises.readdir
>("fs.readdir") as unknown as typeof nodeFsPromises.readdir;
export const readlink = /*@__PURE__*/ notImplemented<
  typeof nodeFsPromises.readlink
>("fs.readlink") as typeof nodeFsPromises.readlink;
export const symlink =
  /*@__PURE__*/ notImplemented<typeof nodeFsPromises.symlink>("fs.symlink");
export const lstat = /*@__PURE__*/ notImplemented<typeof nodeFsPromises.lstat>(
  "fs.lstat",
) as typeof nodeFsPromises.lstat;
export const stat = /*@__PURE__*/ notImplemented<typeof nodeFsPromises.stat>(
  "fs.stat",
) as typeof nodeFsPromises.stat;
export const link =
  /*@__PURE__*/ notImplemented<typeof nodeFsPromises.link>("fs.link");
export const unlink =
  /*@__PURE__*/ notImplemented<typeof nodeFsPromises.unlink>("fs.unlink");
export const chmod =
  /*@__PURE__*/ notImplemented<typeof nodeFsPromises.chmod>("fs.chmod");
export const lchmod =
  /*@__PURE__*/ notImplemented<typeof nodeFsPromises.lchmod>("fs.lchmod");
export const lchown =
  /*@__PURE__*/ notImplemented<typeof nodeFsPromises.lchown>("fs.lchown");
export const chown =
  /*@__PURE__*/ notImplemented<typeof nodeFsPromises.chown>("fs.chown");
export const utimes =
  /*@__PURE__*/ notImplemented<typeof nodeFsPromises.utimes>("fs.utimes");
export const lutimes =
  /*@__PURE__*/ notImplemented<typeof nodeFsPromises.lutimes>("fs.lutimes");
export const realpath = /*@__PURE__*/ notImplemented<
  typeof nodeFsPromises.realpath
>("fs.realpath") as typeof nodeFsPromises.realpath;
export const mkdtemp = /*@__PURE__*/ notImplemented<
  typeof nodeFsPromises.mkdtemp
>("fs.mkdtemp") as typeof nodeFsPromises.mkdtemp;
export const writeFile =
  /*@__PURE__*/ notImplemented<typeof nodeFsPromises.writeFile>("fs.writeFile");
export const appendFile =
  /*@__PURE__*/ notImplemented<typeof nodeFsPromises.appendFile>(
    "fs.appendFile",
  );
export const readFile = /*@__PURE__*/ notImplemented<
  typeof nodeFsPromises.readFile
>("fs.readFile") as typeof nodeFsPromises.readFile;
export const watch = /*@__PURE__*/ notImplemented<typeof nodeFsPromises.watch>(
  "fs.watch",
) as typeof nodeFsPromises.watch;
export const statfs = /*@__PURE__*/ notImplemented<
  typeof nodeFsPromises.statfs
>("fs.statfs") as typeof nodeFsPromises.statfs;
export const glob =
  /*@__PURE__*/ notImplemented<typeof nodeFsPromises.glob>("fs.glob");
