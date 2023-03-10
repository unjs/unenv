import type buffer from "node:buffer";
import { Buffer } from "./_buffer";

export class File extends Blob implements buffer.File {
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
}
