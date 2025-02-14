import type nodeUtil from "node:util";

export const isRegExp: typeof nodeUtil.isRegExp = (val): val is RegExp =>
  val instanceof RegExp;

export const isDate: typeof nodeUtil.isDate = (val): val is Date =>
  val instanceof Date;

export const isArray: typeof nodeUtil.isArray = (val): val is unknown[] =>
  Array.isArray(val);

export const isBoolean: typeof nodeUtil.isBoolean = (val): val is boolean =>
  typeof val === "boolean";

export const isNull: typeof nodeUtil.isNull = (val): val is null =>
  val === null;

export const isNullOrUndefined: typeof nodeUtil.isNullOrUndefined = (
  val,
): val is null | undefined => val === null || val === undefined;

export const isNumber: typeof nodeUtil.isNumber = (val): val is number =>
  typeof val === "number";

export const isString: typeof nodeUtil.isString = (val): val is string =>
  typeof val === "string";

export const isSymbol: typeof nodeUtil.isSymbol = (val): val is symbol =>
  typeof val === "symbol";

export const isUndefined: typeof nodeUtil.isUndefined = (
  val,
): val is undefined => val === undefined;

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export const isFunction: typeof nodeUtil.isFunction = (val): val is Function =>
  typeof val === "function";

export const isBuffer: typeof nodeUtil.isBuffer = (val: any): val is Buffer => {
  return (
    val &&
    typeof val === "object" &&
    typeof val.copy === "function" &&
    typeof val.fill === "function" &&
    typeof val.readUInt8 === "function"
  );
};

export const isDeepStrictEqual: typeof nodeUtil.isDeepStrictEqual = (a, b) =>
  JSON.stringify(a) === JSON.stringify(b);

export const isObject: typeof nodeUtil.isObject = (val) =>
  val !== null &&
  typeof val === "object" &&
  // eslint-disable-next-line no-prototype-builtins
  Object.getPrototypeOf(val).isPrototypeOf(Object);

export const isError: typeof nodeUtil.isError = (val): val is Error =>
  val instanceof Error;

// Source https://github.com/jonschlinkert/is-primitive/blob/b22c524da5cbac075f14145780ec4b3637afd7dc/index.js
export const isPrimitive: typeof nodeUtil.isPrimitive = (val) => {
  if (typeof val === "object") {
    return val === null;
  }
  return typeof val !== "function";
};
