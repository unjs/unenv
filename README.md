# un

Once upon a time, one server was all needed to have a website

And then SPAs<sup>1</sup> moved server code to browser

And then SSR<sup>2</sup> moved browser code to server

And then Workers<sup>3</sup> moved browser/server code to workers

Workers are neither NodeJS with `process` or browser with `window` yet expected to run code that had to work both of them :}

**[1]** Single Page Applications
**[2]**  Server Side Rendering
**[3]**  https://workers.cloudflare.com


## What is un?

Un is a preset of polyfills and small utilities to make it easier doing SSR and serving API inside workers.


## License

MIT
