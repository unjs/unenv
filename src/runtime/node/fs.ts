// https://nodejs.org/api/fs.html
import type nodeFS from "node:fs";

import * as _classes from "./internal/fs/classes";
import * as _constants from "./internal/fs/constants";
import * as _fs from "./internal/fs/fs";

import * as _promises from "./internal/fs/promises";

export * from "./internal/fs/classes";
export * from "./internal/fs/constants";
export * from "./internal/fs/fs";

export const promises = _promises;

export default <typeof nodeFS>{
  ..._classes,
  ..._constants,
  ..._fs,
  promises,
};
