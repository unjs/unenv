import type punycode from "node:punycode";

import _punycode from "./internal/punycode/punycode";

export * from "./internal/punycode/punycode";

export default _punycode satisfies typeof punycode;
