// https://github.com/defunctzombie/node-process/

global.process = global.process || {}

// TODO: apply only non-existing keys
Object.assign(global.process, require('_process/browser.js'))

export default global.process
