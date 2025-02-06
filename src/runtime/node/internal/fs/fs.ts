import type fs from "node:fs";
import {
  notImplemented,
  notImplementedAsync,
} from "../../../_internal/utils.ts";
import * as fsp from "./promises.ts";

function callbackify(fn: (...args: any[]) => Promise<any>) {
  const fnc = function (...args: any[]) {
    const cb = args.pop();
    fn()
      .catch((error: Error) => cb(error))
      .then((val: any) => cb(undefined, val));
  };
  fnc.__promisify__ = fn;
  fnc.native = fnc;
  return fnc;
}

// Async
export const access: typeof fs.access = callbackify(fsp.access);
export const appendFile: typeof fs.appendFile = callbackify(fsp.appendFile);
export const chown: typeof fs.chown = callbackify(fsp.chown);
export const chmod: typeof fs.chmod = callbackify(fsp.chmod);
export const copyFile: typeof fs.copyFile = callbackify(fsp.copyFile);
export const cp: typeof fs.cp = callbackify(fsp.cp);
export const lchown: typeof fs.lchown = callbackify(fsp.lchown);
export const lchmod: typeof fs.lchmod = callbackify(fsp.lchmod);
export const link: typeof fs.link = callbackify(fsp.link);
export const lstat: typeof fs.lstat = callbackify(fsp.lstat);
export const lutimes: typeof fs.lutimes = callbackify(fsp.lutimes);
export const mkdir: typeof fs.mkdir = callbackify(fsp.mkdir);
export const mkdtemp: typeof fs.mkdtemp = callbackify(fsp.mkdtemp);
export const realpath: typeof fs.realpath = callbackify(fsp.realpath);
export const open: typeof fs.open = callbackify(fsp.open);
export const opendir: typeof fs.opendir = callbackify(fsp.opendir);
export const readdir: typeof fs.readdir = callbackify(fsp.readdir);
export const readFile: typeof fs.readFile = callbackify(fsp.readFile);
export const readlink: typeof fs.readlink = callbackify(fsp.readlink);
export const rename: typeof fs.rename = callbackify(fsp.rename);
export const rm: typeof fs.rm = callbackify(fsp.rm);
export const rmdir: typeof fs.rmdir = callbackify(fsp.rmdir);
export const stat: typeof fs.stat = callbackify(fsp.stat);
export const symlink: typeof fs.symlink = callbackify(fsp.symlink);
export const truncate: typeof fs.truncate = callbackify(fsp.truncate);
export const unlink: typeof fs.unlink = callbackify(fsp.unlink);
export const utimes: typeof fs.utimes = callbackify(fsp.utimes);
export const writeFile: typeof fs.writeFile = callbackify(fsp.writeFile);
export const statfs: typeof fs.statfs = callbackify(fsp.statfs);

export const close: typeof fs.close =
  /*@__PURE__*/ notImplementedAsync("fs.close");
export const createReadStream: typeof fs.createReadStream =
  /*@__PURE__*/ notImplementedAsync("fs.createReadStream");
export const createWriteStream: typeof fs.createWriteStream =
  /*@__PURE__*/ notImplementedAsync("fs.createWriteStream");
export const exists: typeof fs.exists =
  /*@__PURE__*/ notImplementedAsync("fs.exists");
export const fchown: typeof fs.fchown =
  /*@__PURE__*/ notImplementedAsync("fs.fchown");
export const fchmod: typeof fs.fchmod =
  /*@__PURE__*/ notImplementedAsync("fs.fchmod");
export const fdatasync: typeof fs.fdatasync =
  /*@__PURE__*/ notImplementedAsync("fs.fdatasync");
export const fstat: typeof fs.fstat =
  /*@__PURE__*/ notImplementedAsync("fs.fstat");
export const fsync: typeof fs.fsync =
  /*@__PURE__*/ notImplementedAsync("fs.fsync");
export const ftruncate: typeof fs.ftruncate =
  /*@__PURE__*/ notImplementedAsync("fs.ftruncate");
export const futimes: typeof fs.futimes =
  /*@__PURE__*/ notImplementedAsync("fs.futimes");
export const lstatSync: typeof fs.lstatSync =
  /*@__PURE__*/ notImplementedAsync("fs.lstatSync");
export const read: typeof fs.read =
  /*@__PURE__*/ notImplementedAsync("fs.read");
export const readv: typeof fs.readv =
  /*@__PURE__*/ notImplementedAsync("fs.readv");
export const realpathSync: typeof fs.realpathSync =
  /*@__PURE__*/ notImplementedAsync("fs.realpathSync");
export const statSync: typeof fs.statSync =
  /*@__PURE__*/ notImplementedAsync("fs.statSync");
export const unwatchFile: typeof fs.unwatchFile =
  /*@__PURE__*/ notImplementedAsync("fs.unwatchFile");
export const watch: typeof fs.watch =
  /*@__PURE__*/ notImplementedAsync("fs.watch");
export const watchFile: typeof fs.watchFile =
  /*@__PURE__*/ notImplementedAsync("fs.watchFile");
export const write: typeof fs.write =
  /*@__PURE__*/ notImplementedAsync("fs.write");
export const writev: typeof fs.writev =
  /*@__PURE__*/ notImplementedAsync("fs.writev");
export const _toUnixTimestamp = /*@__PURE__*/ notImplementedAsync(
  "fs._toUnixTimestamp",
);
export const openAsBlob: typeof fs.openAsBlob =
  /*@__PURE__*/ notImplementedAsync("fs.openAsBlob");
