import { notImplemented, notImplementedClass } from "../_internal/utils.ts";
import type child_process from "node:child_process";

export const ChildProcess: typeof child_process.ChildProcess =
  /*@__PURE__*/ notImplementedClass("child_process.ChildProcess");

export const _forkChild = /*@__PURE__*/ notImplemented(
  "child_process.ChildProcess",
);

export const exec: typeof child_process.exec =
  /*@__PURE__*/ notImplemented("child_process.exec");
export const execFile: typeof child_process.execFile =
  /*@__PURE__*/ notImplemented("child_process.execFile");
export const execFileSync: typeof child_process.execFileSync =
  /*@__PURE__*/ notImplemented("child_process.execFileSync");
export const execSync: typeof child_process.execSync =
  /*@__PURE__*/ notImplemented("child_process.execSyn");
export const fork: typeof child_process.fork =
  /*@__PURE__*/ notImplemented("child_process.fork");
export const spawn: typeof child_process.spawn = /*@__PURE__*/ notImplemented(
  "child_process.spawn",
);
export const spawnSync: typeof child_process.spawnSync =
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
} as /* TODO: use satisfies */ typeof child_process;
