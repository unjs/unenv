// Source: https://github.com/nodejs/node/blob//v22.7.0/test/parallel/test-url-domain-ascii-unicode.js

import assert from "node:assert";

import url from "../../src/runtime/node/url.ts";

const domainToASCII = url.domainToASCII;

const domainToUnicode = url.domainToUnicode;

const domainWithASCII = [
  ["ıíd", "xn--d-iga7r"],
  ["يٴ", "xn--mhb8f"],
  ["www.ϧƽəʐ.com", "www.xn--cja62apfr6c.com"],
  ["новини.com", "xn--b1amarcd.com"],
  ["名がドメイン.com", "xn--v8jxj3d1dzdz08w.com"],
  ["افغانستا.icom.museum", "xn--mgbaal8b0b9b2b.icom.museum"],
  ["الجزائر.icom.fake", "xn--lgbbat1ad8j.icom.fake"],
  ["भारत.org", "xn--h2brj9c.org"],
];

for (const pair of domainWithASCII) {
  const domain = pair[0];
  const ascii = pair[1];
  const domainConvertedToASCII = domainToASCII(domain);
  assert.strictEqual(domainConvertedToASCII, ascii);
  const asciiConvertedToUnicode = domainToUnicode(ascii);
  assert.strictEqual(asciiConvertedToUnicode, domain);
}
