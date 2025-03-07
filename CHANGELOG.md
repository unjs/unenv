# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## v2.0.0-rc.12

[compare changes](https://github.com/unjs/unenv/compare/v2.0.0-rc.11...v2.0.0-rc.12)

### 🩹 Fixes

- **defineEnv:** Resolve preset layers individually ([#476](https://github.com/unjs/unenv/pull/476))

### ❤️ Contributors

- Pooya Parsa ([@pi0](https://github.com/pi0))

## v2.0.0-rc.11

[compare changes](https://github.com/unjs/unenv/compare/v2.0.0-rc.10...v2.0.0-rc.11)

### 🩹 Fixes

- **node:perf_hooks:** Avoid referencing to global ([b6fef5b](https://github.com/unjs/unenv/commit/b6fef5b))

### ❤️ Contributors

- Pooya Parsa ([@pi0](https://github.com/pi0))

## v2.0.0-rc.10

[compare changes](https://github.com/unjs/unenv/compare/v2.0.0-rc.9...v2.0.0-rc.10)

### 🩹 Fixes

- **node:** Add `getOwnPropertyDescriptor` for `process.env` ([#475](https://github.com/unjs/unenv/pull/475))
- Keep original process ref in top level ([3abdebc](https://github.com/unjs/unenv/commit/3abdebc))

### 🏡 Chore

- Update deps ([32235c7](https://github.com/unjs/unenv/commit/32235c7))
- Minor refactor ([d2219ed](https://github.com/unjs/unenv/commit/d2219ed))

### ❤️ Contributors

- Pooya Parsa ([@pi0](https://github.com/pi0))

## v2.0.0-rc.9

[compare changes](https://github.com/unjs/unenv/compare/v2.0.0-rc.8...v2.0.0-rc.9)

### 🚀 Enhancements

- Add opt-in polyfills for timers and buffer ([#474](https://github.com/unjs/unenv/pull/474))

### ❤️ Contributors

- Pooya Parsa ([@pi0](https://github.com/pi0))

## v2.0.0-rc.8

[compare changes](https://github.com/unjs/unenv/compare/v2.0.0-rc.7...v2.0.0-rc.8)

### 🩹 Fixes

- Resolve built-in modules as `node:` ([6fb091b](https://github.com/unjs/unenv/commit/6fb091b))

### ❤️ Contributors

- Pooya Parsa ([@pi0](https://github.com/pi0))

## v2.0.0-rc.7

[compare changes](https://github.com/unjs/unenv/compare/v2.0.0-rc.6...v2.0.0-rc.7)

### 🚀 Enhancements

- Update node compat injects ([#465](https://github.com/unjs/unenv/pull/465))
- **defineEnv:** Support disabling `polyfill` and `external` with `!` prefix ([#467](https://github.com/unjs/unenv/pull/467))

### 🩹 Fixes

- **defineEnv:** Resolve paths with aliases ([#466](https://github.com/unjs/unenv/pull/466))

### 💅 Refactors

- Prefer `node:*/promises` for `promises` export ([#468](https://github.com/unjs/unenv/pull/468))
- Mark all symbol inits as pure to allow treeshake ([#469](https://github.com/unjs/unenv/pull/469))
- Use `exsolve` to resolve paths ([#472](https://github.com/unjs/unenv/pull/472))

### 🌊 Types

- Fix `defineEnv` ([#464](https://github.com/unjs/unenv/pull/464))

### 🏡 Chore

- Update deps ([260e9b9](https://github.com/unjs/unenv/commit/260e9b9))
- Update  dev dependencies ([8cb0284](https://github.com/unjs/unenv/commit/8cb0284))
- Update ohash to v2 ([abad8c8](https://github.com/unjs/unenv/commit/abad8c8))
- Update node-coverage test ([928cc97](https://github.com/unjs/unenv/commit/928cc97))
- Update node-coverage test ([80f62db](https://github.com/unjs/unenv/commit/80f62db))
- Update deps ([cac609d](https://github.com/unjs/unenv/commit/cac609d))
- Update readme ([ce2d331](https://github.com/unjs/unenv/commit/ce2d331))

### ✅ Tests

- Update snapshot ([50872c3](https://github.com/unjs/unenv/commit/50872c3))
- Ignore os specific constants ([3cd59e6](https://github.com/unjs/unenv/commit/3cd59e6))

### ❤️ Contributors

- Pooya Parsa ([@pi0](https://github.com/pi0))
- Victor Berchet ([@vicb](https://github.com/vicb))

## v2.0.0-rc.6

[compare changes](https://github.com/unjs/unenv/compare/v2.0.0-rc.5...v2.0.0-rc.6)

### 🩹 Fixes

- DefineEnv returns a ResolvedEnvironment ([#451](https://github.com/unjs/unenv/pull/451))
- **process:** Refine types ([#452](https://github.com/unjs/unenv/pull/452))
- Use `node:process` for polyfill ([#453](https://github.com/unjs/unenv/pull/453))
- Resolve tree-shaking issues with `node/util` ([#458](https://github.com/unjs/unenv/pull/458))
- Allow tree-shaking with default exports ([#459](https://github.com/unjs/unenv/pull/459))
- Circular dependency between node and web `performance.now()` ([#463](https://github.com/unjs/unenv/pull/463))

### 💅 Refactors

- **process:** ⚠️  Extract nextTick to a separate file ([#454](https://github.com/unjs/unenv/pull/454))
- Mark `process` internals as side-effect free ([#455](https://github.com/unjs/unenv/pull/455))
- Improve `node:util` tree-shaking ([#456](https://github.com/unjs/unenv/pull/456))
- Overhaul node constants ([#460](https://github.com/unjs/unenv/pull/460))

### 🏡 Chore

- Rename internal node type imports ([#461](https://github.com/unjs/unenv/pull/461))

#### ⚠️ Breaking Changes

- **process:** ⚠️  Extract nextTick to a separate file ([#454](https://github.com/unjs/unenv/pull/454))

### ❤️ Contributors

- Victor Berchet ([@vicb](http://github.com/vicb))
- Pooya Parsa ([@pi0](http://github.com/pi0))

## v2.0.0-rc.5

[compare changes](https://github.com/unjs/unenv/compare/v2.0.0-rc.4...v2.0.0-rc.5)

### 🩹 Fixes

- **console:** Rename `_time` to `_times` ([#443](https://github.com/unjs/unenv/pull/443))
- **util:** Import `types` from `node:util/types` ([#447](https://github.com/unjs/unenv/pull/447))
- DefineEnv returns a ResolvedEnvironment where inject values are never `false` ([#448](https://github.com/unjs/unenv/pull/448))

### 💅 Refactors

- ⚠️  Add all npm shims with opt-in `npmShims` ([#444](https://github.com/unjs/unenv/pull/444))
- ⚠️  Remove extra node exports ([#445](https://github.com/unjs/unenv/pull/445))
- ⚠️  Rewrite `process` as class ([#450](https://github.com/unjs/unenv/pull/450))

### 📦 Build

- Copy non `.ts` files as is ([5d18c2b](https://github.com/unjs/unenv/commit/5d18c2b))

#### ⚠️ Breaking Changes

- ⚠️  Add all npm shims with opt-in `npmShims` ([#444](https://github.com/unjs/unenv/pull/444))
- ⚠️  Remove extra node exports ([#445](https://github.com/unjs/unenv/pull/445))
- ⚠️  Rewrite `process` as class ([#450](https://github.com/unjs/unenv/pull/450))

### ❤️ Contributors

- Pooya Parsa ([@pi0](http://github.com/pi0))
- Victor Berchet ([@vicb](http://github.com/vicb))

## v2.0.0-rc.4

[compare changes](https://github.com/unjs/unenv/compare/v2.0.0-rc.3...v2.0.0-rc.4)

### 🩹 Fixes

- **mock/proxy:** Support promises ([#440](https://github.com/unjs/unenv/pull/440))

### 💅 Refactors

- Import node types as nodeSomeModule ([#429](https://github.com/unjs/unenv/pull/429))
- Add `node:repl` and `node:inspector/promises` to the nodeless preset ([#431](https://github.com/unjs/unenv/pull/431))
- ⚠️  Cleanup `defineEnv` and docs ([#434](https://github.com/unjs/unenv/pull/434))
- ⚠️  Avoid proxy mock usage ([#438](https://github.com/unjs/unenv/pull/438))

### 📦 Build

- Fix path to type definitions ([#433](https://github.com/unjs/unenv/pull/433))
- Add `types` to `package.json` ([f7a69b1](https://github.com/unjs/unenv/commit/f7a69b1))

### 🏡 Chore

- Update readme ([#435](https://github.com/unjs/unenv/pull/435))
- Update readme ([57be824](https://github.com/unjs/unenv/commit/57be824))
- Remove extra console log ([9921df5](https://github.com/unjs/unenv/commit/9921df5))
- Run all tests through vitest runner ([#439](https://github.com/unjs/unenv/pull/439))
- Sync `mock-cjs` ([ce0ca9a](https://github.com/unjs/unenv/commit/ce0ca9a))
- Simplify code ([#441](https://github.com/unjs/unenv/pull/441))

### ✅ Tests

- **workerd:** Crypto.randomBytes() returns bytes ([#428](https://github.com/unjs/unenv/pull/428))

#### ⚠️ Breaking Changes

- ⚠️  Cleanup `defineEnv` and docs ([#434](https://github.com/unjs/unenv/pull/434))
- ⚠️  Avoid proxy mock usage ([#438](https://github.com/unjs/unenv/pull/438))

### ❤️ Contributors

- Pooya Parsa ([@pi0](http://github.com/pi0))
- Victor Berchet ([@vicb](http://github.com/vicb))

## v2.0.0-rc.3

[compare changes](https://github.com/unjs/unenv/compare/v2.0.0-rc.2...v2.0.0-rc.3)

### 🩹 Fixes

- **defineEnv:** Use `import.meta.url` ([890c145](https://github.com/unjs/unenv/commit/890c145))
- Fix coverage and add `node:repl` + `node:inspector/promises` ([#424](https://github.com/unjs/unenv/pull/424))
- Full coverage for (esm) node exports ([#425](https://github.com/unjs/unenv/pull/425))
- Add missing default exports ([#426](https://github.com/unjs/unenv/pull/426))
- **defineEnv:** Ignore falst ids ([21dea9b](https://github.com/unjs/unenv/commit/21dea9b))

### 💅 Refactors

- ⚠️  Only export `defineEnv` from main ([#421](https://github.com/unjs/unenv/pull/421))
- ⚠️  Only export defineEnv from main ([#421](https://github.com/unjs/unenv/pull/421))
- Use same `builtinModules` from runtime ([041d4f6](https://github.com/unjs/unenv/commit/041d4f6))
- Mark notImplemented constructors as side-effect free ([#422](https://github.com/unjs/unenv/pull/422))
- Explicit imports with extension ([#416](https://github.com/unjs/unenv/pull/416))
- Use `satisfies T` when possible ([#423](https://github.com/unjs/unenv/pull/423))
- ⚠️  Reduce `inject` and `polyfill` for nodeCompat ([#427](https://github.com/unjs/unenv/pull/427))

### 📦 Build

- Sync main subpath types ([a65352f](https://github.com/unjs/unenv/commit/a65352f))
- Avoid bundling dependencies ([de43cd2](https://github.com/unjs/unenv/commit/de43cd2))

### ✅ Tests

- Make expect error better ([cc5dad3](https://github.com/unjs/unenv/commit/cc5dad3))

#### ⚠️ Breaking Changes

- ⚠️  Only export `defineEnv` from main ([#421](https://github.com/unjs/unenv/pull/421))
- ⚠️  Only export defineEnv from main ([#421](https://github.com/unjs/unenv/pull/421))
- ⚠️  Reduce `inject` and `polyfill` for nodeCompat ([#427](https://github.com/unjs/unenv/pull/427))

### ❤️ Contributors

- Pooya Parsa ([@pi0](http://github.com/pi0))

## v2.0.0-rc.2

[compare changes](https://github.com/unjs/unenv/compare/v2.0.0-rc.1...v2.0.0-rc.2)

### 🚀 Enhancements

- Compatibility with node@22.13.1 types ([#414](https://github.com/unjs/unenv/pull/414))

### 🩹 Fixes

- **node:async_hooks:** Remove extra methods from `AsyncHook` class ([#415](https://github.com/unjs/unenv/pull/415))
- **node:timers:** Avoid circular dependency in internals ([#418](https://github.com/unjs/unenv/pull/418))
- **node:crypto:** Fix `randomBytes` returning zero values ([#420](https://github.com/unjs/unenv/pull/420))

### 💅 Refactors

- **tls:** Import Socket and Server from `node:net` ([#405](https://github.com/unjs/unenv/pull/405))
- Remove direct fetch support ([#411](https://github.com/unjs/unenv/pull/411))
- ⚠️  Update `runtime/node` structure ([#392](https://github.com/unjs/unenv/pull/392))

### 📦 Build

- ⚠️  Esm-only build ([#417](https://github.com/unjs/unenv/pull/417))

### 🏡 Chore

- Fix ci ([f24fb41](https://github.com/unjs/unenv/commit/f24fb41))
- Fix lint issue ([b4e3cd5](https://github.com/unjs/unenv/commit/b4e3cd5))
- Remove extra log in tests ([66629c9](https://github.com/unjs/unenv/commit/66629c9))

### 🤖 CI

- Update build script ([fb78f84](https://github.com/unjs/unenv/commit/fb78f84))

#### ⚠️ Breaking Changes

- ⚠️  Update `runtime/node` structure ([#392](https://github.com/unjs/unenv/pull/392))
- ⚠️  Esm-only build ([#417](https://github.com/unjs/unenv/pull/417))

### ❤️ Contributors

- Pooya Parsa ([@pi0](http://github.com/pi0))
- Victor Berchet ([@vicb](http://github.com/vicb))

## v2.0.0-rc.1

[compare changes](https://github.com/unjs/unenv/compare/v2.0.0-rc.0...v2.0.0-rc.1)

### 🚀 Enhancements

- **cloudflare:** Add `node:net` and `node:timers` ([#396](https://github.com/unjs/unenv/pull/396))

### 🩹 Fixes

- **cloudflare:** `node:net/promises` does not exist ([#400](https://github.com/unjs/unenv/pull/400))

### 💅 Refactors

- **tty:** ReadStream depend on node:net ([#389](https://github.com/unjs/unenv/pull/389))
- **tty:** ReadStream depend on node:net ([#388](https://github.com/unjs/unenv/pull/388))

### 🏡 Chore

- Remove old deno process polyfill ([ea010e5](https://github.com/unjs/unenv/commit/ea010e5))
- Update release script ([a8122c9](https://github.com/unjs/unenv/commit/a8122c9))
- Update dev dependencies ([2308b2f](https://github.com/unjs/unenv/commit/2308b2f))
- Fix type issues ([a8c662f](https://github.com/unjs/unenv/commit/a8c662f))

### ❤️ Contributors

- Pooya Parsa ([@pi0](http://github.com/pi0))
- Victor Berchet ([@vicb](http://github.com/vicb))
- Yagiz Nizipli <yagiz@nizipli.com>
- Marvin Hagemeister <marvinhagemeister50@gmail.com>

## v1.9.0

[compare changes](https://github.com/unjs/unenv/compare/v1.8.0...v1.9.0)

### 🚀 Enhancements

- Experimental deno preset ([#155](https://github.com/unjs/unenv/pull/155))
- **deno:** Add `process.env` polyfill ([a34f3e0](https://github.com/unjs/unenv/commit/a34f3e0))
- Experimental cloudflare preset ([#156](https://github.com/unjs/unenv/pull/156))
- Experimental vercel preset ([#157](https://github.com/unjs/unenv/pull/157))

### 🏡 Chore

- Update lockfile ([65c9766](https://github.com/unjs/unenv/commit/65c9766))

### ❤️ Contributors

- Pooya Parsa ([@pi0](http://github.com/pi0))

## v1.8.0

[compare changes](https://github.com/unjs/unenv/compare/v1.7.4...v1.8.0)

### 🚀 Enhancements

- Polyfill `node:module` ([#148](https://github.com/unjs/unenv/pull/148))
- Add polyfill for `node:https` with named exports ([5917a50](https://github.com/unjs/unenv/commit/5917a50))
- Support `consola/utils` subpath ([#149](https://github.com/unjs/unenv/pull/149))

### 🩹 Fixes

- **node:net:** Add missing new exports ([2b805b1](https://github.com/unjs/unenv/commit/2b805b1))
- **node:net/socket:** Add new `destroySoon` and `autoSelectFamilyAttemptedAddresses` ([311c72b](https://github.com/unjs/unenv/commit/311c72b))

### 🏡 Chore

- Update lockfile and dev dependencies ([051defd](https://github.com/unjs/unenv/commit/051defd))
- Update mkdist ([e36d463](https://github.com/unjs/unenv/commit/e36d463))
- Fix ts issue ([f778562](https://github.com/unjs/unenv/commit/f778562))

### 🎨 Styles

- Format with prettier ([b31444d](https://github.com/unjs/unenv/commit/b31444d))

### ❤️ Contributors

- Pooya Parsa ([@pi0](http://github.com/pi0))

## v1.7.4

[compare changes](https://github.com/unjs/unenv/compare/v1.7.3...v1.7.4)

### 🩹 Fixes

- **node:fs:** Named exports for `/promises` subpath ([b035e09](https://github.com/unjs/unenv/commit/b035e09))
- **node:stream:** Add placeholder for not implemented new method ([294f283](https://github.com/unjs/unenv/commit/294f283))

### 🏡 Chore

- **release:** V1.7.3 ([05527a2](https://github.com/unjs/unenv/commit/05527a2))
- Update dependencies ([54331de](https://github.com/unjs/unenv/commit/54331de))

### ❤️ Contributors

- Pooya Parsa ([@pi0](http://github.com/pi0))

## v1.7.3

[compare changes](https://github.com/unjs/unenv/compare/v1.7.2...v1.7.3)

### 🩹 Fixes

- Add `AbortController` export from `node-fetch` ([230385c](https://github.com/unjs/unenv/commit/230385c))

### ❤️  Contributors

- Pooya Parsa ([@pi0](http://github.com/pi0))

## v1.7.2

[compare changes](https://github.com/unjs/unenv/compare/v1.7.1...v1.7.2)

### 🩹 Fixes

- **node:fs:** Default export for `node:fs/promises` ([37fd173](https://github.com/unjs/unenv/commit/37fd173))
- **node:crypto:** Bind crypto functions to avoid `Illegal invocation` error ([#134](https://github.com/unjs/unenv/pull/134))
- **node:fs:** Add mock for `openAsBlob` ([16f6150](https://github.com/unjs/unenv/commit/16f6150))
- **node:stream:** Support `asyncDispose` for readable ([f8f8f46](https://github.com/unjs/unenv/commit/f8f8f46))

### 🏡 Chore

- Update dependencies ([7731f08](https://github.com/unjs/unenv/commit/7731f08))

### ❤️  Contributors

- Pooya Parsa ([@pi0](http://github.com/pi0))
- Brendon Matos <brendonferreiradm@gmail.com>

## v1.7.1

[compare changes](https://github.com/unjs/unenv/compare/v1.7.0...v1.7.1)

### 🩹 Fixes

- **node:stream:** Allow tree-shaking `Duplex` ([587860f](https://github.com/unjs/unenv/commit/587860f))
- Add `sideEffects` to main `package.json` to allow tree-shaking ([6dac339](https://github.com/unjs/unenv/commit/6dac339))
- **node:string_decoder:** Use relative import ([#129](https://github.com/unjs/unenv/pull/129))

### 💅 Refactors

- **node:events:** Rewrite `EventEmitter` ([#128](https://github.com/unjs/unenv/pull/128))

### ❤️  Contributors

- Pooya Parsa ([@pi0](http://github.com/pi0))
- Daniel Roe <daniel@roe.dev>

## v1.7.0

[compare changes](https://github.com/unjs/unenv/compare/v1.6.2...v1.7.0)

### 🚀 Enhancements

- Expose `__unenv__` flag for unenv classes and functions ([#125](https://github.com/unjs/unenv/pull/125))
- **node:** Allow overriding `AsyncHook`, `AsyncLocalStorage` and `AsyncResource` with `globalThis` ([#126](https://github.com/unjs/unenv/pull/126))
- **node:buffer:** Allow overriding `Buffer` with `globalThis` ([1337f98](https://github.com/unjs/unenv/commit/1337f98))
- **node:events:** Allow overriding `EventEmitter` with `globalThis` ([5ba2d03](https://github.com/unjs/unenv/commit/5ba2d03))
- **node:stream:** Allow overriding `Duplex`, `Readable`, `Transform` and `Writable` with `globalThis` ([e06358d](https://github.com/unjs/unenv/commit/e06358d))
- Add `node:string_decoder` with global polyfill ([002467a](https://github.com/unjs/unenv/commit/002467a))

### 🩹 Fixes

- **fetch:** Avoid sending body for null body reponses ([#124](https://github.com/unjs/unenv/pull/124))
- **node:crypto:** Properly call web crypto methods ([#122](https://github.com/unjs/unenv/pull/122))

### 🏡 Chore

- **release:** V1.6.2 ([f4cba4e](https://github.com/unjs/unenv/commit/f4cba4e))
- Fix type issues ([76dd36d](https://github.com/unjs/unenv/commit/76dd36d))

### 🤖 CI

- Add typecheck ([18a1013](https://github.com/unjs/unenv/commit/18a1013))
- Use node 18 ([68c9864](https://github.com/unjs/unenv/commit/68c9864))

### ❤️  Contributors

- Pooya Parsa ([@pi0](http://github.com/pi0))
- Aaron Dewes <aaron@runcitadel.space>

## v1.6.2

[compare changes](https://github.com/unjs/unenv/compare/v1.6.1...v1.6.2)

### 🩹 Fixes

- Add `async_hooks` to nodeless preset ([dee2ddd](https://github.com/unjs/unenv/commit/dee2ddd))
- **node:** Add named exports for `AsyncLocalStorage` and `AsyncResource` ([388f529](https://github.com/unjs/unenv/commit/388f529))

### 🏡 Chore

- Update dependencies ([8baea05](https://github.com/unjs/unenv/commit/8baea05))
- Apply automated lint fixes ([982ae0f](https://github.com/unjs/unenv/commit/982ae0f))

### ❤️  Contributors

- Pooya Parsa ([@pi0](http://github.com/pi0))

## v1.6.1

[compare changes](https://github.com/unjs/unenv/compare/v1.6.0...v1.6.1)

### 🌊 Types

- **node:** Type `EventEmitter` in dist ([0106e19](https://github.com/unjs/unenv/commit/0106e19))

### ❤️  Contributors

- Pooya Parsa ([@pi0](http://github.com/pi0))

## v1.6.0

[compare changes](https://github.com/unjs/unenv/compare/v1.5.2...v1.6.0)

### 🚀 Enhancements

- **node:** Export full node crypto exports ([#121](https://github.com/unjs/unenv/pull/121))

### 🩹 Fixes

- **node:** Preserve http number header type with `setHeader` ([#119](https://github.com/unjs/unenv/pull/119))
- **node:** Add missing `compose` to stream classes ([5687712](https://github.com/unjs/unenv/commit/5687712))
- **node:** Import `EventEmitter` from local path ([ecd741a](https://github.com/unjs/unenv/commit/ecd741a))

### 🏡 Chore

- **release:** V1.5.2 ([4bfe1d5](https://github.com/unjs/unenv/commit/4bfe1d5))
- Update dev dependencies ([43ceb09](https://github.com/unjs/unenv/commit/43ceb09))

### 🤖 CI

- Use conventional commit for autofix action ([#120](https://github.com/unjs/unenv/pull/120))

### ❤️  Contributors

- Pooya Parsa ([@pi0](http://github.com/pi0))
- Heb ([@Hebilicious](http://github.com/Hebilicious))
- Daniel Roe <daniel@roe.dev>

## v1.5.2

[compare changes](https://github.com/unjs/unenv/compare/v1.5.1...v1.5.2)

### 🩹 Fixes

- **node/utils:** Add missing `types` named export ([cf45410](https://github.com/unjs/unenv/commit/cf45410))
- **node/net:** Add missing ip utils and `SocketAddress` class ([7abe54e](https://github.com/unjs/unenv/commit/7abe54e))

### 🏡 Chore

- Update dependencies ([97974a2](https://github.com/unjs/unenv/commit/97974a2))
- Add autofix ci ([64f24de](https://github.com/unjs/unenv/commit/64f24de))
- Format with prettier v3 ([1e257b2](https://github.com/unjs/unenv/commit/1e257b2))

### ❤️  Contributors

- Pooya Parsa ([@pi0](http://github.com/pi0))

## v1.5.1

[compare changes](https://github.com/unjs/unenv/compare/v1.5.0...v1.5.1)


### 🩹 Fixes

  - Keep `consola/core` subpath as is ([40617bc](https://github.com/unjs/unenv/commit/40617bc))

### ❤️  Contributors

- Pooya Parsa ([@pi0](http://github.com/pi0))

## v1.5.0

[compare changes](https://github.com/unjs/unenv/compare/v1.4.1...v1.5.0)


### 🚀 Enhancements

  - Implement basic `node:async_hooks` ([#98](https://github.com/unjs/unenv/pull/98))
  - Use `consola/core` instead of mocking consola ([#93](https://github.com/unjs/unenv/pull/93))
  - **http:** Support `IncomingMessage.headersDistinct` and `IncomingMessage.trailersDistinct` ([08e36cc](https://github.com/unjs/unenv/commit/08e36cc))
  - **node/crypto:** Implement `randomBytes` ([#100](https://github.com/unjs/unenv/pull/100))
  - **http:** Support `ServerResponse.appendHeader` ([c492d45](https://github.com/unjs/unenv/commit/c492d45))

### 🩹 Fixes

  - **async_hooks:** Add `snapshot` stub ([1eec581](https://github.com/unjs/unenv/commit/1eec581))

### 🏡 Chore

  - Update eslint ([4de6a50](https://github.com/unjs/unenv/commit/4de6a50))
  - Fix lint issue ([ae2469b](https://github.com/unjs/unenv/commit/ae2469b))

### ❤️  Contributors

- Pooya Parsa ([@pi0](http://github.com/pi0))
- BoxenOfDonuts <joel.hacke@gmail.com>

## v1.4.1

[compare changes](https://github.com/unjs/unenv/compare/v1.4.0...v1.4.1)


### 🩹 Fixes

  - **node:process:** Avoid recursive access ([a1ba86c](https://github.com/unjs/unenv/commit/a1ba86c))

### ❤️  Contributors

- Pooya Parsa ([@pi0](http://github.com/pi0))

## v1.4.0

[compare changes](https://github.com/unjs/unenv/compare/v1.3.1...v1.4.0)


### 🚀 Enhancements

  - **node:process:** Allow accessing `process.env` from dynamic sources ([#95](https://github.com/unjs/unenv/pull/95))

### ❤️  Contributors

- Pooya Parsa ([@pi0](http://github.com/pi0))

## v1.3.1

[compare changes](https://github.com/unjs/unenv/compare/v1.3.0...v1.3.1)


### 🩹 Fixes

  - **node:** Add `webcrypto` export for `node:crypto` ([fb2b280](https://github.com/unjs/unenv/commit/fb2b280))

### ❤️  Contributors

- Pooya Parsa ([@pi0](http://github.com/pi0))

## v1.3.0

[compare changes](https://github.com/unjs/unenv/compare/v1.2.2...v1.3.0)


### 🚀 Enhancements

  - **npm:** Add named `consola` export for consola v3 compat ([7e67d71](https://github.com/unjs/unenv/commit/7e67d71))
  - **node:** Add `node:crypto` polyfill ([#90](https://github.com/unjs/unenv/pull/90))

### 🩹 Fixes

  - **node:** Add new statfs exports ([080cf5b](https://github.com/unjs/unenv/commit/080cf5b))
  - **pkg:** Move `types` export condition ([2d5a8dd](https://github.com/unjs/unenv/commit/2d5a8dd))

### 🏡 Chore

  - Update dependencies ([2fc33a8](https://github.com/unjs/unenv/commit/2fc33a8))
  - Lint ([6855243](https://github.com/unjs/unenv/commit/6855243))

### ❤️  Contributors

- Pooya Parsa ([@pi0](http://github.com/pi0))

## v1.2.2

[compare changes](https://github.com/unjs/unenv/compare/v1.2.1...v1.2.2)


### 🩹 Fixes

  - **node/process:** Support `process.env` shims ([893421b](https://github.com/unjs/unenv/commit/893421b))
  - Add new node shims ([9ad4604](https://github.com/unjs/unenv/commit/9ad4604))

### 📖 Documentation

  - Fix some small typos and grammars ([#80](https://github.com/unjs/unenv/pull/80))

### 🏡 Chore

  - Update node types ([7219d5c](https://github.com/unjs/unenv/commit/7219d5c))

### ❤️  Contributors

- Pooya Parsa ([@pi0](http://github.com/pi0))
- Levi (Nguyễn Lương Huy) ([@huynl-96](http://github.com/huynl-96))

## v1.2.1

[compare changes](https://github.com/unjs/unenv/compare/v1.2.0...v1.2.1)


### 🩹 Fixes

  - **node/stream:** Stop writing data when `writableEnded` is set ([#79](https://github.com/unjs/unenv/pull/79))
  - **node/buffer:** Add `isUtf8` util (not implemented) ([527904b](https://github.com/unjs/unenv/commit/527904b))

### 📖 Documentation

  - Fix typos ([#78](https://github.com/unjs/unenv/pull/78))

### ❤️  Contributors

- Pooya Parsa ([@pi0](http://github.com/pi0))
- Yaël Guilloux ([@Tahul](http://github.com/Tahul))

## v1.2.0

[compare changes](https://github.com/unjs/unenv/compare/v1.1.1...v1.2.0)


### 🚀 Enhancements

  - **node/stream:** Support writing multipe chunks ([#75](https://github.com/unjs/unenv/pull/75))
  - **node/util:** Implement `MIMEType` and `MIMEParams` ([#76](https://github.com/unjs/unenv/pull/76))

### ❤️  Contributors

- Pooya Parsa <pooya@pi0.io>

## v1.1.1

[compare changes](https://github.com/unjs/unenv/compare/v1.1.0...v1.1.1)


### 🩹 Fixes

  - **fetch:** Only pass `context` key from main context ([2e9b9fb](https://github.com/unjs/unenv/commit/2e9b9fb))

### ❤️  Contributors

- Pooya Parsa <pooya@pi0.io>

## v1.1.0

[compare changes](https://github.com/unjs/unenv/compare/v1.0.3...v1.1.0)


### 🚀 Enhancements

  - **call:** Preserve fetch context in `req.__unenv__` ([#72](https://github.com/unjs/unenv/pull/72))

### 🩹 Fixes

  - Support import alias with `buffer/index.js` ([660df39](https://github.com/unjs/unenv/commit/660df39))

### ❤️  Contributors

- Pooya Parsa <pooya@pi0.io>

## v1.0.3

[compare changes](https://github.com/unjs/unenv/compare/v1.0.2...v1.0.3)


### 🩹 Fixes

  - Add `extend` method to debug mock ([#69](https://github.com/unjs/unenv/pull/69))

### ❤️  Contributors

- Daniel Roe <daniel@roe.dev>

## v1.0.2

[compare changes](https://github.com/unjs/unenv/compare/v1.0.1...v1.0.2)


### 🩹 Fixes

  - **events:** Export once function ([#68](https://github.com/unjs/unenv/pull/68))

### 🏡 Chore

  - Switch to changelogen for release ([745cf52](https://github.com/unjs/unenv/commit/745cf52))

### 🎨 Styles

  - Format code ([239b531](https://github.com/unjs/unenv/commit/239b531))

### ❤️  Contributors

- Pooya Parsa <pooya@pi0.io>
- Piyush Bhangale <bhangalepiyush@gmail.com>

### [1.0.1](https://github.com/unjs/unenv/compare/v1.0.0...v1.0.1) (2023-01-03)


### Bug Fixes

* add missing latest node exports ([dd046a8](https://github.com/unjs/unenv/commit/dd046a8ee6c7f68bebf80f872b88c9c0a08ece0e))
* add missing polyfill and types ([97e7c6f](https://github.com/unjs/unenv/commit/97e7c6fbf1f76df861b696b68b0c88e6157b77ec))
* export named `fetch` from `node-fetch` polyfill ([#63](https://github.com/unjs/unenv/issues/63)) ([605e649](https://github.com/unjs/unenv/commit/605e6490ffa2be909b57fa02670542ea622b59f5))

## [1.0.0](https://github.com/unjs/unenv/compare/v0.6.2...v1.0.0) (2022-11-15)

### [0.6.2](https://github.com/unjs/unenv/compare/v0.6.1...v0.6.2) (2022-08-30)


### Bug Fixes

* **createCall:** normalize context headers ([65fe2b1](https://github.com/unjs/unenv/commit/65fe2b1a68582e66ee2cda5a123ca4d3e2b7039b)), closes [nuxt/framework#5718](https://github.com/nuxt/framework/issues/5718)

### [0.6.1](https://github.com/unjs/unenv/compare/v0.6.0...v0.6.1) (2022-08-24)


### Bug Fixes

* **callHandle:** narrrow body type to `BodyInit` ([7030004](https://github.com/unjs/unenv/commit/7030004dcd135cedafe48838c7331dc1397749ce))

## [0.6.0](https://github.com/unjs/unenv/compare/v0.5.4...v0.6.0) (2022-08-24)


### ⚠ BREAKING CHANGES

* **createCall:** return `res._data` as is

### Bug Fixes

* **createCall:** return `res._data` as is ([8f1235f](https://github.com/unjs/unenv/commit/8f1235f294ce35f3ad591c71728302ceb4f7ab9d)), closes [#43](https://github.com/unjs/unenv/issues/43)

### [0.5.4](https://github.com/unjs/unenv/compare/v0.5.3...v0.5.4) (2022-08-12)


### Bug Fixes

* remove native `node:fs` import ([524bc21](https://github.com/unjs/unenv/commit/524bc217cc1709948d25fd0ac9ff978b38367974))

### [0.5.3](https://github.com/unjs/unenv/compare/v0.5.2...v0.5.3) (2022-08-08)


### Bug Fixes

* allow mocking subpaths of cjs-proxy ([#46](https://github.com/unjs/unenv/issues/46)) ([70efe37](https://github.com/unjs/unenv/commit/70efe372473d40d474eaa292ce5633d29933f108))
* order aliases from specific to general ([#45](https://github.com/unjs/unenv/issues/45)) ([9c11eaa](https://github.com/unjs/unenv/commit/9c11eaa4dcc0cd1dc3f51c96e754e64475b3a77f))

### [0.5.2](https://github.com/unjs/unenv/compare/v0.5.1...v0.5.2) (2022-05-11)


### Features

* use `node-fetch-native` for polyfill ([7944681](https://github.com/unjs/unenv/commit/79446811570e7f6e28868e81ad489afc51d84c36))

### [0.5.1](https://github.com/unjs/unenv/compare/v0.5.0...v0.5.1) (2022-05-05)


### Features

* add fs polyfill to nodeless ([de2cf94](https://github.com/unjs/unenv/commit/de2cf94355e6904ae830c7c1829eddf666f68087))
* implement `path` (resolves [#35](https://github.com/unjs/unenv/issues/35)) ([bd473c5](https://github.com/unjs/unenv/commit/bd473c5a878a87c736ebe3a1a6737220eb91be40))
* improve node polyfills ([4206317](https://github.com/unjs/unenv/commit/4206317ddee3834cfba47f5f02433b7fbe7db542))
* initial support for `fs` polyfill ([#9](https://github.com/unjs/unenv/issues/9)) ([5ee4115](https://github.com/unjs/unenv/commit/5ee4115ca87406158bed4b2c2419532c1e311a60))


### Bug Fixes

* add default export for process polyfill ([45d859f](https://github.com/unjs/unenv/commit/45d859f12236b3555535ac22cd6733c603eb4160))
* fix process polyfill ([05aa34f](https://github.com/unjs/unenv/commit/05aa34ff7ae5daccf8259f47866adc2891cb8f2c))
* import `node-fetch` polyfill from src ([0e9afae](https://github.com/unjs/unenv/commit/0e9afae0b3fe38ef59cb640ea819d177a8c1565f))
* update http and add missing exports ([16338d4](https://github.com/unjs/unenv/commit/16338d44505d4791fc49b26723821f2d10870944))
* use named export for `events` ([f4bf593](https://github.com/unjs/unenv/commit/f4bf59367d1df09d32e1d5634d25c8c4f005ab4a))
* use proxy for http class mocks ([b8a44b4](https://github.com/unjs/unenv/commit/b8a44b4df1686f2b78a654429355ede4fb89d352))

## [0.5.0](https://github.com/unjs/unenv/compare/v0.4.6...v0.5.0) (2022-05-05)


### ⚠ BREAKING CHANGES

* replace node polyfills (#30)
* replace `node-fetch` and `cross-fetch` with platform natives (resolves #29)

### Features

* **nodeless:** support `node:` protocol aliases ([d3e42f7](https://github.com/unjs/unenv/commit/d3e42f7634cebe61be1bd70ed4ec14e68648b3e0))
* **node:** polyfill `FormData`, `Blob` and `AbortController` ([c0b83a7](https://github.com/unjs/unenv/commit/c0b83a772caa2353aa7c06d68d3aa7daa446c2ef)), closes [#23](https://github.com/unjs/unenv/issues/23)
* opt-in support of whatwg-url mock ([#15](https://github.com/unjs/unenv/issues/15)) ([a38cf29](https://github.com/unjs/unenv/commit/a38cf29c490b0215ce9caac06c4f8ef783e519d8))
* replace `node-fetch` and `cross-fetch` with platform natives (resolves [#29](https://github.com/unjs/unenv/issues/29)) ([276d44d](https://github.com/unjs/unenv/commit/276d44da6d0fd8057ccf807ed1bd468e24d85e39))
* replace node polyfills ([#30](https://github.com/unjs/unenv/issues/30)) ([0a99ce2](https://github.com/unjs/unenv/commit/0a99ce2e998862dca3d7bb30dbee914308ae6f9f))


### Bug Fixes

* add `fs/promises` to NodeBuiltinModules (resolves [#34](https://github.com/unjs/unenv/issues/34)) ([35f31a4](https://github.com/unjs/unenv/commit/35f31a4edb5e2d6e8477c677c6929df6e1190103))
* add missing `stream` exports (resolves [#11](https://github.com/unjs/unenv/issues/11)) ([a51e893](https://github.com/unjs/unenv/commit/a51e893fc994bab2c070c3d8de3f72120c6316f1))
* add more node subpath exports to built-in modules ([8ed02ad](https://github.com/unjs/unenv/commit/8ed02adfe8231a6fe1087d126f2f268e5f82d7c6)), closes [#34](https://github.com/unjs/unenv/issues/34)
* fix util.promisify implementation ([674dd27](https://github.com/unjs/unenv/commit/674dd27e28e4ce6f9f997926d4e09c162384060b))
* mock `mime/lite` as well ([e733440](https://github.com/unjs/unenv/commit/e7334407755d9bdb51811cc8a5fee60180c536d2))

### [0.4.6](https://github.com/unjs/unenv/compare/v0.4.5...v0.4.6) (2022-04-07)


### Bug Fixes

* **pkg:** expose cjs proxy as `mock/proxy-cjs` ([6ac4279](https://github.com/unjs/unenv/commit/6ac427909a8239a877e7c2cf36cdb892ba2d7c96))

### [0.4.5](https://github.com/unjs/unenv/compare/v0.4.4...v0.4.5) (2022-04-07)


### Bug Fixes

* **pkg:** emit cjs for entry to avoid breaking change ([0d64253](https://github.com/unjs/unenv/commit/0d64253de8f3b343072fca3bde74e95fa1c4c543))

### [0.4.4](https://github.com/unjs/unenv/compare/v0.4.3...v0.4.4) (2022-04-07)


### Bug Fixes

* resolve proxy to commonjs ([26c19f7](https://github.com/unjs/unenv/commit/26c19f71c1891a2fba379efc9d2bb645990f9837))

### [0.4.3](https://github.com/unjs/unenv/compare/v0.4.2...v0.4.3) (2021-12-14)


### Bug Fixes

* handle null or undefined _data ([#22](https://github.com/unjs/unenv/issues/22)) ([5d762aa](https://github.com/unjs/unenv/commit/5d762aa19d64649dae58e1c5679712d684ab987a))

### [0.4.2](https://github.com/unjs/unenv/compare/v0.4.1...v0.4.2) (2021-12-01)


### Features

* global polyfill ([f57dd75](https://github.com/unjs/unenv/commit/f57dd7579a9e7f147ee17e174704ca2321cdba85))


### Bug Fixes

* return `this` when calling `setHeader`, `end` and `destroy` ([#20](https://github.com/unjs/unenv/issues/20)) ([4ac95fd](https://github.com/unjs/unenv/commit/4ac95fddd7f56fb6ff864e343ef1f4bb214623fd))

### [0.4.1](https://github.com/unjs/unenv/compare/v0.4.0...v0.4.1) (2021-11-04)


### Bug Fixes

* **package:** wrong link to github repo ([#18](https://github.com/unjs/unenv/issues/18)) ([b775afc](https://github.com/unjs/unenv/commit/b775afcc2077d26368fa0d8b428f9c1a35446394))

## [0.4.0](https://github.com/unjs/unev/compare/v0.3.10...v0.4.0) (2021-10-22)


### ⚠ BREAKING CHANGES

* **pkg:** use explicit `.cjs`
* update node-fetch to 3.x

### Features

* **pkg:** use explicit `.cjs` ([1ff74b2](https://github.com/unjs/unev/commit/1ff74b267932260ebe9842dbbe559298009afa6c))
* update node-fetch to 3.x ([5a116aa](https://github.com/unjs/unev/commit/5a116aa7cdc6d2f2fb80a04213ea61e5d6f78c26))

### [0.3.10](https://github.com/unjs/unev/compare/v0.3.9...v0.3.10) (2021-09-29)


### Bug Fixes

* remove `node-fetch` alias from node preset ([#14](https://github.com/unjs/unev/issues/14)) ([9addd4c](https://github.com/unjs/unev/commit/9addd4c41ab4bde4f84bdb835bd2e422ee8262f2))

### [0.3.9](https://github.com/unjs/unev/compare/v0.3.8...v0.3.9) (2021-09-29)


### Features

* add nodeless node-fetch polyfill ([#13](https://github.com/unjs/unev/issues/13)) ([52612ac](https://github.com/unjs/unev/commit/52612acbf4137da73031697bc98ccb0872a09a13))

### [0.3.8](https://github.com/unjs/unev/compare/v0.3.7...v0.3.8) (2021-09-20)


### Bug Fixes

* **duplex:** add missing `mergeFns` import ([1b301de](https://github.com/unjs/unev/commit/1b301de8a71498683387a0bb7ad53cb5b2596ba6))

### [0.3.7](https://github.com/unjs/unev/compare/v0.3.6...v0.3.7) (2021-09-20)


### Bug Fixes

* **duplex:** avoid cycling reference ([3cd4797](https://github.com/unjs/unev/commit/3cd4797510693c177026d597b691a1ca45beaaa8))

### [0.3.6](https://github.com/unjs/unev/compare/v0.3.5...v0.3.6) (2021-09-20)


### Features

* node stream duplex and transform ([#12](https://github.com/unjs/unev/issues/12)) ([940e72e](https://github.com/unjs/unev/commit/940e72efc2a6468af213f09909cc9c98685ddac8))

### [0.3.5](https://github.com/unjs/unev/compare/v0.3.4...v0.3.5) (2021-09-10)


### Bug Fixes

* **url:** add default export ([c5f99d9](https://github.com/unjs/unev/commit/c5f99d9663168cf01f76b99198b4613e026a7941))

### [0.3.4](https://github.com/unjs/unev/compare/v0.3.3...v0.3.4) (2021-09-10)


### Features

* add basic implementation for NodeJS `url` ([c76edbd](https://github.com/unjs/unev/commit/c76edbd3777686691f5c5eced60a815e6e7979e7))

### [0.3.3](https://github.com/unjs/unev/compare/v0.3.2...v0.3.3) (2021-09-08)


### Features

* mock fsevents ([3b4c4c1](https://github.com/unjs/unev/commit/3b4c4c1ac1f57082b2bae174d81bee830ecb5e8b))

### [0.3.2](https://github.com/unjs/unev/compare/v0.3.1...v0.3.2) (2021-07-12)

### [0.3.1](https://github.com/unjs/unev/compare/v0.3.0...v0.3.1) (2021-07-12)


### Bug Fixes

* use subpath import for `node/http` ([#6](https://github.com/unjs/unev/issues/6)) ([1415896](https://github.com/unjs/unev/commit/141589663b0b3cdde341793141a2fdf2e44550b9))

## [0.3.0](https://github.com/unjs/unev/compare/v0.2.3...v0.3.0) (2021-06-21)


### ⚠ BREAKING CHANGES

* add exports field

### Features

* add exports field ([8e8bc1b](https://github.com/unjs/unev/commit/8e8bc1b811df405d30e841abb3a5da66fe05a4ed))

### [0.2.3](https://github.com/unjs/unev/compare/v0.2.2...v0.2.3) (2021-04-23)


### Bug Fixes

* dual exports for node index ([e28374c](https://github.com/unjs/unev/commit/e28374c9b41bf33fd1651bffda8b7a747bf67c90))

### [0.2.2](https://github.com/unjs/unev/compare/v0.2.1...v0.2.2) (2021-04-21)


### Bug Fixes

* use globalThis for polyfills ([e43a8b4](https://github.com/unjs/unev/commit/e43a8b43a69c5b4b4a7c34d3291cdf93b535f46d))

### [0.2.1](https://github.com/unjs/unev/compare/v0.2.0...v0.2.1) (2021-04-21)

## [0.2.0](https://github.com/unjs/unev/compare/v0.1.1...v0.2.0) (2021-04-21)


### ⚠ BREAKING CHANGES

* update build system

### Features

* update build system ([18cfce8](https://github.com/unjs/unev/commit/18cfce83645cf706c3ffcb11ba6bf4e9d276b841))

### [0.1.1](https://github.com/unjs/unenv/compare/v0.1.0...v0.1.1) (2021-02-08)


### Features

* add npm debug mock ([#1](https://github.com/unjs/unenv/issues/1)) ([fc088bf](https://github.com/unjs/unenv/commit/fc088bfc8c1313bfef5f9ab50ce03eabfc326018))

## [0.1.0](https://github.com/unjs/unenv/compare/v0.0.12...v0.1.0) (2021-01-21)

### [0.0.12](https://github.com/unjs/unenv/compare/v0.0.11...v0.0.12) (2021-01-21)


### Features

* use mkdist to generate runtime ([54c0f5d](https://github.com/unjs/unenv/commit/54c0f5d24d4c85698746e37110ad9859e6a0aa26))


### Bug Fixes

* de-default node-fetch ([8319815](https://github.com/unjs/unenv/commit/83198153381e4c33a22c02f838524bc9d1804f8f))

### [0.0.11](https://github.com/unjs/unenv/compare/v0.0.10...v0.0.11) (2020-12-07)

### [0.0.10](https://github.com/unjs/unenv/compare/v0.0.9...v0.0.10) (2020-12-07)


### Bug Fixes

* remove node-fetch alias ([8c83e29](https://github.com/unjs/unenv/commit/8c83e29b2d8fd1be810d8490ab873b417b101a08))

### [0.0.9](https://github.com/unjs/unenv/compare/v0.0.8...v0.0.9) (2020-11-21)


### Features

* alias `un` to RUNTIME_DIR by default ([5af101e](https://github.com/unjs/unenv/commit/5af101ef9ded3c3ffafc66fe02f2fd005503fdf5))

### [0.0.8](https://github.com/unjs/unenv/compare/v0.0.7...v0.0.8) (2020-11-21)


### Features

* improve env support ([b60a52a](https://github.com/unjs/unenv/commit/b60a52a55032824cd46337b2887b9bffa4f35944))

### [0.0.7](https://github.com/unjs/unenv/compare/v0.0.6...v0.0.7) (2020-11-20)


### Bug Fixes

* get original fetch from global ([bd6b3a8](https://github.com/unjs/unenv/commit/bd6b3a8d016a864423ee4b74e2c8dda537e89bf7))

### [0.0.6](https://github.com/unjs/unenv/compare/v0.0.5...v0.0.6) (2020-11-20)


### Features

* node preset and improved fetch ([d982833](https://github.com/unjs/unenv/commit/d98283339b2ab8c78c4cda6932e25e49b8d05bde))
* support polyfill via env and node.fetch polyfill ([cd392d5](https://github.com/unjs/unenv/commit/cd392d5c5711927cca3ea6f5725c73407be9b21f))

### [0.0.5](https://github.com/unjs/unenv/compare/v0.0.4...v0.0.5) (2020-11-19)

### [0.0.4](https://github.com/unjs/unenv/compare/v0.0.3...v0.0.4) (2020-11-19)


### Features

* emit close and finish events and remove listeners on destroy ([cc42554](https://github.com/unjs/unenv/commit/cc42554c1579ea48910a75aec7e70103f01087a2))
* fetch and localFetch ([19a147d](https://github.com/unjs/unenv/commit/19a147dfb707594e33adcab54f4852e9a7dce8bc))
* use babel to transpile runtime (ts => cjs) ([82dac22](https://github.com/unjs/unenv/commit/82dac22e6eea20bdd9e99e9351db800f9753322a))


### Bug Fixes

* use cjs export for exports with alias ([00f911b](https://github.com/unjs/unenv/commit/00f911b9adfeb5b44971585d03e7e23fc3cce8de))
* use cjs exports for node entries ([5aaed44](https://github.com/unjs/unenv/commit/5aaed44d2878ad42f63e327b10894382e9314351))

### [0.0.3](https://github.com/unjs/unenv/compare/v0.0.2...v0.0.3) (2020-11-19)


### Bug Fixes

* resolve npm packages that override ([c42196c](https://github.com/unjs/unenv/commit/c42196c1376a7215a42e23fee1c5d87e9f81d9af))
* use default export for node mocks (cjs compat) ([83c275d](https://github.com/unjs/unenv/commit/83c275db644ed6b9faf5991cd75fe73e2c51e387))

### [0.0.2](https://github.com/unjs/unenv/compare/v0.0.1...v0.0.2) (2020-11-18)


### Bug Fixes

* add runtime to package ([32623af](https://github.com/unjs/unenv/commit/32623afbfce8a6280e391cc5e59efa2efad9a6db))

### 0.0.1 (2020-11-18)


### Features

* add initial modules ([ce62be1](https://github.com/unjs/unenv/commit/ce62be12edb637effd99412c1e6f07529a53116f))
