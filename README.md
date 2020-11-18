# un

Once upon a time, one server was all needed to have a website

And then SPAs[^1] moved server code to browser

And then SSR[^2] moved browser code to server

And then Workers[^3] moved browser/server code to workers

Boom! Workers are neither NodeJS with `process` or browser with `window` yet expected to run code
that had to work both of them :)

[^1]: Single Page Applications
[^2]: Server Side Rendering
[^3]: https://workers.cloudflare.com


## What is un?

Un is a preset of polyfills and small utilities to make it easier doing SSR and serving API inside workers.


## License

MIT
