import type nodeUtilTypes from "node:util/types";
import { notImplemented } from "../../../_internal/utils.ts";

export const isExternal: typeof nodeUtilTypes.isExternal = (_obj: unknown) =>
  false;

export const isDate: typeof nodeUtilTypes.isDate = (
  val: unknown,
): val is Date => val instanceof Date;

export const isArgumentsObject: typeof nodeUtilTypes.isArgumentsObject = (
  val: unknown,
): val is IArguments =>
  Object.prototype.toString.call(val) === "[object Arguments]";

export const isBigIntObject: typeof nodeUtilTypes.isBigIntObject = (
  val: unknown,
): val is BigInt => val instanceof BigInt;

export const isBooleanObject: typeof nodeUtilTypes.isBooleanObject = (
  val: unknown,
): val is Boolean => val instanceof Boolean;

export const isNumberObject: typeof nodeUtilTypes.isNumberObject = (
  val: unknown,
): val is Number => val instanceof Number;

export const isStringObject: typeof nodeUtilTypes.isStringObject = (
  val: unknown,
): val is String => val instanceof String;

export const isSymbolObject: typeof nodeUtilTypes.isSymbolObject = (
  val: unknown,
): val is Symbol => val instanceof Symbol;

export const isNativeError: typeof nodeUtilTypes.isNativeError = (
  val: unknown,
): val is Error => val instanceof Error;

export const isRegExp: typeof nodeUtilTypes.isRegExp = (
  val: unknown,
): val is RegExp => val instanceof RegExp;

export const isAsyncFunction: typeof nodeUtilTypes.isAsyncFunction = (
  val: unknown,
): boolean => {
  return typeof val === "function" &&
    Object.prototype.toString.call(val) === "[object AsyncFunction]";
};

export const isGeneratorFunction: typeof nodeUtilTypes.isGeneratorFunction = (
  val: unknown,
): val is GeneratorFunction => {
  return typeof val === "function" &&
    Object.prototype.toString.call(val) === "[object GeneratorFunction]";
};

export const isGeneratorObject: typeof nodeUtilTypes.isGeneratorObject = (
  val: unknown,
): val is Generator =>
  Object.prototype.toString.call(val) === "[object Generator]";

export const isPromise: typeof nodeUtilTypes.isPromise = (
  val: unknown,
): val is Promise<any> => val instanceof Promise;

export const isMap: typeof nodeUtilTypes.isMap = <T>(
  val: unknown,
): val is T extends ReadonlyMap<any, any>
  ? (unknown extends T ? never : ReadonlyMap<any, any>)
  : Map<unknown, unknown> => {
  return val instanceof Map;
};

export const isSet: typeof nodeUtilTypes.isSet = <T>(
  val: unknown,
): val is T extends ReadonlySet<any>
  ? unknown extends T ? never : ReadonlySet<any>
  : Set<unknown> => {
  return val instanceof Set;
};

export const isMapIterator: typeof nodeUtilTypes.isMapIterator = (
  val: unknown,
): boolean => Object.prototype.toString.call(val) === "[object Map Iterator]";

export const isSetIterator: typeof nodeUtilTypes.isSetIterator = (
  val: unknown,
): boolean => Object.prototype.toString.call(val) === "[object Set Iterator]";

export const isWeakMap: typeof nodeUtilTypes.isWeakMap = <K extends WeakKey, V>(
  val: unknown,
): val is WeakMap<K, V> => val instanceof WeakMap;

export const isWeakSet: typeof nodeUtilTypes.isWeakSet = <K extends WeakKey>(
  val: unknown,
): val is WeakSet<K> => val instanceof WeakSet;

export const isArrayBuffer: typeof nodeUtilTypes.isArrayBuffer = (
  val: unknown,
): val is ArrayBuffer => val instanceof ArrayBuffer;

export const isDataView: typeof nodeUtilTypes.isDataView = (
  val: unknown,
): val is DataView => val instanceof DataView;

export const isSharedArrayBuffer: typeof nodeUtilTypes.isSharedArrayBuffer = (
  val: unknown,
): val is SharedArrayBuffer =>
  "SharedArrayBuffer" in globalThis && val instanceof SharedArrayBuffer;

