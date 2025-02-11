import type utilTypes from "node:util/types";
import { notImplemented } from "../../../_internal/utils.ts";

export const isExternal: typeof utilTypes.isExternal = (_obj) => false;

export const isDate: typeof utilTypes.isDate = (val): val is Date =>
  val instanceof Date;

export const isArgumentsObject = /*@__PURE__*/ notImplemented<
  typeof utilTypes.isArgumentsObject
>("util.types.isArgumentsObject");

export const isBigIntObject = (val: any): val is bigint =>
  val instanceof BigInt;

export const isBooleanObject: typeof utilTypes.isBooleanObject = (
  val,
): val is boolean => val instanceof Boolean;

export const isNumberObject: typeof utilTypes.isNumberObject = (
  val,
): val is number => val instanceof Number;

export const isStringObject: typeof utilTypes.isStringObject = (
  val,
): val is string => val instanceof String;

export const isSymbolObject: typeof utilTypes.isSymbolObject = (
  val,
): val is symbol => val instanceof Symbol;

export const isNativeError = /*@__PURE__*/ notImplemented<
  typeof utilTypes.isNativeError
>("util.types.isNativeError");

export const isRegExp: typeof utilTypes.isRegExp = (val): val is RegExp =>
  val instanceof RegExp;

export const isAsyncFunction = /*@__PURE__*/ notImplemented<
  typeof utilTypes.isAsyncFunction
>("util.types.isAsyncFunction");

export const isGeneratorFunction = /*@__PURE__*/ notImplemented<
  typeof utilTypes.isGeneratorFunction
>("util.types.isGeneratorFunction");

export const isGeneratorObject = /*@__PURE__*/ notImplemented<
  typeof utilTypes.isGeneratorObject
>("util.types.isGeneratorObject");

export const isPromise: typeof utilTypes.isPromise = (
  val,
): val is Promise<any> => val instanceof Promise;

// @ts-ignore
export const isMap: typeof utilTypes.isMap = (val): val is Map =>
  val instanceof Map;

// @ts-ignore
export const isSet: typeof utilTypes.isSet = (val): val is Set =>
  val instanceof Set;

export const isMapIterator = /*@__PURE__*/ notImplemented<
  typeof utilTypes.isMapIterator
>("util.types.isMapIterator");

export const isSetIterator = /*@__PURE__*/ notImplemented<
  typeof utilTypes.isSetIterator
>("util.types.isSetIterator");

// @ts-ignore
export const isWeakMap: typeof utilTypes.isWeakMap = (val): val is WeakMap =>
  val instanceof WeakMap;

// @ts-ignore
export const isWeakSet: typeof utilTypes.isWeakSet = (val): val is WeakSet =>
  val instanceof WeakSet;

export const isArrayBuffer: typeof utilTypes.isArrayBuffer = (
  val,
): val is ArrayBuffer => val instanceof ArrayBuffer;

export const isDataView: typeof utilTypes.isDataView = (val): val is DataView =>
  val instanceof DataView;

export const isSharedArrayBuffer: typeof utilTypes.isSharedArrayBuffer = (
  val,
): val is SharedArrayBuffer => val instanceof SharedArrayBuffer;

export const isProxy =
  /*@__PURE__*/ notImplemented<typeof utilTypes.isProxy>("util.types.isProxy");

export const isModuleNamespaceObject = /*@__PURE__*/ notImplemented<
  typeof utilTypes.isModuleNamespaceObject
>("util.types.isModuleNamespaceObject");

export const isAnyArrayBuffer = /*@__PURE__*/ notImplemented<
  typeof utilTypes.isAnyArrayBuffer
>("util.types.isAnyArrayBuffer");

export const isBoxedPrimitive = /*@__PURE__*/ notImplemented<
  typeof utilTypes.isBoxedPrimitive
>("util.types.isBoxedPrimitive");

export const isArrayBufferView = /*@__PURE__*/ notImplemented<
  typeof utilTypes.isArrayBufferView
>("util.types.isArrayBufferView");

export const isTypedArray = /*@__PURE__*/ notImplemented<
  typeof utilTypes.isTypedArray
>("util.types.isTypedArray");

export const isUint8Array = /*@__PURE__*/ notImplemented<
  typeof utilTypes.isUint8Array
>("util.types.isUint8Array");

export const isUint8ClampedArray = /*@__PURE__*/ notImplemented<
  typeof utilTypes.isUint8ClampedArray
>("util.types.isUint8ClampedArray");

export const isUint16Array = /*@__PURE__*/ notImplemented<
  typeof utilTypes.isUint16Array
>("util.types.isUint16Array");

export const isUint32Array = /*@__PURE__*/ notImplemented<
  typeof utilTypes.isUint32Array
>("util.types.isUint32Array");

export const isInt8Array = /*@__PURE__*/ notImplemented<
  typeof utilTypes.isInt8Array
>("util.types.isInt8Array");

export const isInt16Array = /*@__PURE__*/ notImplemented<
  typeof utilTypes.isInt16Array
>("util.types.isInt16Array");

export const isInt32Array = /*@__PURE__*/ notImplemented<
  typeof utilTypes.isInt32Array
>("util.types.isInt32Array");

export const isFloat32Array = /*@__PURE__*/ notImplemented<
  typeof utilTypes.isFloat32Array
>("util.types.isFloat32Array");

export const isFloat64Array = /*@__PURE__*/ notImplemented<
  typeof utilTypes.isFloat64Array
>("util.types.isFloat64Array");

export const isBigInt64Array = /*@__PURE__*/ notImplemented<
  typeof utilTypes.isBigInt64Array
>("util.types.isBigInt64Array");

export const isBigUint64Array = /*@__PURE__*/ notImplemented<
  typeof utilTypes.isBigUint64Array
>("util.types.isBigUint64Array");

export const isKeyObject = /*@__PURE__*/ notImplemented<
  typeof utilTypes.isKeyObject
>("util.types.isKeyObject");

export const isCryptoKey = /*@__PURE__*/ notImplemented<
  typeof utilTypes.isCryptoKey
>("util.types.isCryptoKey");
