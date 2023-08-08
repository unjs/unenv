// https://nodejs.org/api/fs.html
import type fs from "node:fs";

import * as _classes from "./_classes";
import * as _constants from "./_constants";
import * as _fs from "./_fs";

import * as _promises from "./promises/_promises";

export * from "./_classes";
export * from "./_constants";
export * from "./_fs";

export const promises = _promises;

export default <typeof fs>{
  ..._classes,
  ..._constants,
  ..._fs,
  promises,
};
