import type nodePunycode from "node:punycode";

import _punycode from "./internal/punycode/punycode.ts";

export * from "./internal/punycode/punycode.ts";

export default _punycode satisfies typeof nodePunycode;
