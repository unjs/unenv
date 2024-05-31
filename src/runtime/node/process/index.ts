// https://nodejs.org/api/process.html
import type process from "node:process";

import { process as _process } from "./internal/process";

export default <typeof process>_process;
