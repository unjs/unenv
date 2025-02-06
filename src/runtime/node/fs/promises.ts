import type fsp from "node:fs/promises";

import * as _promises from "../internal/fs/promises.ts";

export * from "../internal/fs/promises.ts";

export default <typeof fsp>{
  ..._promises,
};
