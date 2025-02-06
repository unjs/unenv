// Mostly taken from: https://github.com/nodejs/node/blob/main/typings/internalBinding/constants.d.ts

import type constants from "node:constants";
import * as os from "./internal/constants/os.ts";
import * as fs from "./internal/constants/fs.ts";
import * as crypto from "./internal/constants/crypto.ts";

export * from "./internal/constants/os.ts";
export * from "./internal/constants/fs.ts";
export * from "./internal/constants/crypto.ts";

export default <typeof constants>{
  ...crypto,
  ...fs,
  ...os,
};
