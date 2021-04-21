// https://github.com/defunctzombie/node-process/
// @ts-ignore
import * as _process from '_process'

global.process = global.process || {}

// TODO: apply only non-existing keys
Object.assign(global.process, _process)

export default global.process
