// Source: https://github.com/nodejs/node/blob/v22.7.0/lib/internal/errors.js

function fmt(val: unknown): string {
  if (Array.isArray(val)) {
    return val.map((v) => fmt(v)).join(" or ");
  }
  if (!val) {
    return "" + val;
  }
  return val.toString();
}

export class ERR_INVALID_ARG_VALUE extends TypeError {
  code = "ERR_INVALID_ARG_VALUE";
  constructor(name: string, value: unknown, reason: string) {
    super(
      `The ${name.includes(".") ? "property" : "argument"} '${name}' ${reason}. Received ${value}`,
    );
  }
}

export class ERR_INVALID_ARG_TYPE extends TypeError {
  code = "ERR_INVALID_ARG_TYPE";
  constructor(name: string, expected: unknown, actual: unknown) {
    super(
      `The "${name}" argument must be of type ${fmt(expected)}. Received ${fmt(actual)}`,
    );
  }
}

export class ERR_INVALID_URL extends TypeError {
  code = "ERR_INVALID_URL";
  input: string;
  base?: string;
  constructor(input: string, base?: string) {
    // Don't include URL in message.
    // (See https://github.com/nodejs/node/pull/38614)
    super("Invalid URL");

    this.input = input;

    if (base != null) {
      this.base = base;
    }
  }
}

export class ERR_INVALID_URL_SCHEME extends TypeError {
  code = "ERR_INVALID_URL_SCHEME";
  constructor(expected: string) {
    super(`The URL must be of scheme ${expected}`);
  }
}

export class ERR_INVALID_FILE_URL_PATH extends TypeError {
  code = "ERR_INVALID_FILE_URL_PATH";
  constructor(path: string) {
    super(`Invalid ile URL path: ${path}`);
  }
}

export class ERR_INVALID_FILE_URL_HOST extends TypeError {
  code = "ERR_INVALID_FILE_URL_HOST";
  constructor(host: string) {
    super(`File URL host must be "localhost" or empty on ${host}`);
  }
}
