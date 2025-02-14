import type nodeUtilTypes from "node:util/types";
import { notImplemented } from "../../../_internal/utils.ts";

export const isExternal: typeof nodeUtilTypes.isExternal = (_obj) => false;

export const isDate: typeof nodeUtilTypes.isDate = (val): val is Date =>
  val instanceof Date;

export const isArgumentsObject = /*@__PURE__*/ notImplemented<
  typeof nodeUtilTypes.isArgumentsObject
>("util.types.isArgumentsObject");

export const isBigIntObject = (val: any): val is bigint =>
  val instanceof BigInt;

export const isBooleanObject: typeof nodeUtilTypes.isBooleanObject = (
  val,
): val is boolean => val instanceof Boolean;

export const isNumberObject: typeof nodeUtilTypes.isNumberObject = (
  val,
): val is number => val instanceof Number;

export const isStringObject: typeof nodeUtilTypes.isStringObject = (
  val,
): val is string => val instanceof String;

export const isSymbolObject: typeof nodeUtilTypes.isSymbolObject = (
  val,
): val is symbol => val instanceof Symbol;

export const isNativeError = /*@__PURE__*/ notImplemented<
  typeof nodeUtilTypes.isNativeError
>("util.types.isNativeError");

export const isRegExp: typeof nodeUtilTypes.isRegExp = (val): val is RegExp =>
  val instanceof RegExp;

export const isAsyncFunction = /*@__PURE__*/ notImplemented<
  typeof nodeUtilTypes.isAsyncFunction
>("util.types.isAsyncFunction");

export const isGeneratorFunction = /*@__PURE__*/ notImplemented<
  typeof nodeUtilTypes.isGeneratorFunction
>("util.types.isGeneratorFunction");

export const isGeneratorObject = /*@__PURE__*/ notImplemented<
  typeof nodeUtilTypes.isGeneratorObject
>("util.types.isGeneratorObject");

export const isPromise: typeof nodeUtilTypes.isPromise = (
  val,
): val is Promise<any> => val instanceof Promise;

// @ts-ignore
export const isMap: typeof nodeUtilTypes.isMap = (val): val is Map =>
  val instanceof Map;

// @ts-ignore
export const isSet: typeof nodeUtilTypes.isSet = (val): val is Set =>
  val instanceof Set;

export const isMapIterator = /*@__PURE__*/ notImplemented<
  typeof nodeUtilTypes.isMapIterator
>("util.types.isMapIterator");

export const isSetIterator = /*@__PURE__*/ notImplemented<
  typeof nodeUtilTypes.isSetIterator
>("util.types.isSetIterator");

export const isWeakMap: typeof nodeUtilTypes.isWeakMap = <K extends WeakKey, V>(
  val: unknown,
): val is WeakMap<K, V> => val instanceof WeakMap;

export const isWeakSet: typeof nodeUtilTypes.isWeakSet = <K extends WeakKey>(
  val: unknown,
): val is WeakSet<K> => val instanceof WeakSet;

export const isArrayBuffer: typeof nodeUtilTypes.isArrayBuffer = (
  val,
): val is ArrayBuffer => val instanceof ArrayBuffer;

export const isDataView: typeof nodeUtilTypes.isDataView = (
  val,
): val is DataView => val instanceof DataView;

export const isSharedArrayBuffer: typeof nodeUtilTypes.isSharedArrayBuffer = (
  val,
): val is SharedArrayBuffer => val instanceof SharedArrayBuffer;

export const isProxy =
  /*@__PURE__*/ notImplemented<typeof nodeUtilTypes.isProxy>(
    "util.types.isProxy",
  );

export const isModuleNamespaceObject = /*@__PURE__*/ notImplemented<
  typeof nodeUtilTypes.isModuleNamespaceObject
>("util.types.isModuleNamespaceObject");

export const isAnyArrayBuffer = /*@__PURE__*/ notImplemented<
  typeof nodeUtilTypes.isAnyArrayBuffer
>("util.types.isAnyArrayBuffer");

export const isBoxedPrimitive = /*@__PURE__*/ notImplemented<
  typeof nodeUtilTypes.isBoxedPrimitive
>("util.types.isBoxedPrimitive");

export const isArrayBufferView = /*@__PURE__*/ notImplemented<
  typeof nodeUtilTypes.isArrayBufferView
>("util.types.isArrayBufferView");

export const isTypedArray = /*@__PURE__*/ notImplemented<
  typeof nodeUtilTypes.isTypedArray
>("util.types.isTypedArray");

export const isUint8Array = /*@__PURE__*/ notImplemented<
  typeof nodeUtilTypes.isUint8Array
>("util.types.isUint8Array");

export const isUint8ClampedArray = /*@__PURE__*/ notImplemented<
  typeof nodeUtilTypes.isUint8ClampedArray
>("util.types.isUint8ClampedArray");

export const isUint16Array = /*@__PURE__*/ notImplemented<
  typeof nodeUtilTypes.isUint16Array
>("util.types.isUint16Array");

export const isUint32Array = /*@__PURE__*/ notImplemented<
  typeof nodeUtilTypes.isUint32Array
>("util.types.isUint32Array");

export const isInt8Array = /*@__PURE__*/ notImplemented<
  typeof nodeUtilTypes.isInt8Array
>("util.types.isInt8Array");

export const isInt16Array = /*@__PURE__*/ notImplemented<
  typeof nodeUtilTypes.isInt16Array
>("util.types.isInt16Array");

export const isInt32Array = /*@__PURE__*/ notImplemented<
  typeof nodeUtilTypes.isInt32Array
>("util.types.isInt32Array");

export const isFloat32Array = /*@__PURE__*/ notImplemented<
  typeof nodeUtilTypes.isFloat32Array
>("util.types.isFloat32Array");

export const isFloat64Array = /*@__PURE__*/ notImplemented<
  typeof nodeUtilTypes.isFloat64Array
>("util.types.isFloat64Array");

export const isBigInt64Array = /*@__PURE__*/ notImplemented<
  typeof nodeUtilTypes.isBigInt64Array
>("util.types.isBigInt64Array");

export const isBigUint64Array = /*@__PURE__*/ notImplemented<
  typeof nodeUtilTypes.isBigUint64Array
>("util.types.isBigUint64Array");

export const isKeyObject = /*@__PURE__*/ notImplemented<
  typeof nodeUtilTypes.isKeyObject
>("util.types.isKeyObject");

export const isCryptoKey = /*@__PURE__*/ notImplemented<
  typeof nodeUtilTypes.isCryptoKey
>("util.types.isCryptoKey");
