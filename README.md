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

un is a framework of modules, shims and presets that work perfectly with any Javascript environemnt
including Browsers, Workers, NodeJS or pure JavaScript.

You still need a bundler like [rollup.js](https://rollupjs.org) and un will disapear as soon as is bundled.

The goal is that final bundle works consistent regardless of running context yet not adding excessive polyfills.

## Install

Install un as `devDependency`:

```bash
yarn add --dev un
# or
npm i -D @nuxt/un
```

You can import modules from `un/lib/`

## Shims

- [process](./src/shims/process.ts)

## NodeJS

### `http`

- [IncomingMessage](./src/node/http/request.ts)
- [ServerResponse](./src/node/http/request.ts)
- [METHODS](./src/node/http/consts.ts)
- [STATUS_CODES](./src/node/http/consts.ts)

### `net`

- [Socket](./src/node/net/socket.ts)

### `stream`

- [Readable](./src/node/stream/readable.ts)
- [Writable](./src/node/stream/writable.ts)

## Mocks

- [generic](./src/mock/empty.ts): Exports a proxy that can act as a recursive function, calss, object or array
- [empty](./src/mock/empty.ts): Exports `{}`
- [noop](./src/mock/noop.ts): Exports `() => {}`

## Packages

- [depd](./src/npm/depd.ts)
- [mime-db](./src/npm/mime-db.ts)
- [mime](./src/npm/mime.ts)

## License

MIT
