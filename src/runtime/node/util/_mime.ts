import type {
  MIMEType as MIMETypeT,
  MIMEParams as MIMEParamsT,
} from "node:util";

// https://nodejs.org/api/util.html#class-utilmimetype

export class MIMEType implements MIMETypeT {
  params = new MIMEParams();
  type: string;
  subtype: string;

  constructor(input: string | { toString: () => string }) {
    const [essense = "", ...params] = String(input).split(";");
    const [type = "", subtype = ""] = essense.split("/");
    this.type = type;
    this.subtype = subtype;
    this.params = new MIMEParams();
    for (const param of params) {
      const [name, value] = param.split("=");
      this.params.set(name, value);
    }
  }

  get essence() {
    return this.type + "/" + this.subtype;
  }

  toString() {
    const paramsStr = this.params.toString();
    return this.essence + (paramsStr ? `;${paramsStr}` : "");
  }
}

// https://nodejs.org/api/util.html#util_class_util_mimeparams

export class MIMEParams extends Map<string, string> implements MIMEParamsT {
  get(name: string) {
    return (super.get(name) || null) as any;
  }

  toString() {
    return [...this.entries()]
      .map(([name, value]) => `${name}=${value}`)
      .join("&");
  }
}
