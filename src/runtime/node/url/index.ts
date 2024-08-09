// https://nodejs.org/api/url.html
import type nodeUrl from "node:url";
import { ParsedUrlQuery } from "node:querystring";

import * as nodeUrl from "node-url";
const {
  parse,
  resolve,
  format,
  Url,
} = nodeUrl as any;

// TODO: https://github.com/unjs/unenv/issues/65
export const URL = globalThis.URL as typeof nodeUrl.URL;

export const URLSearchParams =
  globalThis.URLSearchParams as typeof nodeUrl.URLSearchParams;

export { Url, parse, resolve, format };


// https://nodejs.org/api/url.html#url_url_urltohttpoptions_url
export const urlToHttpOptions: typeof nodeUrl.urlToHttpOptions = function (
  url,
) {
  return {
    protocol: url.protocol,
    hostname: url.hostname,
    hash: url.hash,
    search: url.search,
    pathname: url.pathname,
    path: url.pathname + url.search || "",
    href: url.href,
    port: url.port,

    auth: url.username
      ? url.username + url.password
        ? ":" + url.password
        : ""
      : "",
  };
};

// https://nodejs.org/api/url.html#url_url_domaintoascii_domain
// TODO
export const domainToASCII: typeof nodeUrl.domainToASCII = function (domain) {
  return domain;
};

// https://nodejs.org/api/url.html#url_url_domaintounicode_domain
// TODO
export const domainToUnicode: typeof nodeUrl.domainToUnicode = function (
  domain,
) {
  return domain;
};

// https://nodejs.org/api/url.html#url_url_pathtofileurl_path
// TODO
export const pathToFileURL: typeof nodeUrl.pathToFileURL = function (path) {
  return new URL(path);
};

// https://nodejs.org/api/url.html#url_url_fileurltopath_url
// TODO
export const fileURLToPath: typeof nodeUrl.fileURLToPath = function (url) {
  if (typeof url === "string") {
    url = new URL(url);
  }
  return url.pathname;
};

export const resolveObject = function resolveObject(
  source: string,
  relative: string,
) {
  if (!source) return relative;
  // Node.js logic: return urlParse(source, false, true).resolveObject(relative);
  return new URL(relative, source).toString();
};

export default {
  URL,
  // @ts-expect-error deprecated internal
  Url,
  resolveObject,
  URLSearchParams,
  domainToASCII,
  domainToUnicode,
  fileURLToPath,
  format,
  parse,
  pathToFileURL,
  resolve,
  urlToHttpOptions,
} satisfies typeof nodeUrl;
