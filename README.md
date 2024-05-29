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
