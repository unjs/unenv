import { notImplemented, notImplementedClass } from "../_internal/utils.ts";
import type nodeChildProcess from "node:child_process";

export const ChildProcess: typeof nodeChildProcess.ChildProcess =
  /*@__PURE__*/ notImplementedClass("child_process.ChildProcess");

export const _forkChild = /*@__PURE__*/ notImplemented(
  "child_process.ChildProcess",
);

export const exec: typeof nodeChildProcess.exec =
  /*@__PURE__*/ notImplemented("child_process.exec");
export const execFile: typeof nodeChildProcess.execFile =
  /*@__PURE__*/ notImplemented("child_process.execFile");
export const execFileSync: typeof nodeChildProcess.execFileSync =
  /*@__PURE__*/ notImplemented("child_process.execFileSync");
export const execSync: typeof nodeChildProcess.execSync =
  /*@__PURE__*/ notImplemented("child_process.execSyn");
export const fork: typeof nodeChildProcess.fork =
  /*@__PURE__*/ notImplemented("child_process.fork");
export const spawn: typeof nodeChildProcess.spawn =
  /*@__PURE__*/ notImplemented("child_process.spawn");
export const spawnSync: typeof nodeChildProcess.spawnSync =
  /*@__PURE__*/ notImplemented("child_process.spawnSync");

export default {
  ChildProcess,
  _forkChild,
  exec,
  execFile,
  execFileSync,
  execSync,
  fork,
  spawn,
  spawnSync,
} as /* TODO: use satisfies */ typeof nodeChildProcess;
