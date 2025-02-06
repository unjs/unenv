import type nodeCrypto from "node:crypto";

import * as web from "./internal/crypto/web";
import * as node from "./internal/crypto/node";
import constants from "./internal/crypto/constants";

export * from "./internal/crypto/web";
export * from "./internal/crypto/node";
export { default as constants } from "./internal/crypto/constants";

export default {
  ...web,
  ...node,
  // @ts-expect-error @types/node is out of date - this is a bug in typings
  constants,
} satisfies typeof nodeCrypto;
