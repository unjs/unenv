import { EventEmitter } from "node:events";
import { ReadStream, WriteStream } from "node:tty";
import {
  notImplemented,
  createNotImplementedError,
} from "../../../_internal/utils.ts";

import { env } from "./env.ts";
import { hrtime, nextTick } from "./time.ts";

class _Process extends EventEmitter implements NodeJS.Process {
  env = env;
  hrtime = hrtime;
  nextTick = nextTick;

  constructor() {
    super();
    for (const prop in this) {
      if (typeof this[prop] === "function") {
        this[prop] = this[prop].bind(this);
      }
    }
  }

  // --- event emitter ---

  emitWarning(warning: unknown, type?: unknown, code?: unknown): void {
    console.warn(
      `${code ? `[${code}] ` : ""}${type ? `${type}: ` : ""}${warning}`,
    );
  }

  // @ts-ignore
  emit(...args: Parameters<NodeJS.Process["emit"]>) {
    const res = super.emit(...args);
    const event = args[0] as string;
    if (event === "message" || event === "multipleResolves") {
      return process;
    }
    return res as any;
  }

  // --- stdio (lazy initializers) ---

  #stdin?: NodeJS.Process["stdin"];
  #stdout?: NodeJS.Process["stdout"];
  #stderr?: NodeJS.Process["stderr"];

  get stdin() {
    return (this.#stdin ??= new ReadStream(0) as NodeJS.Process["stdin"]);
  }

  get stdout() {
    return (this.#stdout ??= new WriteStream(1) as NodeJS.Process["stdout"]);
  }

  get stderr() {
    return (this.#stderr ??= new WriteStream(2) as NodeJS.Process["stderr"]);
  }

  // --- cwd ---

  #cwd = "/";

  chdir(cwd: string): void {
    this.#cwd = cwd;
  }

  cwd(): string {
    return this.#cwd;
  }

  // --- dummy props and getters ---

  arch = "" as NodeJS.Architecture;
  platform = "" as NodeJS.Platform;
  argv: string[] = [];
  argv0: string = "";
  execArgv: string[] = [];
  execPath: string = "";
  title: string = "";
  pid: number = 200;
  ppid: number = 100;

  get version() {
    return "";
  }

  get versions() {
    return {} as NodeJS.Process["versions"];
  }

  get allowedNodeEnvironmentFlags() {
    return new Set<string>();
  }

  get sourceMapsEnabled() {
    return false;
  }

  get debugPort() {
    return 0;
  }

  get throwDeprecation() {
    return false;
  }

  get traceDeprecation() {
    return false;
  }

  get features() {
    return {} as NodeJS.Process["features"];
  }

  get release() {
    return {} as NodeJS.Process["release"];
  }

  get connected() {
    return false;
  }

  get config() {
    return {} as NodeJS.Process["config"];
  }

  get moduleLoadList() {
    return [];
  }

  constrainedMemory(): number {
    return 0;
  }

  availableMemory(): number {
    return 0;
  }

  uptime(): number {
    return 0;
  }

  resourceUsage(): NodeJS.ResourceUsage {
    return {} as NodeJS.ResourceUsage;
  }

  // --- unimplemented methods ---

  umask(): number {
    throw createNotImplementedError("process.umask");
  }

  getBuiltinModule(): any {
    throw createNotImplementedError("process.getBuiltinModule");
  }

  getActiveResourcesInfo(): string[] {
    throw createNotImplementedError("process.getActiveResourcesInfo");
  }

  exit(): never {
    throw createNotImplementedError("process.exit");
  }

  reallyExit(): never {
    throw createNotImplementedError("process.reallyExit");
  }

  kill(): true {
    throw createNotImplementedError("process.kill");
  }

  abort(): never {
    throw createNotImplementedError("process.abort");
  }

  dlopen(): void {
    throw createNotImplementedError("process.dlopen");
  }

  setSourceMapsEnabled(): void {
    throw createNotImplementedError("process.setSourceMapsEnabled");
  }

  loadEnvFile(): void {
    throw createNotImplementedError("process.loadEnvFile");
  }

  disconnect(): void {
    throw createNotImplementedError("process.disconnect");
  }

  cpuUsage(): NodeJS.CpuUsage {
    throw createNotImplementedError("process.cpuUsage");
  }

  setUncaughtExceptionCaptureCallback(): void {
    throw createNotImplementedError(
      "process.setUncaughtExceptionCaptureCallback",
    );
  }

  hasUncaughtExceptionCaptureCallback(): boolean {
    throw createNotImplementedError(
      "process.hasUncaughtExceptionCaptureCallback",
    );
  }

  initgroups(): void {
    throw createNotImplementedError("process.initgroups");
  }

  openStdin(): NodeJS.ReadStream {
    throw createNotImplementedError("process.openStdin");
  }

  assert() {
    throw createNotImplementedError("process.assert");
  }

  binding() {
    throw createNotImplementedError("process.binding");
  }

  // --- attached interfaces ---

  report: NodeJS.ProcessReport = {
    directory: "",
    filename: "",
    signal: "SIGUSR2",
    compact: false,
    reportOnFatalError: false,
    reportOnSignal: false,
    reportOnUncaughtException: false,
    getReport: /*@__PURE__*/ notImplemented("process.report.getReport"),
    writeReport: /*@__PURE__*/ notImplemented("process.report.writeReport"),
  };

  finalization = {
    register: /*@__PURE__*/ notImplemented("process.finalization.register"),
    unregister: /*@__PURE__*/ notImplemented("process.finalization.unregister"),
    registerBeforeExit: /*@__PURE__*/ notImplemented(
      "process.finalization.registerBeforeExit",
    ),
  };

  memoryUsage = Object.assign(
    () => ({
      arrayBuffers: 0,
      rss: 0,
      external: 0,
      heapTotal: 0,
      heapUsed: 0,
    }),
    { rss: () => 0 },
  );

  // --- undefined props ---
  // https://github.com/unjs/unenv/pull/367
  domain = undefined;
  // optional
  send = undefined;
  exitCode = undefined;
  channel = undefined;
  getegid = undefined;
  geteuid = undefined;
  getgid = undefined;
  getgroups = undefined;
  getuid = undefined;
  setegid = undefined;
  seteuid = undefined;
  setgid = undefined;
  setgroups = undefined;
  setuid = undefined;
  // internals
  _events = undefined;
  _eventsCount = undefined;
  _exiting = undefined;
  _maxListeners = undefined;
  _debugEnd = undefined;
  _debugProcess = undefined;
  _fatalException = undefined;
  _getActiveHandles = undefined;
  _getActiveRequests = undefined;
  _kill = undefined;
  _preload_modules = undefined;
  _rawDebug = undefined;
  _startProfilerIdleNotifier = undefined;
  _stopProfilerIdleNotifier = undefined;
  _tickCallback = undefined;
  _disconnect = undefined;
  _handleQueue = undefined;
  _pendingMessage = undefined;
  _channel = undefined;
  _send = undefined;
  _linkedBinding = undefined;
}

export const process = /*@__PURE__*/ new _Process();
