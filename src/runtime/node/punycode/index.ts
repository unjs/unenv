import type punycode from "node:punycode";

import * as _punycode from "punycode/";
export * from "punycode/";

export default <typeof punycode>{
  ..._punycode,
};
