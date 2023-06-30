import type utilTypes from "node:util/types";
import { KeyObject as keyObject } from "node:crypto"
import { notImplemented } from "../../../_internal/utils";

export const isExternal: typeof utilTypes.isExternal = notImplemented(
  "util.types.isExternal"
);

export const isDate: typeof utilTypes.isDate = (val): val is Date =>
  val instanceof Date;

// @ts-expect-error not implemented yet
export const isArgumentsObject: typeof utilTypes.isArgumentsObject =
  notImplemented("util.types.isArgumentsObject");

export const isBigIntObject = (val: any): val is Date => val instanceof BigInt;

export const isBooleanObject: typeof utilTypes.isBooleanObject = (
  val
): val is boolean => val instanceof Boolean;

export const isNumberObject: typeof utilTypes.isNumberObject = (
  val
): val is number => val instanceof Number;

export const isStringObject: typeof utilTypes.isStringObject = (
  val
): val is string => val instanceof String;

export const isSymbolObject: typeof utilTypes.isSymbolObject = (
  val
): val is symbol => val instanceof Symbol;

// @ts-expect-error not implemented yet
export const isNativeError: typeof utilTypes.isNativeError = notImplemented(
  "util.types.isNativeError"
);

export const isRegExp: typeof utilTypes.isRegExp = (val): val is RegExp =>
  val instanceof RegExp;

export const isAsyncFunction: typeof utilTypes.isAsyncFunction = notImplemented(
  "util.types.isAsyncFunction"
);

// @ts-expect-error not implemented yet
export const isGeneratorFunction: typeof utilTypes.isGeneratorFunction =
  notImplemented("util.types.isGeneratorFunction");

// @ts-expect-error not implemented yet
export const isGeneratorObject: typeof utilTypes.isGeneratorObject =
  notImplemented("util.types.isGeneratorObject");

export const isPromise: typeof utilTypes.isPromise = (
  val
): val is Promise<any> => val instanceof Promise;

// @ts-ignore
export const isMap: typeof utilTypes.isMap = (val): val is Map =>
  val instanceof Map;

// @ts-ignore
export const isSet: typeof utilTypes.isSet = (val): val is Set =>
  val instanceof Set;

export const isMapIterator: typeof utilTypes.isMapIterator = notImplemented(
  "util.types.isMapIterator"
);

export const isSetIterator: typeof utilTypes.isSetIterator = notImplemented(
  "util.types.isSetIterator"
);

// @ts-ignore
export const isWeakMap: typeof utilTypes.isWeakMap = (val): val is WeakMap =>
  val instanceof WeakMap;

// @ts-ignore
export const isWeakSet: typeof utilTypes.isWeakSet = (val): val is WeakSet =>
  val instanceof WeakSet;

export const isArrayBuffer: typeof utilTypes.isArrayBuffer = (
  val
): val is ArrayBuffer => val instanceof ArrayBuffer;

export const isDataView: typeof utilTypes.isDataView = (val): val is DataView =>
  val instanceof DataView;

export const isSharedArrayBuffer: typeof utilTypes.isSharedArrayBuffer = (
  val
): val is SharedArrayBuffer => val instanceof SharedArrayBuffer;

export const isProxy: typeof utilTypes.isProxy =
  notImplemented("util.types.isProxy");

export const isModuleNamespaceObject: typeof utilTypes.isModuleNamespaceObject =
  notImplemented("util.types.isModuleNamespaceObject");

// @ts-expect-error not implemented yet
export const isAnyArrayBuffer: typeof utilTypes.isAnyArrayBuffer =
  notImplemented("util.types.isAnyArrayBuffer");

// @ts-expect-error not implemented yet
export const isBoxedPrimitive: typeof utilTypes.isBoxedPrimitive =
  notImplemented("util.types.isBoxedPrimitive");

// @ts-expect-error not implemented yet
export const isArrayBufferView: typeof utilTypes.isArrayBufferView =
  notImplemented("util.types.isArrayBufferView");

// @ts-expect-error not implemented yet
export const isTypedArray: typeof utilTypes.isTypedArray = notImplemented(
  "util.types.isTypedArray"
);

// @ts-expect-error not implemented yet
export const isUint8Array: typeof utilTypes.isUint8Array = notImplemented(
  "util.types.isUint8Array"
);

// @ts-expect-error not implemented yet
export const isUint8ClampedArray: typeof utilTypes.isUint8ClampedArray =
  notImplemented("util.types.isUint8ClampedArray");

// @ts-expect-error not implemented yet
export const isUint16Array: typeof utilTypes.isUint16Array = notImplemented(
  "util.types.isUint16Array"
);

// @ts-expect-error not implemented yet
export const isUint32Array: typeof utilTypes.isUint32Array = notImplemented(
  "util.types.isUint32Array"
);

// @ts-expect-error not implemented yet
export const isInt8Array: typeof utilTypes.isInt8Array = notImplemented(
  "util.types.isInt8Array"
);

// @ts-expect-error not implemented yet
export const isInt16Array: typeof utilTypes.isInt16Array = notImplemented(
  "util.types.isInt16Array"
);

// @ts-expect-error not implemented yet
export const isInt32Array: typeof utilTypes.isInt32Array = notImplemented(
  "util.types.isInt32Array"
);

// @ts-expect-error not implemented yet
export const isFloat32Array: typeof utilTypes.isFloat32Array = notImplemented(
  "util.types.isFloat32Array"
);

// @ts-expect-error not implemented yet
export const isFloat64Array: typeof utilTypes.isFloat64Array = notImplemented(
  "util.types.isFloat64Array"
);

// @ts-expect-error not implemented yet
export const isBigInt64Array: typeof utilTypes.isBigInt64Array = notImplemented(
  "util.types.isBigInt64Array"
);

// @ts-expect-error not implemented yet
export const isBigUint64Array: typeof utilTypes.isBigUint64Array =
  notImplemented("util.types.isBigUint64Array");

export const isKeyObject: typeof utilTypes.isKeyObject =
    (val): val is keyObject => val instanceof keyObject

// @ts-expect-error not implemented yet
export const isCryptoKey: typeof utilTypes.isCryptoKey = notImplemented(
  "util.types.isCryptoKey"
);