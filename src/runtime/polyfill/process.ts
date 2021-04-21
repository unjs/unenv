// https://github.com/defunctzombie/node-process/
// @ts-ignore
import * as _process from '_process'
import _global from './global'

_global.process = _global.process || {}

// TODO: apply only non-existing keys
Object.assign(_global.process, _process)

export default _global.process
