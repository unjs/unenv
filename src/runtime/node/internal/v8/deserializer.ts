import type nodeV8 from "node:v8";

export class Deserializer implements nodeV8.Deserializer {
  readHeader() {
    return false;
  }
  readValue() {}
  transferArrayBuffer(id: number, arrayBuffer: ArrayBuffer) {}
  getWireFormatVersion() {
    return 0;
  }
  readUint32(): number {
    return 0;
  }
  readUint64(): [number, number] {
    return [0, 0];
  }
  readDouble(): number {
    return 0;
  }
  readRawBytes(length: number): Buffer {
    return Buffer.from("");
  }
}

export class DefaultDeserializer extends Deserializer {}
