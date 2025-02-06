import { notImplemented, notImplementedClass } from "../_internal/utils";
import type child_process from "node:child_process";

export const ChildProcess: typeof child_process.ChildProcess =
  notImplementedClass("child_process.ChildProcess");

export const _forkChild = notImplemented("child_process.ChildProcess");

export const exec: typeof child_process.exec =
  notImplemented("child_process.exec");
export const execFile: typeof child_process.execFile = notImplemented(
  "child_process.execFile",
);
export const execFileSync: typeof child_process.execFileSync = notImplemented(
  "child_process.execFileSync",
);
export const execSync: typeof child_process.execSync = notImplemented(
  "child_process.execSyn",
);
export const fork: typeof child_process.fork =
  notImplemented("child_process.fork");
export const spawn: typeof child_process.spawn = notImplemented(
  "child_process.spawn",
);
export const spawnSync: typeof child_process.spawnSync = notImplemented(
  "child_process.spawnSync",
);

export default <typeof child_process>{
  ChildProcess,
  _forkChild,
  exec,
  execFile,
  execFileSync,
  execSync,
  fork,
  spawn,
  spawnSync,
};
