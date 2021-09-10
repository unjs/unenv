<!-- ![un](https://user-images.githubusercontent.com/904724/101664001-a16a7980-3a4b-11eb-9801-3c873ed56a51.png) -->

# unenv

Once upon a time, one server was all needed to have a website

... And then SPAs<sup>1</sup> moved server code to browser

... And then SSR<sup>2</sup> moved browser code to server

... And then Workers<sup>3</sup> moved browser/server code to workers

... Workers are neither NodeJS with `process` or Browser with `window`

... Yet expected to run code that had to work both of them

**[1]** Single Page Applications

**[2]** Server Side Rendering

**[3]** https://workers.cloudflare.com, https://deno.com/deploy

 ```
 ¯\_(ツ)_/¯
 ````

> unenv is a collection of modules, polyfills, shims and presets that work perfectly with any Javascript environemnt including Browsers, Workers, NodeJS or pure JavaScript. Goal is that final bundle works consistent regardless of running context yet not adding excessive polyfills.


## Install

Install un as `devDependency`:

```bash
yarn add --dev unenv
# or
npm i -D unenv
```

## Usage: Generated env config

Using `env` utility and builtin presets ([node](./src/presets/node.ts) and [nodeless](./src/presets/nodeless.ts)), unenv will provide an abstract config that can be used in building pipelines ([rollup.js](https://rollupjs.org), [webpack](https://webpack.js.org), etc)

```js
import { env, node, nodeless } from 'unenv'

const { alias, inject, polyfill, external } = env(...presets)
```

## Usage: As a runtime library

Alternatively, instead of using env generator, you can cherry-pick and combine runtime utilities individually in your source.

## Runtime library

### NodeJS

- [fetch.node](./src/runtime/polyfill/fetch.node.ts)
- [process](./src/runtime/polyfill/process.ts)
- [IncomingMessage](./src/runtime/node/http/request.ts)
- [ServerResponse](./src/runtime/node/http/request.ts)
- [METHODS](./src/runtime/node/http/consts.ts)
- [STATUS_CODES](./src/runtime/node/http/consts.ts)

#### `net`

- [IncomingMessage](./src/runtime/node/http/request.ts)
- [ServerResponse](./src/runtime/node/http/request.ts)
- [METHODS](./src/runtime/node/http/consts.ts)
- [STATUS_CODES](./src/runtime/node/http/consts.ts)

#### `stream`

- [Socket](./src/runtime/node/net/socket.ts)

#### `url`

- [url](./src/runtime/node/url/index.ts)

### Mocking utilities

- [Readable](./src/runtime/node/stream/readable.ts)
- [Writable](./src/runtime/node/stream/writable.ts)

### Shims

- [proxy](./src/runtime/mock/proxy.ts)
- [empty](./src/runtime/mock/empty.ts)
- [noop](./src/runtime/mock/noop.ts)

### npm polyfills

- [consola](./src/runtime/npm/consola.ts)
- [debug](./src/runtime/npm/debug.ts)
- [fsevents](./src/runtime/npm/fsevents.ts)
- [mime-db](./src/runtime/npm/mime-db.ts)
- [mime](./src/runtime/npm/mime.ts)

## License

MIT
