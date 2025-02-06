// Mostly taken from: https://github.com/nodejs/node/blob/main/typings/internalBinding/constants.d.ts

import type constants from "node:constants";
import * as os from "./internal/constants/os";
import * as fs from "./internal/constants/fs";
import * as crypto from "./internal/constants/crypto";

export * from "./internal/constants/os";
export * from "./internal/constants/fs";
export * from "./internal/constants/crypto";

export default <typeof constants>{
  ...crypto,
  ...fs,
  ...os,
};
