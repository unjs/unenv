import noop from "../mock/noop.ts";
import type nodeV8 from "node:v8";
import { Readable } from "node:stream";
import {
  Deserializer,
  DefaultDeserializer,
} from "./internal/v8/deserializer.ts";
import { Serializer, DefaultSerializer } from "./internal/v8/serializer.ts";
import { GCProfiler } from "./internal/v8/profiler.ts";

export {
  Deserializer,
  DefaultDeserializer,
} from "./internal/v8/deserializer.ts";
export { Serializer, DefaultSerializer } from "./internal/v8/serializer.ts";
export { GCProfiler } from "./internal/v8/profiler.ts";

const getMockHeapSpaceStats = (name: string) => ({
  space_name: name,
  space_size: 0,
  space_used_size: 0,
  space_available_size: 0,
  physical_space_size: 0,
});

export const cachedDataVersionTag: typeof nodeV8.cachedDataVersionTag = () => 0;
export const deserialize: typeof nodeV8.deserialize = noop;
export const getHeapCodeStatistics: typeof nodeV8.getHeapCodeStatistics =
  () => ({
    code_and_metadata_size: 0,
    bytecode_and_metadata_size: 0,
    external_script_source_size: 0,
    cpu_profiler_metadata_size: 0,
  });
export const getHeapSpaceStatistics: typeof nodeV8.getHeapSpaceStatistics =
  () =>
    [
      "read_only_space",
      "new_space",
      "old_space",
      "code_space",
      "map_space",
      "large_object_space",
      "code_large_object_space",
      "new_large_object_space",
    ].map((space) => getMockHeapSpaceStats(space));

export const getHeapStatistics: typeof nodeV8.getHeapStatistics = () => ({
  total_heap_size: 0,
  total_heap_size_executable: 0,
  total_physical_size: 0,
  total_available_size: 0,
  used_heap_size: 0,
  heap_size_limit: 0,
  malloced_memory: 0,
  peak_malloced_memory: 0,
  does_zap_garbage: 0,
  number_of_native_contexts: 0,
  number_of_detached_contexts: 0,
  total_global_handles_size: 0,
  used_global_handles_size: 0,
  external_memory: 0,
});

export const getHeapSnapshot: typeof nodeV8.getHeapSnapshot = () => {
  return Readable.from(`{
    snapshot: {},
    nodes: [],
    edges: [],
    trace_function_infos: [],
    trace_tree: [],
    samples: [],
    locations: [],
    strings: [],
  }`);
};

export const promiseHooks: typeof nodeV8.promiseHooks = {
  onInit: () => noop,
  onSettled: () => noop,
  onBefore: () => noop,
  onAfter: () => noop,
  createHook: () => noop,
};

export const serialize: typeof nodeV8.serialize = (value: any) =>
  Buffer.from(value);
export const setFlagsFromString: typeof nodeV8.setFlagsFromString = noop;
export const setHeapSnapshotNearHeapLimit: typeof nodeV8.setHeapSnapshotNearHeapLimit =
  noop;
export const startupSnapshot: typeof nodeV8.startupSnapshot = {
  addDeserializeCallback: noop,
  addSerializeCallback: noop,
  setDeserializeMainFunction: noop,
  isBuildingSnapshot: () => false,
};
export const stopCoverage: typeof nodeV8.stopCoverage = noop;
export const takeCoverage: typeof nodeV8.takeCoverage = noop;
export const writeHeapSnapshot: typeof nodeV8.writeHeapSnapshot = () => "";

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
type _Function = Function;
export function queryObjects(ctor: _Function): number | string[];
export function queryObjects(
  ctor: _Function,
  options: { format: "count" },
): number;
export function queryObjects(
  ctor: _Function,
  options: { format: "summary" },
): string[];
export function queryObjects(
  _ctor: _Function,
  options?: { format: "count" | "summary" },
): number | string[] {
  if (options?.format === "count") {
    return 0;
  }
  return [];
}

export default {
  DefaultDeserializer,
  Deserializer,
  GCProfiler,
  DefaultSerializer,
  Serializer,
  cachedDataVersionTag,
  deserialize,
  getHeapCodeStatistics,
  getHeapSnapshot,
  getHeapSpaceStatistics,
  getHeapStatistics,
  promiseHooks,
  serialize,
  setFlagsFromString,
  setHeapSnapshotNearHeapLimit,
  startupSnapshot,
  stopCoverage,
  takeCoverage,
  writeHeapSnapshot,
  queryObjects,
} satisfies typeof nodeV8;
