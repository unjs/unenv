import type nodeProcess from "node:process";

export {
  _debugEnd,
  _debugProcess,
  // TODO: implemented yet in unenv
  //_events,
  _eventsCount,
  // TODO: implemented yet in unenv
  //_exiting,
  _fatalException,
  _getActiveHandles,
  _getActiveRequests,
  _kill,
  // TODO: implemented yet in unenv
  //_linkedBinding,
  // TODO: implemented yet in unenv
  //_maxListeners,
  _preload_modules,
  _rawDebug,
  _startProfilerIdleNotifier,
  _stopProfilerIdleNotifier,
  _tickCallback,
  abort,
  addListener,
  allowedNodeEnvironmentFlags,
  arch,
  argv,
  argv0,
  assert,
  availableMemory,
  binding,
  chdir,
  config,
  constrainedMemory,
  cpuUsage,
  cwd,
  debugPort,
  dlopen,
  // TODO: implemented yet in unenv
  //domain,
  emit,
  emitWarning,
  eventNames,
  execArgv,
  execPath,
  exit,
  exitCode,
  features,
  getActiveResourcesInfo,
  getMaxListeners,
  getegid,
  geteuid,
  getgid,
  getgroups,
  getuid,
  hasUncaughtExceptionCaptureCallback,
  hrtime,
  initgroups,
  kill,
  listenerCount,
  listeners,
  loadEnvFile,
  memoryUsage,
  moduleLoadList,
  off,
  on,
  once,
  openStdin,
  pid,
  platform,
  ppid,
  prependListener,
  prependOnceListener,
  rawListeners,
  reallyExit,
  release,
  removeAllListeners,
  removeListener,
  report,
  resourceUsage,
  setMaxListeners,
  setSourceMapsEnabled,
  setUncaughtExceptionCaptureCallback,
  setegid,
  seteuid,
  setgid,
  setgroups,
  setuid,
  sourceMapsEnabled,
  stderr,
  stdin,
  stdout,
  title,
  umask,
  uptime,
  version,
  versions,
} from "./internal/process";

import {
  _debugEnd,
  _debugProcess,
  // TODO: implemented yet in unenv
  //_events,
  _eventsCount,
  // TODO: implemented yet in unenv
  //_exiting,
  _fatalException,
  _getActiveHandles,
  _getActiveRequests,
  _kill,
  // TODO: implemented yet in unenv
  //_linkedBinding,
  // TODO: implemented yet in unenv
  //_maxListeners,
  _preload_modules,
  _rawDebug,
  _startProfilerIdleNotifier,
  _stopProfilerIdleNotifier,
  _tickCallback,
  abort,
  addListener,
  allowedNodeEnvironmentFlags,
  arch,
  argv,
  argv0,
  assert,
  availableMemory,
  binding,
  chdir,
  config,
  constrainedMemory,
  cpuUsage,
  cwd,
  debugPort,
  dlopen,
  // TODO: implemented yet in unenv
  //domain,
  emit,
  emitWarning,
  eventNames,
  execArgv,
  execPath,
  exit,
  exitCode,
  features,
  getActiveResourcesInfo,
  getMaxListeners,
  getegid,
  geteuid,
  getgid,
  getgroups,
  getuid,
  hasUncaughtExceptionCaptureCallback,
  hrtime,
  // TODO: implemented yet in unenv
  //initgroups,
  kill,
  listenerCount,
  listeners,
  loadEnvFile,
  memoryUsage,
  // TODO: implemented yet in unenv
  //moduleLoadList,
  off,
  on,
  once,
  // TODO: implemented yet in unenv
  //openStdin,
  pid,
  platform,
  ppid,
  prependListener,
  prependOnceListener,
  rawListeners,
  // TODO: implemented yet in unenv
  //reallyExit,
  release,
  removeAllListeners,
  removeListener,
  report,
  resourceUsage,
  setMaxListeners,
  setSourceMapsEnabled,
  setUncaughtExceptionCaptureCallback,
  setegid,
  seteuid,
  setgid,
  setgroups,
  setuid,
  sourceMapsEnabled,
  stderr,
  stdin,
  stdout,
  title,
  umask,
  uptime,
  version,
  versions,
} from "./internal/process";

