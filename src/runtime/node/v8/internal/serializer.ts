import type v8 from "node:v8";

export class Serializer implements v8.Serializer {
  writeHeader() {}
  writeValue(val: any) {
    return false;
  }
  releaseBuffer(): Buffer {
    return Buffer.from("");
  }
  transferArrayBuffer(id: number, arrayBuffer: ArrayBuffer) {}
  writeDouble(value: number) {}
  writeUint32(value: number) {}
  writeUint64(hi: number, lo: number) {}
  writeRawBytes(buffer: NodeJS.TypedArray) {}
}

export class DefaultSerializer extends Serializer {}
