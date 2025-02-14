import type nodeFs from "node:fs";
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
export const access: typeof nodeFs.access = callbackify(fsp.access);
export const appendFile: typeof nodeFs.appendFile = callbackify(fsp.appendFile);
export const chown: typeof nodeFs.chown = callbackify(fsp.chown);
export const chmod: typeof nodeFs.chmod = callbackify(fsp.chmod);
export const copyFile: typeof nodeFs.copyFile = callbackify(fsp.copyFile);
export const cp: typeof nodeFs.cp = callbackify(fsp.cp);
export const lchown: typeof nodeFs.lchown = callbackify(fsp.lchown);
export const lchmod: typeof nodeFs.lchmod = callbackify(fsp.lchmod);
export const link: typeof nodeFs.link = callbackify(fsp.link);
export const lstat: typeof nodeFs.lstat = callbackify(fsp.lstat);
export const lutimes: typeof nodeFs.lutimes = callbackify(fsp.lutimes);
export const mkdir: typeof nodeFs.mkdir = callbackify(fsp.mkdir);
export const mkdtemp: typeof nodeFs.mkdtemp = callbackify(fsp.mkdtemp);
export const realpath: typeof nodeFs.realpath = callbackify(fsp.realpath);
export const open: typeof nodeFs.open = callbackify(fsp.open);
export const opendir: typeof nodeFs.opendir = callbackify(fsp.opendir);
export const readdir: typeof nodeFs.readdir = callbackify(fsp.readdir);
export const readFile: typeof nodeFs.readFile = callbackify(fsp.readFile);
export const readlink: typeof nodeFs.readlink = callbackify(fsp.readlink);
export const rename: typeof nodeFs.rename = callbackify(fsp.rename);
export const rm: typeof nodeFs.rm = callbackify(fsp.rm);
export const rmdir: typeof nodeFs.rmdir = callbackify(fsp.rmdir);
export const stat: typeof nodeFs.stat = callbackify(fsp.stat);
export const symlink: typeof nodeFs.symlink = callbackify(fsp.symlink);
export const truncate: typeof nodeFs.truncate = callbackify(fsp.truncate);
export const unlink: typeof nodeFs.unlink = callbackify(fsp.unlink);
export const utimes: typeof nodeFs.utimes = callbackify(fsp.utimes);
export const writeFile: typeof nodeFs.writeFile = callbackify(fsp.writeFile);
export const statfs: typeof nodeFs.statfs = callbackify(fsp.statfs);

export const close: typeof nodeFs.close =
  /*@__PURE__*/ notImplementedAsync("fs.close");
export const createReadStream: typeof nodeFs.createReadStream =
  /*@__PURE__*/ notImplementedAsync("fs.createReadStream");
export const createWriteStream: typeof nodeFs.createWriteStream =
  /*@__PURE__*/ notImplementedAsync("fs.createWriteStream");
export const exists: typeof nodeFs.exists =
  /*@__PURE__*/ notImplementedAsync("fs.exists");
export const fchown: typeof nodeFs.fchown =
  /*@__PURE__*/ notImplementedAsync("fs.fchown");
export const fchmod: typeof nodeFs.fchmod =
  /*@__PURE__*/ notImplementedAsync("fs.fchmod");
export const fdatasync: typeof nodeFs.fdatasync =
  /*@__PURE__*/ notImplementedAsync("fs.fdatasync");
export const fstat: typeof nodeFs.fstat =
  /*@__PURE__*/ notImplementedAsync("fs.fstat");
export const fsync: typeof nodeFs.fsync =
  /*@__PURE__*/ notImplementedAsync("fs.fsync");
export const ftruncate: typeof nodeFs.ftruncate =
  /*@__PURE__*/ notImplementedAsync("fs.ftruncate");
export const futimes: typeof nodeFs.futimes =
  /*@__PURE__*/ notImplementedAsync("fs.futimes");
export const lstatSync: typeof nodeFs.lstatSync =
  /*@__PURE__*/ notImplementedAsync("fs.lstatSync");
export const read: typeof nodeFs.read =
  /*@__PURE__*/ notImplementedAsync("fs.read");
export const readv: typeof nodeFs.readv =
  /*@__PURE__*/ notImplementedAsync("fs.readv");
export const realpathSync: typeof nodeFs.realpathSync =
  /*@__PURE__*/ notImplementedAsync("fs.realpathSync");
export const statSync: typeof nodeFs.statSync =
  /*@__PURE__*/ notImplementedAsync("fs.statSync");
export const unwatchFile: typeof nodeFs.unwatchFile =
  /*@__PURE__*/ notImplementedAsync("fs.unwatchFile");
export const watch: typeof nodeFs.watch =
  /*@__PURE__*/ notImplementedAsync("fs.watch");
export const watchFile: typeof nodeFs.watchFile =
  /*@__PURE__*/ notImplementedAsync("fs.watchFile");
export const write: typeof nodeFs.write =
  /*@__PURE__*/ notImplementedAsync("fs.write");
export const writev: typeof nodeFs.writev =
  /*@__PURE__*/ notImplementedAsync("fs.writev");
export const _toUnixTimestamp = /*@__PURE__*/ notImplementedAsync(
  "fs._toUnixTimestamp",
);
export const openAsBlob: typeof nodeFs.openAsBlob =
  /*@__PURE__*/ notImplementedAsync("fs.openAsBlob");
export const glob: typeof nodeFs.glob =
  /*@__PURE__*/ notImplementedAsync("fs.glob");

