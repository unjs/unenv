import type util from "node:util";

export const isRegExp: typeof util.isRegExp = (val): val is RegExp =>
  val instanceof RegExp;

export const isDate: typeof util.isDate = (val): val is Date =>
  val instanceof Date;

export const isArray: typeof util.isArray = (val): val is unknown[] =>
  Array.isArray(val);

export const isBoolean: typeof util.isBoolean = (val): val is boolean =>
  typeof val === "boolean";

export const isNull: typeof util.isNull = (val): val is null => val === null;

export const isNullOrUndefined: typeof util.isNullOrUndefined = (
  val
): val is null | undefined => val === null || val === undefined;

export const isNumber: typeof util.isNumber = (val): val is number =>
  typeof val === "number";

export const isString: typeof util.isString = (val): val is string =>
  typeof val === "string";

export const isSymbol: typeof util.isSymbol = (val): val is symbol =>
  typeof val === "symbol";

export const isUndefined: typeof util.isUndefined = (val): val is undefined =>
  typeof val === "undefined";

// eslint-disable-next-line @typescript-eslint/ban-types
export const isFunction: typeof util.isFunction = (val): val is Function =>
  typeof val === "function";

export const isBuffer: typeof util.isBuffer = (val: any): val is Buffer => {
  return (
    val &&
    typeof val === "object" &&
    typeof val.copy === "function" &&
    typeof val.fill === "function" &&
    typeof val.readUInt8 === "function"
  );
};

export const isDeepStrictEqual: typeof util.isDeepStrictEqual = (a, b) =>
  JSON.stringify(a) === JSON.stringify(b);

// eslint-disable-next-line no-prototype-builtins
export const isObject: typeof util.isObject = (val) =>
  val !== null &&
  typeof val === "object" &&
  // eslint-disable-next-line no-prototype-builtins
  Object.getPrototypeOf(val).isPrototypeOf(Object);

export const isError: typeof util.isError = (val): val is Error =>
  val instanceof Error;

// Source https://github.com/jonschlinkert/is-primitive/blob/b22c524da5cbac075f14145780ec4b3637afd7dc/index.js
export const isPrimitive: typeof util.isPrimitive = (val) => {
  if (typeof val === "object") {
    return val === null;
  }
  return typeof val !== "function";
};