// The following is an unusual way to access the original/unpatched globalThis.process.
// This is needed to get hold of the real process object before any of the unenv polyfills are
// applied via `inject` or `polyfill` config in presets.
//
// This code relies on the that rollup/esbuild/webpack don't evaluate string concatenation
// so they don't recognize the below as `globalThis.process` which they would try to rewrite
// into unenv/runtime/node/process, thus creating a circular dependency, and breaking this polyfill.
const unpatchedGlobalThisProcess = (globalThis as any)[
  "pro" + "cess"
] as typeof nodeProcess;

export const getBuiltinModule =
  unpatchedGlobalThisProcess.getBuiltinModule as (typeof nodeProcess)["getBuiltinModule"];

const workerdProcess = getBuiltinModule("node:process") as typeof nodeProcess;

// TODO: Ideally this list is not hardcoded but instead is generated when the preset is being generated in the `env()` call
//       This generation should use information from https://github.com/cloudflare/workerd/issues/2097
export const { env, nextTick } = workerdProcess;

const _process = {
  /**
   * manually unroll unenv-polyfilled-symbols to make it tree-shakeable
   */
  // @ts-expect-error (not typed)
  _debugEnd,
  _debugProcess,
  // TODO: implemented yet in unenv
  //_events,
  _eventsCount,
  // TODO: implemented yet in unenv
  //_exiting,
  _fatalException,
  _getActiveHandles,
  _getActiveRequests,
  _kill,
  // TODO: implemented yet in unenv
  //_linkedBinding,
  // TODO: implemented yet in unenv
  //_maxListeners,
  _preload_modules,
  _rawDebug,
  _startProfilerIdleNotifier,
  _stopProfilerIdleNotifier,
  _tickCallback,
  abort,
  addListener,
  allowedNodeEnvironmentFlags,
  arch,
  argv,
  argv0,
  assert,
  availableMemory,
  binding,
  chdir,
  config,
  constrainedMemory,
  cpuUsage,
  cwd,
  debugPort,
  dlopen,
  // TODO: implemented yet in unenv
  //domain,
  emit,
  emitWarning,
  eventNames,
  execArgv,
  execPath,
  exit,
  exitCode,
  features,
  getActiveResourcesInfo,
  getMaxListeners,
  getegid,
  geteuid,
  getgid,
  getgroups,
  getuid,
  hasUncaughtExceptionCaptureCallback,
  hrtime,
  // TODO: implemented yet in unenv
  //initgroups,
  kill,
  listenerCount,
  listeners,
  loadEnvFile,
  memoryUsage,
  // TODO: implemented yet in unenv
  //moduleLoadList,
  off,
  on,
  once,
  // TODO: implemented yet in unenv
  //openStdin,
  pid,
  platform,
  ppid,
  prependListener,
  prependOnceListener,
  rawListeners,
  // TODO: implemented yet in unenv
  //reallyExit,
  release,
  removeAllListeners,
  removeListener,
  report,
  resourceUsage,
  setMaxListeners,
  setSourceMapsEnabled,
  setUncaughtExceptionCaptureCallback,
  setegid,
  seteuid,
  setgid,
  setgroups,
  setuid,
  sourceMapsEnabled,
  stderr,
  stdin,
  stdout,
  title,
  umask,
  uptime,
  version,
  versions,

  /**
   * manually unroll workerd-polyfilled-symbols to make it tree-shakeable
   */
  env,
  getBuiltinModule,
  nextTick,
} satisfies typeof nodeProcess;

export default _process as unknown as typeof globalThis.process;
