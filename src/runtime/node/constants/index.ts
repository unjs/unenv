// Mostly taken from: https://github.com/nodejs/node/blob/main/typings/internalBinding/constants.d.ts

import type constants from "node:constants";
import * as os from "./iternal/os";
import * as fs from "./iternal/fs";
import * as crypto from "./iternal/crypto";

export * from "./iternal/os";
export * from "./iternal/fs";
export * from "./iternal/crypto";

export default <typeof constants>{
  ...crypto,
  ...fs,
  ...os,
};
