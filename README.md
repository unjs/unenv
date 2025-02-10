# unenv

<!-- automd:badges color=yellow packagephobia -->

[![npm version](https://img.shields.io/npm/v/unenv?color=yellow)](https://npmjs.com/package/unenv)
[![npm downloads](https://img.shields.io/npm/dm/unenv?color=yellow)](https://npm.chart.dev/unenv)

<!-- /automd -->

> [!NOTE]
> You are on the development (v2) branch. Check out [v1](https://github.com/unjs/unenv/tree/v1) for the current release.

Unjs, provides (build-time) polyfills to add [Node.js](https://nodejs.org/) compatibility to any JavaScript runtime, including Browsers and edge workers.

Unenv is used by [Nitro](https://nitro.unjs.io/) and [Nuxt](https://nuxt.com/) today.

## 🌟 Used by

- [Nitro](https://nitro.build/)
- [Nuxt](https://nuxt.com/)
- [Cloudflare](https://developers.cloudflare.com/workers/runtime-apis/nodejs/)
- [ESM.sh](https://esm.sh/)

## Usage

You can use `defineEnv` utility in order to generate target environment configuration.

```js
import { defineEnv } from "unenv";

const { env } = defineEnv({
  /* options */
});

const { alias, inject, external, polyfill } = env;
```

You can then integrate env object with your build tool:

| Bundler  | `alias`                                                                       | `inject`                                                                       | `external`                                                               |
| -------- | ----------------------------------------------------------------------------- | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------ |
| rollup   | [`@rollup/plugin-alias`](https://www.npmjs.com/package/@rollup/plugin-alias)  | [`@rollup/plugin-inject`](https://www.npmjs.com/package/@rollup/plugin-inject) | [`external`](https://rollupjs.org/configuration-options/#external)       |
| rolldown | [`resolve.alias`](https://rolldown.rs/reference/config-options#resolve-alias) | [`inject`](https://rolldown.rs/reference/config-options#inject)                | [`external`](https://rolldown.rs/reference/config-options#external)      |
| vite     | [`resolve.alias`](https://vite.dev/config/shared-options#resolve-alias)       | [`@rollup/plugin-inject`](https://www.npmjs.com/package/@rollup/plugin-inject) | [`ssr.external`](https://vite.dev/config/ssr-options#ssr-external)       |
| esbuild  | [`alias`](https://esbuild.github.io/api/#alias)                               | [`inject`](https://esbuild.github.io/api/#inject)                              | [`external`](https://esbuild.github.io/api/#external)                    |
| rspack   | [`resolve.alias`](https://rspack.dev/config/resolve#resolvealias)             | -                                                                              | [`externals`](https://rspack.dev/config/externals#externals-1)           |
| webpack  | [`resolve.alias`](https://webpack.js.org/configuration/resolve/#resolvealias) | [`webpack-plugin-inject`](https://www.npmjs.com/package/webpack-inject-plugin) | [`externals`](https://webpack.js.org/configuration/externals/#externals) |

**Note:** You can provide as many presets as you want. unenv will merge them internally and the right-most preset has a higher priority.

### Using direct imports

You can also directly import `unenv/` polyfills:

| Polyfills        | Description                                | Source                                                                                 |
| ---------------- | ------------------------------------------ | -------------------------------------------------------------------------------------- |
| `unenv/mock/*`   | Mocking utils                              | [`src/runtime/mock`](https://github.com/unjs/unenv/tree/main/src/runtime/mock)         |
| `unenv/node/*`   | APIs compatible with `Node.js` API         | [`src/runtime/node`](https://github.com/unjs/unenv/tree/main/src/runtime/node)         |
| `unenv/npm`      | NPM package shims for lighter replacements | [`src/runtime/npm`](https://github.com/unjs/unenv/tree/main/src/runtime/mock)          |
| `unenv/polyfill` | Global polyfills                           | [`src/runtime/polyfill`](https://github.com/unjs/unenv/tree/main/src/runtime/polyfill) |
| `unenv/web`      | Subset of Web APIs                         | [`src/runtime/web`](https://github.com/unjs/unenv/tree/main/src/runtime/web)           |

## Built-in Node.js modules

`unenv` provides a replacement for Node.js built-in modules compatible with any runtime.

<!-- automd:file src="./coverage/unenv.md" -->

- ✅ [node:assert](https://nodejs.org/api/assert.html)
- ✅ [node:assert/strict](https://nodejs.org/api/assert.html)
- ✅ [node:async_hooks](https://nodejs.org/api/async_hooks.html)
- ✅ [node:buffer](https://nodejs.org/api/buffer.html)
- ✅ [node:child_process](https://nodejs.org/api/child_process.html)
- ✅ [node:cluster](https://nodejs.org/api/cluster.html)
- ✅ [node:console](https://nodejs.org/api/console.html)
- ✅ [node:constants](https://nodejs.org/api/constants.html)
- ✅ [node:crypto](https://nodejs.org/api/crypto.html)
- ✅ [node:dgram](https://nodejs.org/api/dgram.html)
- ✅ [node:diagnostics_channel](https://nodejs.org/api/diagnostics_channel.html)
- ✅ [node:dns](https://nodejs.org/api/dns.html)
- ✅ [node:dns/promises](https://nodejs.org/api/dns.html)
- ✅ [node:domain](https://nodejs.org/api/domain.html)
- ✅ [node:events](https://nodejs.org/api/events.html)
- ✅ [node:fs](https://nodejs.org/api/fs.html)
- ✅ [node:fs/promises](https://nodejs.org/api/fs.html)
- ✅ [node:http](https://nodejs.org/api/http.html)
- ✅ [node:http2](https://nodejs.org/api/http2.html)
- ✅ [node:https](https://nodejs.org/api/https.html)
- ✅ [node:inspector](https://nodejs.org/api/inspector.html)
- ✅ [node:inspector/promises](https://nodejs.org/api/inspector.html)
- ✅ [node:module](https://nodejs.org/api/module.html)
- ✅ [node:net](https://nodejs.org/api/net.html)
- ✅ [node:os](https://nodejs.org/api/os.html)
- ✅ [node:path](https://nodejs.org/api/path.html)
- ✅ [node:path/posix](https://nodejs.org/api/path.html)
- ✅ [node:path/win32](https://nodejs.org/api/path.html)
- ✅ [node:perf_hooks](https://nodejs.org/api/perf_hooks.html)
- ✅ [node:process](https://nodejs.org/api/process.html)
- ✅ [node:punycode](https://nodejs.org/api/punycode.html)
- ✅ [node:querystring](https://nodejs.org/api/querystring.html)
- ✅ [node:readline](https://nodejs.org/api/readline.html)
- ✅ [node:readline/promises](https://nodejs.org/api/readline.html)
- ✅ [node:repl](https://nodejs.org/api/repl.html)
- ✅ [node:stream](https://nodejs.org/api/stream.html)
- ✅ [node:stream/consumers](https://nodejs.org/api/stream.html)
- ✅ [node:stream/promises](https://nodejs.org/api/stream.html)
- ✅ [node:stream/web](https://nodejs.org/api/stream.html)
- ✅ [node:string_decoder](https://nodejs.org/api/string_decoder.html)
- ✅ [node:sys](https://nodejs.org/api/sys.html)
- ✅ [node:timers](https://nodejs.org/api/timers.html)
- ✅ [node:timers/promises](https://nodejs.org/api/timers.html)
- ✅ [node:tls](https://nodejs.org/api/tls.html)
- ✅ [node:trace_events](https://nodejs.org/api/trace_events.html)
- ✅ [node:tty](https://nodejs.org/api/tty.html)
- ✅ [node:url](https://nodejs.org/api/url.html)
- ✅ [node:util](https://nodejs.org/api/util.html)
- ✅ [node:util/types](https://nodejs.org/api/util.html)
- ✅ [node:v8](https://nodejs.org/api/v8.html)
- ✅ [node:vm](https://nodejs.org/api/vm.html)
- ✅ [node:wasi](https://nodejs.org/api/wasi.html)
- ✅ [node:worker_threads](https://nodejs.org/api/worker_threads.html)
- ✅ [node:zlib](https://nodejs.org/api/zlib.html)

<!-- /automd -->

[(view source)](./src/runtime/node)

## Manual mocking utils

```js
// Magic proxy to replace any unknown API
import MockProxy from "unenv/mock/proxy";

// You can also create named mocks
const lib = MockProxy.__createMock__("lib", {
  /* overrides */
});
```

[(view source)](./src/runtime/mock)

## Other polyfills

To discover other polyfills, please check [./src/runtime](./src/runtime).

## Nightly release channel

You can use the nightly release channel to try the latest changes in the `main` branch via [`unenv-nightly`](https://www.npmjs.com/package/unenv-nightly).

If directly using `unenv` in your project:

```json
{
  "devDependencies": {
    "unenv": "npm:unenv-nightly"
  }
}
```

If using `unenv` via another tool (Nuxt or Nitro) in your project:

```json
{
  "resolutions": {
    "unenv": "npm:unenv-nightly"
  }
}
```

## License

<!-- automd:contributors license=MIT author=pi0 -->

Published under the [MIT](https://github.com/unjs/unenv/blob/main/LICENSE) license.
Made by [@pi0](https://github.com/pi0) and [community](https://github.com/unjs/unenv/graphs/contributors) 💛
<br><br>
<a href="https://github.com/unjs/unenv/graphs/contributors">
<img src="https://contrib.rocks/image?repo=unjs/unenv" />
</a>

<!-- /automd -->

<!-- automd:with-automd -->

---

_🤖 auto updated with [automd](https://automd.unjs.io)_

<!-- /automd -->
