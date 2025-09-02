import type nodeBuffer from "node:buffer";

export class File extends Blob implements nodeBuffer.File {
  readonly __unenv__ = true;

  size: number = 0;
  type: any = "";
  name: string = "";
  lastModified: number = 0;

  constructor(...args: any[]) {
    super(...args);
    throw new Error("[unenv] buffer.File is not implemented");
  }

  arrayBuffer(): Promise<ArrayBuffer> {
    throw new Error("Not implemented");
  }

  slice(): any {
    throw new Error("Not implemented");
  }

  text(): any {
    throw new Error("Not implemented");
  }

  stream(): any {
    throw new Error("Not implemented");
  }

  bytes(): Promise<Uint8Array<ArrayBuffer>> {
    throw new Error("Not implemented");
  }
}
