// https://github.com/defunctzombie/node-process/
global.process = global.process || {}
Object.assign(global.process, require('node-process'))
export default global.process
