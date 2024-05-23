// Mostly taken from: https://github.com/nodejs/node/blob/main/typings/internalBinding/constants.d.ts

import constants from "node:constants";
import * as os from "./os";
import * as fs from "./fs";
import * as crypto from "./crypto";

export * from "./os";
export * from "./fs";
export * from "./crypto";

export default <typeof constants>{
  ...crypto,
  ...fs,
  ...os,
};
