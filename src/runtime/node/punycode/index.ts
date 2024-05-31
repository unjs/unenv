import type punycode from "node:punycode";

import _punycode from "./internal/punycode";

export * from "./internal/punycode";

export default <typeof punycode>_punycode;
