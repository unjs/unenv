import type nodeCrypto from "node:crypto";

import * as web from "./internal/web";
import * as node from "./internal/node";

export * from "./internal/web";
export * from "./internal/node";

export default <typeof nodeCrypto>{
  ...web,
  ...node,
};
