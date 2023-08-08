import type fs from "node:fs";
import { notImplemented } from "../../_internal/utils";
import * as fsp from "./promises/_promises";

interface Promisifiable {
  (): any;
  native: Promisifiable;
  __promisify__: () => Promise<any>;
}

function notImplementedAsync(name: string): Promisifiable {
  const fn = notImplemented(name) as any;
  fn.__promisify__ = () => notImplemented(name + ".__promisify__");
  fn.native = fn;
  return fn;
}

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

export const close: typeof fs.close = notImplementedAsync("fs.close");
export const createReadStream: typeof fs.createReadStream = notImplementedAsync(
  "fs.createReadStream",
);
export const createWriteStream: typeof fs.createWriteStream =
  notImplementedAsync("fs.createWriteStream");
export const exists: typeof fs.exists = notImplementedAsync("fs.exists");
export const fchown: typeof fs.fchown = notImplementedAsync("fs.fchown");
export const fchmod: typeof fs.fchmod = notImplementedAsync("fs.fchmod");
export const fdatasync: typeof fs.fdatasync =
  notImplementedAsync("fs.fdatasync");
export const fstat: typeof fs.fstat = notImplementedAsync("fs.fstat");
export const fsync: typeof fs.fsync = notImplementedAsync("fs.fsync");
export const ftruncate: typeof fs.ftruncate =
  notImplementedAsync("fs.ftruncate");
export const futimes: typeof fs.futimes = notImplementedAsync("fs.futimes");
export const lstatSync: typeof fs.lstatSync =
  notImplementedAsync("fs.lstatSync");
export const read: typeof fs.read = notImplementedAsync("fs.read");
export const readv: typeof fs.readv = notImplementedAsync("fs.readv");
export const realpathSync: typeof fs.realpathSync =
  notImplementedAsync("fs.realpathSync");
export const statSync: typeof fs.statSync = notImplementedAsync("fs.statSync");
export const unwatchFile: typeof fs.unwatchFile =
  notImplementedAsync("fs.unwatchFile");
export const watch: typeof fs.watch = notImplementedAsync("fs.watch");
export const watchFile: typeof fs.watchFile =
  notImplementedAsync("fs.watchFile");
export const write: typeof fs.write = notImplementedAsync("fs.write");
export const writev: typeof fs.writev = notImplementedAsync("fs.writev");
export const _toUnixTimestamp = notImplementedAsync("fs._toUnixTimestamp");

// Sync
export const appendFileSync: typeof fs.appendFileSync =
  notImplemented("fs.appendFileSync");
export const accessSync: typeof fs.accessSync = notImplemented("fs.accessSync");
export const chownSync: typeof fs.chownSync = notImplemented("fs.chownSync");
export const chmodSync: typeof fs.chmodSync = notImplemented("fs.chmodSync");
export const closeSync: typeof fs.closeSync = notImplemented("fs.closeSync");
export const copyFileSync: typeof fs.copyFileSync =
  notImplemented("fs.copyFileSync");
export const cpSync: typeof fs.cpSync = notImplemented("fs.cpSync");
export const existsSync: typeof fs.existsSync = () => false;
export const fchownSync: typeof fs.fchownSync = notImplemented("fs.fchownSync");
export const fchmodSync: typeof fs.fchmodSync = notImplemented("fs.fchmodSync");
export const fdatasyncSync: typeof fs.fdatasyncSync =
  notImplemented("fs.fdatasyncSync");
export const fstatSync: typeof fs.fstatSync = notImplemented("fs.fstatSync");
export const fsyncSync: typeof fs.fsyncSync = notImplemented("fs.fsyncSync");
export const ftruncateSync: typeof fs.ftruncateSync =
  notImplemented("fs.ftruncateSync");
export const futimesSync: typeof fs.futimesSync =
  notImplemented("fs.futimesSync");
export const lchownSync: typeof fs.lchownSync = notImplemented("fs.lchownSync");
export const lchmodSync: typeof fs.lchmodSync = notImplemented("fs.lchmodSync");
export const linkSync: typeof fs.linkSync = notImplemented("fs.linkSync");
export const lutimesSync: typeof fs.lutimesSync =
  notImplemented("fs.lutimesSync");
export const mkdirSync: typeof fs.mkdirSync = notImplemented("fs.mkdirSync");
export const mkdtempSync: typeof fs.mkdtempSync =
  notImplemented("fs.mkdtempSync");
export const openSync: typeof fs.openSync = notImplemented("fs.openSync");
export const opendirSync: typeof fs.opendirSync =
  notImplemented("fs.opendirSync");
export const readdirSync: typeof fs.readdirSync =
  notImplemented("fs.readdirSync");
export const readSync: typeof fs.readSync = notImplemented("fs.readSync");
export const readvSync: typeof fs.readvSync = notImplemented("fs.readvSync");
export const readFileSync: typeof fs.readFileSync =
  notImplemented("fs.readFileSync");
export const readlinkSync: typeof fs.readlinkSync =
  notImplemented("fs.readlinkSync");
export const renameSync: typeof fs.renameSync = notImplemented("fs.renameSync");
export const rmSync: typeof fs.rmSync = notImplemented("fs.rmSync");
export const rmdirSync: typeof fs.rmdirSync = notImplemented("fs.rmdirSync");
export const symlinkSync: typeof fs.symlinkSync =
  notImplemented("fs.symlinkSync");
export const truncateSync: typeof fs.truncateSync =
  notImplemented("fs.truncateSync");
export const unlinkSync: typeof fs.unlinkSync = notImplemented("fs.unlinkSync");
export const utimesSync: typeof fs.utimesSync = notImplemented("fs.utimesSync");
export const writeFileSync: typeof fs.writeFileSync =
  notImplemented("fs.writeFileSync");
export const writeSync: typeof fs.writeSync = notImplemented("fs.writeSync");
export const writevSync: typeof fs.writevSync = notImplemented("fs.writevSync");
export const statfsSync: typeof fs.statfsSync = notImplemented("fs.statfsSync");
