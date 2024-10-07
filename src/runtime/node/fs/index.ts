// https://nodejs.org/api/fs.html
import type nodeFS from "node:fs";

import * as _classes from "./internal/classes";
import * as _constants from "./internal/constants";
import * as _fs from "./internal/fs";

import * as _promises from "./internal/promises";

export * from "./internal/classes";
export * from "./internal/constants";
export * from "./internal/fs";

export const promises = _promises;

export default <typeof nodeFS>{
  ..._classes,
  ..._constants,
  ..._fs,
  promises,
};
