type ConsolaUtils = typeof import("consola/utils");

// TODO: https://github.com/unjs/consola/issues/263

const _colorize = String;

export const colorize: ConsolaUtils["colorize"] = (color, str) =>
  _colorize(str);

export const getColor: ConsolaUtils["getColor"] = (color, fallback) => () =>
  _colorize(color);

export const stripAnsi: ConsolaUtils["stripAnsi"] = (str) => str;

export const box: ConsolaUtils["box"] = (str, opts) => str;

export const align: ConsolaUtils["align"] = (alignment, str, len, space) => str;
export const leftAlign: ConsolaUtils["leftAlign"] = (str, len, space?) => str;
export const rightAlign: ConsolaUtils["rightAlign"] = (str, len, space?) => str;
export const centerAlign: ConsolaUtils["centerAlign"] = (str, len, space?) =>
  str;

export const colors = new Proxy<ConsolaUtils["colors"]>({} as any, {
  get(_, colorName) {
    return _colorize;
  },
});

export default <ConsolaUtils>{
  colorize,
  getColor,
  stripAnsi,
  align,
  leftAlign,
  rightAlign,
  centerAlign,
  box,
  colors,
};
