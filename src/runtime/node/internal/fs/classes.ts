import type fs from "node:fs";
import { notImplementedClass } from "../../../_internal/utils.ts";

export const Dir: typeof fs.Dir = /*@__PURE__*/ notImplementedClass("fs.Dir");

export const Dirent: typeof fs.Dirent =
  /*@__PURE__*/ notImplementedClass("fs.Dirent");

export const Stats: typeof fs.Stats =
  /*@__PURE__*/ notImplementedClass("fs.Stats");

export const ReadStream: typeof fs.ReadStream =
  /*@__PURE__*/ notImplementedClass("fs.ReadStream");

export const WriteStream: typeof fs.WriteStream =
  /*@__PURE__*/ notImplementedClass("fs.WriteStream");

export const StatsFs: typeof fs.StatsFs =
  /*@__PURE__*/ notImplementedClass("fs.StatsFs");

export const FileReadStream = ReadStream;

export const FileWriteStream = WriteStream;
