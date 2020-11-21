# un

Once upon a time, one server was all needed to have a website

And then SPAs<sup>1</sup> moved server code to browser

And then SSR<sup>2</sup> moved browser code to server

And then Workers<sup>3</sup> moved browser/server code to workers

Workers are neither NodeJS with `process` or Browser with `window`

Yet expected to run code that had to work both of them :}

**[1]** Single Page Applications
**[2]**  Server Side Rendering
**[3]**  https://workers.cloudflare.com

## What is un?

un is a collection of modules, polyfills and presets that work perfectly with any Javascript environemnt
including Browsers, Workers, NodeJS or pure JavaScript.

You still need a bundler like [rollup.js](https://rollupjs.org) and un will disapear as soon as is bundled.

The goal is that final bundle works consistent regardless of running context yet not adding excessive polyfills.

## Install

Install un as `devDependency`:

```bash
yarn add --dev @nuxt/un
# or
npm i -D @nuxt/un
```

You can import modules from `@nuxt/un/runtime/`

## Env

```js
import { env, nodeless } from '@nuxt/un'

const { alias, inject } = env(nodeless, {
  alias: {
    // custom aliases
  }
})
```

### Presets

- [node](./src/presets/node.ts)
- [nodeless](./src/presets/nodeless.ts)

## polyfills

- [fetch.node](./src.runtime/polyfill/fetch.node.ts)
- [process](./src.runtime/polyfill/process.ts)

## NodeJS

### `http`

- [IncomingMessage](./src.runtime/node/http/request.ts)
- [ServerResponse](./src.runtime/node/http/request.ts)
- [METHODS](./src.runtime/node/http/consts.ts)
- [STATUS_CODES](./src.runtime/node/http/consts.ts)

### `net`

- [Socket](./src.runtime/node/net/socket.ts)

### `stream`

- [Readable](./src.runtime/node/stream/readable.ts)
- [Writable](./src.runtime/node/stream/writable.ts)

## Mocks

- [proxy](./src.runtime/mock/proxy.ts)
- [empty](./src.runtime/mock/empty.ts)
- [noop](./src.runtime/mock/noop.ts)

## Packages

- [consola](./src.runtime/npm/consola.ts)
- [depd](./src.runtime/npm/depd.ts)
- [mime-db](./src.runtime/npm/mime-db.ts)
- [mime](./src.runtime/npm/mime.ts)

## License

MIT
