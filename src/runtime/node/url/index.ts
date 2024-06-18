// https://nodejs.org/api/url.html
import type nodeUrl from "node:url";
import { ParsedUrlQuery } from "node:querystring";

// TODO: https://github.com/unjs/unenv/issues/65
export const URL = globalThis.URL as typeof nodeUrl.URL;

export const URLSearchParams =
  globalThis.URLSearchParams as typeof nodeUrl.URLSearchParams;

// Output of `url.parse`
// NOTE: Node.js Url parsing is different, we might need to inline Node.js parser in case of issues
// https://github.com/nodejs/node/blob/73fa9ab7a58a3cbc53ed418543f5f6fd26e8f87a/lib/url.js#L169
export class Url extends URL implements nodeUrl.Url {
  constructor(input: string, base?: string | URL) {
    super(input, base);
  }
  get path() {
    return this.pathname;
  }
  get query() {
    return this.search;
  }
  get slashes() {
    return this.pathname.startsWith("/");
  }
  get auth() {
    return this.username + (this.password ? ":" + this.password : "");
  }
}

// https://nodejs.org/api/url.html#url_url_parse_urlstring_parsequerystring_slashesdenotehost
// TODO
export const parse: typeof nodeUrl.parse = function (
  urlString,
  parseQueryString?,
  slashesDenoteHost?,
) {
  const url = new Url(urlString);
  if (!parseQueryString && !slashesDenoteHost) {
    return url as Url & { query: any };
  }
  throw new Error("parseQueryString and slashesDenoteHost are unsupported");
};

// https://nodejs.org/api/url.html#url_url_resolve_from_to
export const resolve: typeof nodeUrl.resolve = function (from, to) {
  const resolvedUrl = new URL(to, new URL(from, "resolve://"));
  if (resolvedUrl.protocol === "resolve:") {
    const { pathname, search, hash } = resolvedUrl;
    return pathname + search + hash;
  }
  return resolvedUrl.toString();
};

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

// https://nodejs.org/api/url.html#url_url_format_urlobject
// TODO
export const format: typeof nodeUrl.format = function (
  urlInput,
  options?: nodeUrl.URLFormatOptions,
) {
  let url: URL;
  if (typeof urlInput === "string") {
    url = new URL(urlInput);
  } else if (urlInput instanceof URL) {
    url = urlInput;
  } else {
    // TODO
    throw new TypeError("format urlObject is not supported");
  }
  if (options) {
    if (options.auth === false) {
      url.username = "";
      url.password = "";
    }
    if (options.fragment === false) {
      url.hash = "";
    }
    if (options.search === false) {
      url.search = "";
    }
    // TODO: handle options.unicode ?
  }
  return url.toString();
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
