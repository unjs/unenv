import type fsp from "node:fs/promises";

import * as _promises from "../internal/fs/promises";

export * from "../internal/fs/promises";

export default <typeof fsp>{
  ..._promises,
};
