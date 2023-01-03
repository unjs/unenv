import _process from "../node/process/index";
import _global from "./global-this";

_global.process = _global.process || _process;

export default _global.process;
