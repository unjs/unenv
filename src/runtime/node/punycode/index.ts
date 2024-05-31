import type punycode from "node:punycode";

import _punycode from "./_punycode";

export * from "./_punycode";

export default <typeof punycode>_punycode;