export const glob: typeof fs.glob =
  /*@__PURE__*/ notImplementedAsync("fs.glob");

// Sync
export const appendFileSync =
  /*@__PURE__*/ notImplemented<typeof fs.appendFileSync>("fs.appendFileSync");
export const accessSync =
  /*@__PURE__*/ notImplemented<typeof fs.accessSync>("fs.accessSync");
export const chownSync =
  /*@__PURE__*/ notImplemented<typeof fs.chownSync>("fs.chownSync");
export const chmodSync =
  /*@__PURE__*/ notImplemented<typeof fs.chmodSync>("fs.chmodSync");
export const closeSync =
  /*@__PURE__*/ notImplemented<typeof fs.closeSync>("fs.closeSync");
export const copyFileSync =
  /*@__PURE__*/ notImplemented<typeof fs.copyFileSync>("fs.copyFileSync");
export const cpSync =
  /*@__PURE__*/ notImplemented<typeof fs.cpSync>("fs.cpSync");
export const existsSync: typeof fs.existsSync = () => false;
export const fchownSync =
  /*@__PURE__*/ notImplemented<typeof fs.fchownSync>("fs.fchownSync");
export const fchmodSync =
  /*@__PURE__*/ notImplemented<typeof fs.fchmodSync>("fs.fchmodSync");
export const fdatasyncSync =
  /*@__PURE__*/ notImplemented<typeof fs.fdatasyncSync>("fs.fdatasyncSync");
export const fstatSync = /*@__PURE__*/ notImplemented<typeof fs.fstatSync>(
  "fs.fstatSync",
) as typeof fs.fstatSync;
export const fsyncSync =
  /*@__PURE__*/ notImplemented<typeof fs.fsyncSync>("fs.fsyncSync");
export const ftruncateSync =
  /*@__PURE__*/ notImplemented<typeof fs.ftruncateSync>("fs.ftruncateSync");
export const futimesSync =
  /*@__PURE__*/ notImplemented<typeof fs.futimesSync>("fs.futimesSync");
export const lchownSync =
  /*@__PURE__*/ notImplemented<typeof fs.lchownSync>("fs.lchownSync");
export const lchmodSync =
  /*@__PURE__*/ notImplemented<typeof fs.lchmodSync>("fs.lchmodSync");
export const linkSync =
  /*@__PURE__*/ notImplemented<typeof fs.linkSync>("fs.linkSync");
export const lutimesSync =
  /*@__PURE__*/ notImplemented<typeof fs.lutimesSync>("fs.lutimesSync");
export const mkdirSync =
  /*@__PURE__*/ notImplemented<typeof fs.mkdirSync>("fs.mkdirSync");
export const mkdtempSync = /*@__PURE__*/ notImplemented<typeof fs.mkdtempSync>(
  "fs.mkdtempSync",
) as typeof fs.mkdtempSync;
export const openSync =
  /*@__PURE__*/ notImplemented<typeof fs.openSync>("fs.openSync");
export const opendirSync =
  /*@__PURE__*/ notImplemented<typeof fs.opendirSync>("fs.opendirSync");
export const readdirSync = /*@__PURE__*/ notImplemented<typeof fs.readdirSync>(
  "fs.readdirSync",
) as unknown as typeof fs.readdirSync;
export const readSync =
  /*@__PURE__*/ notImplemented<typeof fs.readSync>("fs.readSync");
export const readvSync =
  /*@__PURE__*/ notImplemented<typeof fs.readvSync>("fs.readvSync");
export const readFileSync = /*@__PURE__*/ notImplemented<
  typeof fs.readFileSync
>("fs.readFileSync") as typeof fs.readFileSync;
export const readlinkSync = /*@__PURE__*/ notImplemented<
  typeof fs.readlinkSync
>("fs.readlinkSync") as typeof fs.readlinkSync;
export const renameSync =
  /*@__PURE__*/ notImplemented<typeof fs.renameSync>("fs.renameSync");
export const rmSync =
  /*@__PURE__*/ notImplemented<typeof fs.rmSync>("fs.rmSync");
export const rmdirSync =
  /*@__PURE__*/ notImplemented<typeof fs.rmdirSync>("fs.rmdirSync");
export const symlinkSync =
  /*@__PURE__*/ notImplemented<typeof fs.symlinkSync>("fs.symlinkSync");
export const truncateSync =
  /*@__PURE__*/ notImplemented<typeof fs.truncateSync>("fs.truncateSync");
export const unlinkSync =
  /*@__PURE__*/ notImplemented<typeof fs.unlinkSync>("fs.unlinkSync");
export const utimesSync =
  /*@__PURE__*/ notImplemented<typeof fs.utimesSync>("fs.utimesSync");
export const writeFileSync =
  /*@__PURE__*/ notImplemented<typeof fs.writeFileSync>("fs.writeFileSync");
export const writeSync =
  /*@__PURE__*/ notImplemented<typeof fs.writeSync>("fs.writeSync");
export const writevSync =
  /*@__PURE__*/ notImplemented<typeof fs.writevSync>("fs.writevSync");
export const statfsSync = /*@__PURE__*/ notImplemented<typeof fs.statfsSync>(
  "fs.statfsSync",
) as typeof fs.statfsSync;
export const globSync =
  /*@__PURE__*/ notImplemented<typeof fs.globSync>("fs.globSync");
