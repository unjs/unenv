// https://nodejs.org/api/url.html
import type url from "node:url";

// @ts-expect-error https://github.com/unjs/unenv/issues/65
export const URL = globalThis.URL as typeof url.URL;

export const URLSearchParams = globalThis.URLSearchParams;

// https://nodejs.org/api/url.html#url_url_parse_urlstring_parsequerystring_slashesdenotehost
// TODO
export const parse = <typeof url.parse>(
  function (
    urlString,
    parseQueryString?,
    slashesDenoteHost?
  ): URL | url.UrlWithStringQuery {
    const url = new URL(urlString);
    if (!parseQueryString && !slashesDenoteHost) {
      return url;
    }
    throw new Error("parseQueryString and slashesDenoteHost are unsupported");
  }
);

// https://nodejs.org/api/url.html#url_url_resolve_from_to
export const resolve = <typeof url.resolve>function (from, to) {
  const resolvedUrl = new URL(to, new URL(from, "resolve://"));
  if (resolvedUrl.protocol === "resolve:") {
    const { pathname, search, hash } = resolvedUrl;
    return pathname + search + hash;
  }
  return resolvedUrl.toString();
};

// https://nodejs.org/api/url.html#url_url_urltohttpoptions_url
export const urlToHttpOptions = <typeof url.urlToHttpOptions>function (url) {
  return {
    protocol: url.protocol,
    hostname: url.hostname,
    hash: url.hash,
    search: url.search,
    pathname: url.pathname,
    path: url.pathname + url.search || "",
    href: url.href,
    port: url.port,
    // eslint-disable-next-line unicorn/prefer-logical-operator-over-ternary
    auth: url.username
      ? url.username + url.password
        ? ":" + url.password
        : ""
      : "",
  };
};

// https://nodejs.org/api/url.html#url_url_format_urlobject
// TODO
export const format = <typeof url.format>(
  function (urlInput, options?: url.URLFormatOptions) {
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
  }
);

// https://nodejs.org/api/url.html#url_url_domaintoascii_domain
// TODO
export const domainToASCII = <typeof url.domainToASCII>function (domain) {
  return domain;
};

// https://nodejs.org/api/url.html#url_url_domaintounicode_domain
// TODO
export const domainToUnicode = <typeof url.domainToUnicode>function (domain) {
  return domain;
};

// https://nodejs.org/api/url.html#url_url_pathtofileurl_path
// TODO
export const pathToFileURL = <typeof url.pathToFileURL>function (path) {
  return new URL(path);
};

// https://nodejs.org/api/url.html#url_url_fileurltopath_url
// TODO
export const fileURLToPath = <typeof url.fileURLToPath>function (url) {
  if (typeof url === "string") {
    url = new URL(url);
  }
  return url.pathname;
};

export default <typeof url>{
  URL,
  URLSearchParams,
  domainToASCII,
  domainToUnicode,
  fileURLToPath,
  format,
  parse,
  pathToFileURL,
  resolve,
  urlToHttpOptions,
};
