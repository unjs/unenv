# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

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
