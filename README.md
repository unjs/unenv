# unenv

<!-- automd:badges color=yellow packagephobia -->

[![npm version](https://img.shields.io/npm/v/unenv?color=yellow)](https://npmjs.com/package/unenv)
[![npm downloads](https://img.shields.io/npm/dm/unenv?color=yellow)](https://npmjs.com/package/unenv)

<!-- /automd -->

unenv provides a collection of Node.js and Web polyfills and mocking utilities with configurable presets for converting JavaScript code and libraries to be platform and runtime agnostic, working in any environment including Browsers, Workers, Node.js, Cloudflare Workers, Deno.

Unenv is used by [Nitro](https://nitro.unjs.io/) and [Nuxt](https://nuxt.com/) today.

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

[(view source)](./src/runtime/node)

<!-- automd:nodeCoverage -->

- [node:assert](https://nodejs.org/api/assert.html)  - 🚧 mocked using proxy 
- [node:assert/strict](https://nodejs.org/api/assert.html)  - 🚧 mocked using proxy 
- [node:async_hooks](https://nodejs.org/api/async_hooks.html)  - ✅ polyfilled all exports 
- [node:buffer](https://nodejs.org/api/buffer.html)  - ✅ polyfilled all exports 
- [node:child_process](https://nodejs.org/api/child_process.html)  - ✅ polyfilled all exports 
- [node:cluster](https://nodejs.org/api/cluster.html)  - ✅ polyfilled all exports 
- [node:console](https://nodejs.org/api/console.html)  - ✅ polyfilled 23/25 exports 
- [node:constants](https://nodejs.org/api/constants.html)  - ✅ polyfilled all exports 
- [node:crypto](https://nodejs.org/api/crypto.html)  - ✅ polyfilled all exports 
- [node:dgram](https://nodejs.org/api/dgram.html)  - ✅ polyfilled all exports 
- [node:diagnostics_channel](https://nodejs.org/api/diagnostics_channel.html)  - ✅ polyfilled all exports 
- [node:dns](https://nodejs.org/api/dns.html)  - ✅ polyfilled all exports 
- [node:dns/promises](https://nodejs.org/api/dns.html)  - ✅ polyfilled all exports 
- [node:domain](https://nodejs.org/api/domain.html)  - ✅ polyfilled all exports 
- [node:events](https://nodejs.org/api/events.html)  - ✅ polyfilled 2/15 exports 
- [node:fs](https://nodejs.org/api/fs.html)  - ✅ polyfilled all exports 
- [node:fs/promises](https://nodejs.org/api/fs.html)  - ✅ polyfilled all exports 
- [node:http](https://nodejs.org/api/http.html)  - ✅ polyfilled 16/17 exports 
- [node:http2](https://nodejs.org/api/http2.html)  - ✅ polyfilled all exports 
- [node:https](https://nodejs.org/api/https.html)  - ✅ polyfilled all exports 
- [node:inspector](https://nodejs.org/api/inspector.html)  - ✅ polyfilled all exports 
- [node:inspector/promises](https://nodejs.org/api/inspector.html)  - 🚧 mocked using proxy 
- [node:module](https://nodejs.org/api/module.html)  - ✅ polyfilled 9/21 exports 
- [node:net](https://nodejs.org/api/net.html)  - ✅ polyfilled 14/18 exports 
- [node:os](https://nodejs.org/api/os.html)  - ✅ polyfilled all exports 
- [node:path](https://nodejs.org/api/path.html)  - ✅ polyfilled 15/16 exports 
- [node:path/posix](https://nodejs.org/api/path.html)  - ✅ polyfilled 15/16 exports 
- [node:path/win32](https://nodejs.org/api/path.html)  - ✅ polyfilled 15/16 exports 
- [node:perf_hooks](https://nodejs.org/api/perf_hooks.html)  - ✅ polyfilled all exports 
- [node:process](https://nodejs.org/api/process.html)  - ✅ polyfilled 84/92 exports 
- [node:punycode](https://nodejs.org/api/punycode.html)  - ✅ polyfilled all exports 
- [node:querystring](https://nodejs.org/api/querystring.html)  - ✅ polyfilled all exports 
- [node:readline](https://nodejs.org/api/readline.html)  - ✅ polyfilled all exports 
- [node:readline/promises](https://nodejs.org/api/readline.html)  - ✅ polyfilled all exports 
- [node:repl](https://nodejs.org/api/repl.html)  - 🚧 mocked using proxy 
- [node:stream](https://nodejs.org/api/stream.html)  - ✅ polyfilled 17/37 exports 
- [node:stream/consumers](https://nodejs.org/api/stream.html)  - ✅ polyfilled all exports 
- [node:stream/promises](https://nodejs.org/api/stream.html)  - ✅ polyfilled all exports 
- [node:stream/web](https://nodejs.org/api/stream.html)  - ✅ polyfilled 16/17 exports 
- [node:string_decoder](https://nodejs.org/api/string_decoder.html)  - ✅ polyfilled all exports 
- [node:sys](https://nodejs.org/api/sys.html)  - ✅ polyfilled all exports 
- [node:timers](https://nodejs.org/api/timers.html)  - ✅ polyfilled all exports 
- [node:timers/promises](https://nodejs.org/api/timers.html)  - ✅ polyfilled all exports 
- [node:tls](https://nodejs.org/api/tls.html)  - ✅ polyfilled all exports 
- [node:trace_events](https://nodejs.org/api/trace_events.html)  - ✅ polyfilled all exports 
- [node:tty](https://nodejs.org/api/tty.html)  - ✅ polyfilled all exports 
- [node:url](https://nodejs.org/api/url.html)  - ✅ polyfilled 10/12 exports 
- [node:util](https://nodejs.org/api/util.html)  - ✅ polyfilled all exports 
- [node:util/types](https://nodejs.org/api/util.html)  - ✅ polyfilled all exports 
- [node:v8](https://nodejs.org/api/v8.html)  - ✅ polyfilled all exports 
- [node:vm](https://nodejs.org/api/vm.html)  - ✅ polyfilled all exports 
- [node:wasi](https://nodejs.org/api/wasi.html)  - ✅ polyfilled all exports 
- [node:worker_threads](https://nodejs.org/api/worker_threads.html)  - ✅ polyfilled all exports 
- [node:zlib](https://nodejs.org/api/zlib.html)  - ✅ polyfilled all exports

<!-- /automd -->

## npm packages

`unenv` provides a replacement for common npm packages for cross platform compatibility.

[(view source)](./src/runtime/npm)

## Mocking utils

```js
import MockProxy from "unenv/runtime/mock/proxy";

console.log(MockProxy().foo.bar()[0]);
```

The above package doesn't work outside of Node.js and neither we need any platform-specific logic! When aliasing `os` to `mock/proxy-cjs`, it will be auto-mocked using a [Proxy Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) which can be recursively traversed like an `Object`, called like a `Function`, Iterated like an `Array`, or instantiated like a `Class`.

We use this proxy for auto-mocking unimplemented internals. Imagine a package does this:

```js
const os = require("node:os");
if (os.platform() === "windows") {
  /* do some fix */
}
module.exports = "Hello world";
```

By aliasing `os` to `unenv/runtime/mock/proxy-cjs`, the code will be compatible with other platforms.

## Other polyfills

To discover other polyfills, please check [./src/runtime](./src/runtime).

## Nightly release channel

You can use nightly release channel to try latest changes in `main` branch via [`unenv-nightly`](https://www.npmjs.com/package/unenv-nightly).

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
