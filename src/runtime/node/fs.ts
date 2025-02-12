// https://nodejs.org/api/fs.html
import type nodeFS from "node:fs";

import * as _classes from "./internal/fs/classes.ts";
import * as _constants from "./internal/fs/constants.ts";
import * as _fs from "./internal/fs/fs.ts";

import * as _promises from "./internal/fs/promises.ts";

export * from "./internal/fs/classes.ts";
export * from "./internal/fs/constants.ts";
export * from "./internal/fs/fs.ts";

export const promises = _promises;

export default {
  ..._classes,
  ..._constants,
  ..._fs,
  promises,
} satisfies Omit<typeof nodeFS, "StatsFs" /* interface only */>;
