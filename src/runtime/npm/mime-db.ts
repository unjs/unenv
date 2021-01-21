// https://www.npmjs.com/package/mime-db

module.exports = {
  'text/html': {
    source: 'iana',
    compressible: true,
    extensions: ['html', 'htm', 'shtml']
  },
  'application/javascript': {
    source: 'iana',
    charset: 'UTF-8',
    compressible: true,
    extensions: ['js', 'mjs']
  },
  'text/javascript': {
    source: 'iana',
    compressible: true
  },
  'application/json': {
    source: 'iana',
    charset: 'UTF-8',
    compressible: true,
    extensions: ['json', 'map']
  }
}
