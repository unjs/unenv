# unenv

<!-- automd:badges color=yellow packagephobia -->

[![npm version](https://img.shields.io/npm/v/unenv?color=yellow)](https://npmjs.com/package/unenv)
[![npm downloads](https://img.shields.io/npm/dm/unenv?color=yellow)](https://npm.chart.dev/unenv)

<!-- /automd -->

unenv provides a collection of Node.js and Web polyfills and mocking utilities with configurable presets for converting JavaScript code and libraries to be platform and runtime agnostic, working in any environment including Browsers, Workers, Node.js, Cloudflare Workers, Deno.

Unenv is used by [Nitro](https://nitro.unjs.io/) and [Nuxt](https://nuxt.com/) today.

> [!NOTE]
> You are on the development (v2) branch. Check out [v1](https://github.com/unjs/unenv/tree/v1) for the current release.

## Install

<!-- automd:pm-i dev -->

```sh
# ✨ Auto-detect
npx nypm install -D unenv

# npm
npm install -D unenv

# yarn
yarn add -D unenv

# pnpm
pnpm install -D unenv

# bun
bun install -D unenv

# deno
deno install --dev unenv
```

<!-- /automd -->

## Usage

Using `env` utility and built-in presets, `unenv` will provide an abstract configuration that can be used in bundlers ([rollup.js](https://rollupjs.org), [webpack](https://webpack.js.org), etc.).

```js
import { env } from "unenv";

const { alias, inject, polyfill, external } = env({}, {}, {});
```

**Note:** You can provide as many presets as you want. unenv will merge them internally and the right-most preset has a higher priority.

## Presets

### `node`

[(view source)](./src/presets/node.ts)

Suitable to convert universal libraries working in Node.js.

- Add supports for global [`fetch` API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- Set Node.js built-ins as externals

```js
import { env, node } from "unenv";

const envConfig = env(node, {});
```

### `nodeless`

[(view source)](./src/presets/nodeless.ts)

Suitable to transform libraries made for Node.js to run in other JavaScript runtimes.

```js
import { env, nodeless } from "unenv";

const envConfig = env(nodeless, {});
```

### `deno`

[(view source)](./src/presets/deno.ts)

This preset can be used to extend `nodeless` to use Deno's Node.js API Compatibility ([docs](https://docs.deno.com/runtime/manual/node/compatibility), [docs](https://docs.deno.com/deploy/api/runtime-node)).

> [!WARNING]
> This preset is **experimental** and behavior might change!

```js
import { env, nodeless, deno } from "unenv";

const envConfig = env(nodeless, deno, {});
```

### `cloudflare`

[(view source)](./src/presets/cloudflare.ts)

This preset can be used to extend `nodeless` to use [Cloudflare Worker](https://workers.cloudflare.com/) Node.js API Compatibility ([docs](https://developers.cloudflare.com/workers/runtime-apis/nodejs/)).

> [!WARNING]
> This preset is **experimental** and behavior might change!

> [!NOTE]
> Make sure to enable [`nodejs_compat`](https://developers.cloudflare.com/workers/configuration/compatibility-dates/#nodejs-compatibility-flag) compatibility flag.

```js
import { env, nodeless, cloudflare } from "unenv";

const envConfig = env(nodeless, cloudflare, {});
```

### `vercel`

This preset can be used to extend `nodeless` to use [Vercel Edge](https://vercel.com/docs/functions/edge-functions/edge-runtime) Node.js API Compatibility ([docs](https://vercel.com/docs/functions/edge-functions/edge-runtime#compatible-node.js-modules)).

> [!WARNING]
> This preset is **experimental** and behavior might change!

```js
import { env, nodeless, vercel } from "unenv";

const envConfig = env(nodeless, vercel, {});
```

## Built-in Node.js modules

`unenv` provides a replacement for Node.js built-in modules compatible with any runtime.

<!-- automd:nodeCoverage -->

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
- 🚧 [node:inspector/promises](https://nodejs.org/api/inspector.html)
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
- 🚧 [node:repl](https://nodejs.org/api/repl.html)
- 🚧 [node:stream](https://nodejs.org/api/stream.html) <!-- missing _isArrayBufferView, duplexPair, getDefaultHighWaterMark, isDestroyed, isWritable, promises, setDefaultHighWaterMark exports -->
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
- 🚧 [node:zlib](https://nodejs.org/api/zlib.html) <!-- missing crc32 exports -->

<!-- /automd -->

[(view source)](./src/runtime/node)

## Package replacements

`unenv` provides a replacement for common npm packages for cross-platform compatibility.

[(view source)](./src/runtime/npm)

## Manual mocking utils

```js
// Magic proxy to replace any unknown API
import MockProxy from "unenv/runtime/mock/proxy";

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
