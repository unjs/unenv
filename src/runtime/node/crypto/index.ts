import type nodeCrypto from "node:crypto";

import * as web from "./web";
import * as node from "./node";

export * from "./web";
export * from "./node";

export default <typeof nodeCrypto>{
  ...web,
  ...node,
};
