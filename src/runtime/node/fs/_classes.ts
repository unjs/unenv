import type fs from "node:fs";
import mock from "../../mock/proxy";

export const Dir: typeof fs.Dir = mock.__createMock__("fs.Dir");

export const Dirent: typeof fs.Dirent = mock.__createMock__("fs.Dirent");

export const Stats: typeof fs.Stats = mock.__createMock__("fs.Stats");

export const ReadStream: typeof fs.ReadStream = mock.__createMock__("fs.ReadStream");

export const WriteStream: typeof fs.WriteStream = mock.__createMock__("fs.WriteStream");

export const FileReadStream = mock.__createMock__("fs.FileReadStream");

export const FileWriteStream = mock.__createMock__("fs.FileWriteStream");
