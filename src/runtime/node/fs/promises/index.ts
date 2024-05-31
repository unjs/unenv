import type fsp from "node:fs/promises";

import * as _promises from "../internal/promises";

export * from "../internal/promises";

export default <typeof fsp>{
  ..._promises,
};
