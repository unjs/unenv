// https://www.npmjs.com/package/mime

// @ts-ignore
import mimeLite from 'mime/lite'

const mime = { ...mimeLite }

// Adding v1 compat since rollup mocks flatten dependencies
// https://www.npmjs.com/package/mime/v/1.6.0
mime.lookup = mime.getType
mime.extension = mime.getExtension
const noop = () => {}
mime.define = noop
mime.load = noop
mime.default_type = 'application/octet-stream'
mime.charsets = { lookup: () => 'UTF-8' }

export default mime