// Sync
export const appendFileSync =
  /*@__PURE__*/ notImplemented<typeof nodeFs.appendFileSync>(
    "fs.appendFileSync",
  );
export const accessSync =
  /*@__PURE__*/ notImplemented<typeof nodeFs.accessSync>("fs.accessSync");
export const chownSync =
  /*@__PURE__*/ notImplemented<typeof nodeFs.chownSync>("fs.chownSync");
export const chmodSync =
  /*@__PURE__*/ notImplemented<typeof nodeFs.chmodSync>("fs.chmodSync");
export const closeSync =
  /*@__PURE__*/ notImplemented<typeof nodeFs.closeSync>("fs.closeSync");
export const copyFileSync =
  /*@__PURE__*/ notImplemented<typeof nodeFs.copyFileSync>("fs.copyFileSync");
export const cpSync =
  /*@__PURE__*/ notImplemented<typeof nodeFs.cpSync>("fs.cpSync");
export const existsSync: typeof nodeFs.existsSync = () => false;
export const fchownSync =
  /*@__PURE__*/ notImplemented<typeof nodeFs.fchownSync>("fs.fchownSync");
export const fchmodSync =
  /*@__PURE__*/ notImplemented<typeof nodeFs.fchmodSync>("fs.fchmodSync");
export const fdatasyncSync =
  /*@__PURE__*/ notImplemented<typeof nodeFs.fdatasyncSync>("fs.fdatasyncSync");
export const fstatSync = /*@__PURE__*/ notImplemented<typeof nodeFs.fstatSync>(
  "fs.fstatSync",
) as typeof nodeFs.fstatSync;
export const fsyncSync =
  /*@__PURE__*/ notImplemented<typeof nodeFs.fsyncSync>("fs.fsyncSync");
export const ftruncateSync =
  /*@__PURE__*/ notImplemented<typeof nodeFs.ftruncateSync>("fs.ftruncateSync");
export const futimesSync =
  /*@__PURE__*/ notImplemented<typeof nodeFs.futimesSync>("fs.futimesSync");
export const lchownSync =
  /*@__PURE__*/ notImplemented<typeof nodeFs.lchownSync>("fs.lchownSync");
export const lchmodSync =
  /*@__PURE__*/ notImplemented<typeof nodeFs.lchmodSync>("fs.lchmodSync");
export const linkSync =
  /*@__PURE__*/ notImplemented<typeof nodeFs.linkSync>("fs.linkSync");
export const lutimesSync =
  /*@__PURE__*/ notImplemented<typeof nodeFs.lutimesSync>("fs.lutimesSync");
export const mkdirSync =
  /*@__PURE__*/ notImplemented<typeof nodeFs.mkdirSync>("fs.mkdirSync");
export const mkdtempSync = /*@__PURE__*/ notImplemented<
  typeof nodeFs.mkdtempSync
>("fs.mkdtempSync") as typeof nodeFs.mkdtempSync;
export const openSync =
  /*@__PURE__*/ notImplemented<typeof nodeFs.openSync>("fs.openSync");
export const opendirSync =
  /*@__PURE__*/ notImplemented<typeof nodeFs.opendirSync>("fs.opendirSync");
export const readdirSync = /*@__PURE__*/ notImplemented<
  typeof nodeFs.readdirSync
>("fs.readdirSync") as unknown as typeof nodeFs.readdirSync;
export const readSync =
  /*@__PURE__*/ notImplemented<typeof nodeFs.readSync>("fs.readSync");
export const readvSync =
  /*@__PURE__*/ notImplemented<typeof nodeFs.readvSync>("fs.readvSync");
export const readFileSync = /*@__PURE__*/ notImplemented<
  typeof nodeFs.readFileSync
>("fs.readFileSync") as typeof nodeFs.readFileSync;
export const readlinkSync = /*@__PURE__*/ notImplemented<
  typeof nodeFs.readlinkSync
>("fs.readlinkSync") as typeof nodeFs.readlinkSync;
export const renameSync =
  /*@__PURE__*/ notImplemented<typeof nodeFs.renameSync>("fs.renameSync");
export const rmSync =
  /*@__PURE__*/ notImplemented<typeof nodeFs.rmSync>("fs.rmSync");
export const rmdirSync =
  /*@__PURE__*/ notImplemented<typeof nodeFs.rmdirSync>("fs.rmdirSync");
export const symlinkSync =
  /*@__PURE__*/ notImplemented<typeof nodeFs.symlinkSync>("fs.symlinkSync");
export const truncateSync =
  /*@__PURE__*/ notImplemented<typeof nodeFs.truncateSync>("fs.truncateSync");
export const unlinkSync =
  /*@__PURE__*/ notImplemented<typeof nodeFs.unlinkSync>("fs.unlinkSync");
export const utimesSync =
  /*@__PURE__*/ notImplemented<typeof nodeFs.utimesSync>("fs.utimesSync");
export const writeFileSync =
  /*@__PURE__*/ notImplemented<typeof nodeFs.writeFileSync>("fs.writeFileSync");
export const writeSync =
  /*@__PURE__*/ notImplemented<typeof nodeFs.writeSync>("fs.writeSync");
export const writevSync =
  /*@__PURE__*/ notImplemented<typeof nodeFs.writevSync>("fs.writevSync");
export const statfsSync = /*@__PURE__*/ notImplemented<
  typeof nodeFs.statfsSync
>("fs.statfsSync") as typeof nodeFs.statfsSync;
export const globSync =
  /*@__PURE__*/ notImplemented<typeof nodeFs.globSync>("fs.globSync");
