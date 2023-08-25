import type fsp from "node:fs/promises";

import * as _promises from "./_promises";

export * from "./_promises";

export default <typeof fsp>{
  ..._promises,
};