export const isProxy = /*@__PURE__*/ notImplemented<
  typeof nodeUtilTypes.isProxy
>(
  "util.types.isProxy",
);

export const isModuleNamespaceObject = /*@__PURE__*/ notImplemented<
  typeof nodeUtilTypes.isModuleNamespaceObject
>("util.types.isModuleNamespaceObject");

export const isAnyArrayBuffer: typeof nodeUtilTypes.isAnyArrayBuffer = (
  val: unknown,
): val is ArrayBuffer | SharedArrayBuffer =>
  val instanceof ArrayBuffer ||
  ("SharedArrayBuffer" in globalThis && val instanceof SharedArrayBuffer);

export const isBoxedPrimitive: typeof nodeUtilTypes.isBoxedPrimitive = (
  val: unknown,
): val is String | Number | Boolean | BigInt | Symbol => {
  return val instanceof String ||
    val instanceof Number ||
    val instanceof BigInt ||
    val instanceof Boolean ||
    val instanceof Symbol;
};

export const isArrayBufferView: typeof nodeUtilTypes.isArrayBufferView = (
  val: unknown,
): val is NodeJS.ArrayBufferView => {
  return ArrayBuffer.isView(val);
};

export const isTypedArray: typeof nodeUtilTypes.isTypedArray = (
  val: unknown,
): val is NodeJS.TypedArray<ArrayBufferLike> => {
  return val instanceof Int8Array ||
    val instanceof Uint8Array ||
    val instanceof Uint8ClampedArray ||
    val instanceof Int16Array ||
    val instanceof Uint16Array ||
    val instanceof Int32Array ||
    val instanceof Uint32Array ||
    ("Float16Array" in globalThis && val instanceof Float16Array) ||
    val instanceof Float32Array ||
    val instanceof Float64Array ||
    val instanceof BigInt64Array ||
    val instanceof BigUint64Array;
};

export const isUint8Array: typeof nodeUtilTypes.isUint8Array = (
  val: unknown,
): val is Uint8Array => val instanceof Uint8Array;

export const isUint8ClampedArray: typeof nodeUtilTypes.isUint8ClampedArray = (
  val: unknown,
): val is Uint8ClampedArray => val instanceof Uint8ClampedArray;

export const isUint16Array: typeof nodeUtilTypes.isUint16Array = (
  val: unknown,
): val is Uint16Array => val instanceof Uint16Array;

export const isUint32Array: typeof nodeUtilTypes.isUint32Array = (
  val: unknown,
): val is Uint32Array => val instanceof Uint32Array;

export const isInt8Array: typeof nodeUtilTypes.isInt8Array = (
  val: unknown,
): val is Int8Array => val instanceof Int8Array;

export const isInt16Array: typeof nodeUtilTypes.isInt16Array = (
  val: unknown,
): val is Int16Array => val instanceof Int16Array;

export const isInt32Array: typeof nodeUtilTypes.isInt32Array = (
  val: unknown,
): val is Int32Array => val instanceof Int32Array;

export const isFloat32Array: typeof nodeUtilTypes.isFloat32Array = (
  val: unknown,
): val is Float32Array => val instanceof Float32Array;

export const isFloat64Array: typeof nodeUtilTypes.isFloat64Array = (
  val: unknown,
): val is Float64Array => val instanceof Float64Array;

export const isBigInt64Array: typeof nodeUtilTypes.isBigInt64Array = (
  val: unknown,
): val is BigInt64Array => val instanceof BigInt64Array;

export const isBigUint64Array: typeof nodeUtilTypes.isBigUint64Array = (
  val: unknown,
): val is BigUint64Array => val instanceof BigUint64Array;

export const isKeyObject = /*@__PURE__*/ notImplemented<
  typeof nodeUtilTypes.isKeyObject
>("util.types.isKeyObject");

export const isCryptoKey = /*@__PURE__*/ notImplemented<
  typeof nodeUtilTypes.isCryptoKey
>("util.types.isCryptoKey");
