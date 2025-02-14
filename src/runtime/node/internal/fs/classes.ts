import type nodeFs from "node:fs";
import { notImplementedClass } from "../../../_internal/utils.ts";

export const Dir: typeof nodeFs.Dir =
  /*@__PURE__*/ notImplementedClass("fs.Dir");

export const Dirent: typeof nodeFs.Dirent =
  /*@__PURE__*/ notImplementedClass("fs.Dirent");

export const Stats: typeof nodeFs.Stats =
  /*@__PURE__*/ notImplementedClass("fs.Stats");

export const ReadStream: typeof nodeFs.ReadStream =
  /*@__PURE__*/ notImplementedClass("fs.ReadStream");

export const WriteStream: typeof nodeFs.WriteStream =
  /*@__PURE__*/ notImplementedClass("fs.WriteStream");

export const FileReadStream = ReadStream;

export const FileWriteStream = WriteStream;
