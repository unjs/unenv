import type nodeCrypto from "node:crypto";

import * as web from "./internal/crypto/web.ts";
import * as node from "./internal/crypto/node.ts";
import constants from "./internal/crypto/constants.ts";

export * from "./internal/crypto/web.ts";
export * from "./internal/crypto/node.ts";
export { default as constants } from "./internal/crypto/constants.ts";

export default {
  ...web,
  ...node,
  // @ts-expect-error @types/node is out of date - this is a bug in typings
  constants,
} satisfies typeof nodeCrypto;
