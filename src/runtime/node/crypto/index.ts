import type nodeCrypto from "node:crypto";

import * as web from "./internal/web";
import * as node from "./internal/node";
import constants from "./internal/constants";

export * from "./internal/web";
export * from "./internal/node";
export { default as constants } from "./internal/constants";

export default {
  ...web,
  ...node,
  // @ts-expect-error @types/node is out of date - this is a bug in typings
  constants,
} satisfies typeof nodeCrypto;
